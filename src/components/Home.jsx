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
  };

  useEffect(() => session(), []);

  return (
    <div className="home">
      <table>
        <tr>
          <th>
            <img
              className="rightImage"
              src="https://media.discordapp.net/attachments/929085824262361128/929108754895626310/right.PNG?width=450&height=400"
            />
          </th>
          <th>
            <img
              className="leftImage"
              src="https://media.discordapp.net/attachments/929085824262361128/929111085330628648/leftTop.PNG"
            />
          </th>
        </tr>
      </table>
      <div className="mainPage">
        <p className="playLearn">Play, Learn and Grow</p>
        <h1 className="title">hello kidkod</h1>
        <p className="Paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </p>
        <Link to="/login"><button className="startGameBTN">Login</button></Link>
      </div>
    </div>
  );
};

export default Home;
