import "../style/Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  const session = () => JSON.parse(localStorage.getItem("user")) ? setUser(JSON.parse(localStorage.getItem("user"))) : setUser(null);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  useEffect(() => session(), []);

  return (
    <div className="home">
      <table>
        <tbody>
          <tr>
            <th>
              <img
                className="rightImage"
                src="https://cdni.iconscout.com/illustration/premium/thumb/little-kids-learning-mathematics-online-2769747-2302765.png"
              />
            </th>
            <th>
              {/* <img
              className="leftImage"
              src="https://media.discordapp.net/attachments/929085824262361128/929111085330628648/leftTop.PNG"
            /> */}
            </th>
          </tr>
        </tbody>
      </table>
      <div className="mainPage">
        <p className="playLearn">Play, Learn and Grow</p>
        <h1 className="title">What is KIDKOD ?</h1>
        <p className="Paragraph">
          KIDKOD is an E-learning plateform that allows our children to learn
          and improve their problem solving skills by playing and having fun.
          With KIDKOD you will be sure that your child is using technologies in
          a benefit way. Login to start the adventure !
        </p>
        {user ? (
          <div>
            <Link to="/">
              <button onClick={logout}>Logout</button>
            </Link>
            <img src={user.picture} alt="" /> {user.username}
          </div>
        ):(
          <Link to="/login">
            <button className="startGameBTN">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
