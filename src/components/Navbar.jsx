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
                         <img width="40" alt="kid center" src="https://cdn.discordapp.com/attachments/929085824262361128/931565255274926180/kidkod-logo.png" />
               <Link to="/"><span className="navbar-title" onClick={()=>window.location.reload()}>KIDKOD</span></Link>
               <div className="spacer"></div>
               <div className="spacer-right"></div>
               {user ? 
               (<div>
                    {/* <Link to="/profile"><span><img className="user-logo" src={user.picture} />{user.username}</span></Link> */}
                    <Link to="/"><span className="navbar-title" onClick={()=>logout()}>Log Out</span></Link>
               </div>
                    ) : (<Link to="/login"><span className="border">Login</span></Link>)}
               
          </div>
     );
}

export default Navbar;