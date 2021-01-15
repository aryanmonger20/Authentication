
import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom'
import UserContext from "../../context/UserContext"

export default function AuthOptions() {
    const {userData,setUserData}=useContext(UserContext);
    const history =useHistory();

    const register =()=>history.push("/register");
    const login =()=>history.push("/login");
    const logout=()=>{
        setUserData({
            token:undefined,
            user:undefined
        })
        localStorage.setItem("auth-token","")
    }
    return (
        <nav className= "authoptions">
            {
                userData.user?(
                <button onClick={logout}>LogOut</button>):(
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>LogIn</button>
                    </>
                )
            }
          
           
        </nav>
    )
}
