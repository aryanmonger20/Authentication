const bcrypt =require("bcryptjs")

const router =require("express").Router();
const User =require("../models/userModel")


router.post("/register",async(req,res)=>{
  try {
      const {email,password,passwordCheck,displayName}=req.body;
      const existingUser=await User.find({email:email})
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

} catch(err){
    res.status(500).json(err);
}
}) 

module.exports = router;