import "../style/Navbar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
     const [user, setUser] = useState(null);

     const session = () => JSON.parse(localStorage.getItem("user")) ? setUser(JSON.parse(localStorage.getItem("user"))) : setUser(null);

     const logout = () => {
          localStorage.removeItem("user");
          setUser(null);
     }

     useEffect(() => session(), []);

     return (
          <div className="navbar" role="banner">
               <img width="40" alt="kid center" src="https://w7.pngwing.com/pngs/923/492/png-transparent-brand-logo-line-angle-line-angle-rectangle-triangle-thumbnail.png" />
               <Link to="/"><span className="navbar-title">Kids 3D Platform</span></Link>
               <div className="spacer"></div>
               <Link to="/"><span className="navbar-title">Home</span></Link>
               <div className="spacer-right"></div>
               {user ? 
               (<div>
                    <Link to="/profile"><span><img class="user-logo" src={user.picture} />{user.username}</span></Link>
                    <Link to="/"><span className="navbar-title" onClick={()=>logout()}>Log Out</span></Link>
               </div>
               ) : (<Link to="/login"><span className="navbar-title">Sign In</span></Link>)}
               
          </div>
     );
}

export default Navbar;