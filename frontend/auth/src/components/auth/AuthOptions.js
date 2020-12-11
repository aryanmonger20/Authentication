
import React from 'react';
import {useHistory} from 'react-router-dom'

export default function AuthOptions() {
    const history =useHistory();

    const register =()=>history.push("register");
    const login =()=>history.push("/login");
    return (
        <nav className= "authoptions">
            <button onClick={register}>Register</button>
            <button onClick={login}>LogIn</button>
           
        </nav>
    )
}
