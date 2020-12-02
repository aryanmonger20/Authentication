const express = require("express")
const mongoose =require("mongoose")
const cors =require("cors")

//require("dotenv").config();
require('dotenv').config();

const app =express();
const PORT =process.env.PORT||5000;
//o0mkpo7epR45f3Mj

app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
},
(err)=>{
    if(err) throw err;
    console.log("MongoDB Connected");
})







app.listen(PORT,()=>console.log(`Server Running on : ${PORT}`))