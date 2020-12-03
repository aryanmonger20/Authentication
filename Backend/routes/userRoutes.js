const bcrypt =require("bcryptjs")

const router =require("express").Router();
const User =require("../models/userModel")


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
   }catch(err){
    res.status(500).json({error:err.message});

}
})

module.exports = router;