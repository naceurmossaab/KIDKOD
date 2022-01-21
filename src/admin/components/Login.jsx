import "../style/login.css";
import { useState, useEffect } from "react";
import axios from "axios";

//prettier ignore
const Login = (props) => {
     const [signin, setSignin] = useState({
          username: "",
          password: "",
          status  : "",
     });

     const signinFN = () => {
          if (signin.username.length === 0) {
               setSignin({ ...signin, status: "enter your username" });
          }else if (signin.password.length === 0)
               setSignin({ ...signin, status: "enter a password" })
          else if (signin.password.length < 8)
               setSignin({ ...signin, status: "password too short" })
          else {
               let { username, password } = signin;
               axios.post("http://localhost:8000/api/admin/signin", { username, password })
                    .then(({ data }) => {
                         console.log("response signin :", data);
                         setSignin({ username: "", password: "", status: "", });
                         localStorage.setItem("admin", JSON.stringify(data));
                         props.admin(data);
                    })
                    .catch((error) => setSignin({ ...signin, status: error.response.data }));
          }
     };

     return (
     <div className="login">
          <div className="left-div"></div>
          <div className="contact">
               <h3>Sign In</h3>
               <input value={signin.username} onChange={(e) => setSignin({ ...signin, username: e.target.value })} name="username" placeholder="username" type="text" />
               <input value={signin.password} onChange={(e) => setSignin({ ...signin, password: e.target.value })} name="password" placeholder="password" type="password" />
               <div>
                    <button onClick={signinFN}>Sign In</button>
                    <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
               </div>
          </div>
     </div>
     );
};

export default Login;
