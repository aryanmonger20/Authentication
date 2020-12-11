import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from "../auth/AuthOptions"

export default function Header() {
    return (
        <div id="header">
          <Link to ="/">
            <h1 className="title">MERN Todo App</h1></Link>
          <AuthOptions></AuthOptions>
        </div>
    )
}
