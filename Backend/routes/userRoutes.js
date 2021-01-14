const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")

const router =require("express").Router();
const User =require("../models/userModel");
const auth =require("../middleware/auth")


router.post("/register",async(req,res)=>{
  try {
      let {email,password,passwordCheck,displayName}=req.body;
      const existingUser=await User.findOne({email:email})
      //validation

   if(!email|| !password || !passwordCheck)
   return res.status(400).json({msg:"Please fill all the fields"});

   if(password.length<6)
   return res.status(400).json({msg:"Password should be greater than 6 characters"});

   if(password!=passwordCheck)
   return res.status(400).json({msg:"Password didn't match !!"})

    
    if(existingUser)
    return res.status(400).json({msg:"email already exists"});

    if(!displayName) displayName="User";

    //bcrypt

    const salt = await bcrypt.genSalt();
    const passwordHash =await bcrypt.hash(password,salt);

    const newUser=new User({
        email,
        password:passwordHash,
        displayName
    })
    const savedUser =await newUser.save();
    res.json(savedUser)
   // console.log(passwordHash)
} catch(err){
    res.status(500).json({error:err.message});
}
}) 

//login
router.post("/login",async(req,res)=>{
   
   try{ const {email,password} =req.body;

    //validate
    if(!email || !password)
        return res.status(400).json({msg:"Please Enter the correct email/password"});

            const user =await User.findOne({email:email})
              if(!user)
         return res.status(400).json({msg:"Email doesnot exist"});
         //checkLogin
         const isMatch =await bcrypt.compare(password,user.password);
         if(!isMatch)
         {
             return res.status(400).json({msg:"Invalid Credentials"});

         }
         const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({
            token,
            user:{
                id:user._id,
                displayName:user.displayName,
                email:user.email,

            },
        })
     }
   catch(err){
    res.status(500).json({error:err.message});

}
});

router.delete("/delete",auth,async(req,res)=>{
try{
    const deletedUser =await User.findByIdAndDelete(req.user)
    res.json(deletedUser);

}
catch(err){
    res.status(500).json({error:err.message})
}
//console.log(req.user)

})

router.post("/tokenIsValid",async(req,res)=>{
    try{
        const token=req.header("x-auth-token")
        console.log(token);
        if(!token)
        return res.json(false);

        const verified =jwt.verify(token,process.env.JWT_SECRET)
        if(!verified)return res.json(false);

        const user =await User.findById(verified.id)
        if(!User)return res.json(false);

        return res.json(true);


    }catch(err){
        res.status(500).json({error:err.message});
    }
})
router.get("/",auth,async (req,res)=>{
    const user =await User.findById(req.user)
    res.json({displayName :user.displayName,
        id:user._id});
})

module.exports = router;