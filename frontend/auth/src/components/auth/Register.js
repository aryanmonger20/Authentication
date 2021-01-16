import React ,{useState,useContext}from 'react'
import {useHistory} from "react-router-dom";
import Axios from "axios"
import UserContext from "../../context/UserContext"

export default function Register() {
    const[email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [passwordCheck,setPasswordCheck]=useState();
    const [displayName,setDisplayName]=useState();
    const {setUserData}=useContext(UserContext)

    const submit =async(e)=>{
        e.preventDefault();
        const newUser={email,password,passwordCheck,displayName};
        const registerRes=await Axios.post("http://localhost:5000/users/register",  newUser)
      
    }

    return (
        <div className="page">
           <h1> Register</h1>
           <form>
               <label htmlFor="register-email">Email:</label>
               <input id ="register-email" type="email" 
               onChange={(e)=>setEmail(e.target.value)}/>

               <label htmlFor="register-password">Password:</label>
               <input id ="register-password" type="password"
               onChange={(e)=>setPassword(e.target.value)}/>
               <input type="password" placeholder="verify password"
                              onChange={(e)=>setPasswordCheck(e.target.value)}/>
                           

               <label htmlFor="register-display-name">Display Name:</label>
               <input id ="register-display-name" type="text"
               onChange={(e)=>setDisplayName(e.target.value)}/>
               
               <input type="submit" value="Register"/>
           </form>
        </div>
    )
}
