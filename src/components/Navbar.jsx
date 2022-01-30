import "../style/Navbar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const session = () =>
    JSON.parse(localStorage.getItem("user"))
      ? setUser(JSON.parse(localStorage.getItem("user")))
      : setUser(null);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => session(), []);

  return (
    <div className="navbar" role="banner">
      <Link to="/">
        <span className="logo" onClick={() => window.location.reload()}>
          <img
          className="logoPic"
            width="40"
            alt="kid center"
            src="https://media.discordapp.net/attachments/902266709568782436/934024200069472296/kidkod.png"
          />
        </span>
      </Link>
      <div className="spacer"></div>
      <div className="spacer-right"></div>
      {user ? (
        <div>
          {/* <Link to="/profile"><span><img className="user-logo" src={user.picture} />{user.username}</span></Link> */}
          <Link to="/">
            <span className="navbar-title" onClick={() => logout()}>
              Log Out
            </span>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <img
            className="loginPic"
            src="https://cdn.discordapp.com/attachments/902266709568782436/934254745533681664/Login-22-01-2022.png"
            alt=""
          />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
