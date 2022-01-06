import "../style/Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const Home = () => {
     const [user, setUser] = useState(null);

     const session = () => {
          let user = JSON.parse(localStorage.getItem("user"));
          user ? setUser(user) : setUser(null);
          // return user ? true : false;
     }

     useEffect(()=> session(), []);

     return (
          <div className="home">
               <Navbar />
               <h1> Home Page </h1>
          </div>
     );
}

export default Home;
