import "../style/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {
     const navigateTo = useNavigate();
     const [view, setView] = useState("signin");
     const [signup, setSignup] = useState({
          username: "",
          email: "",
          password: "",
          password2: "",
          status: "",
     });
     const [signin, setSignin] = useState({
          username: "",
          password: "",
          status: "",
     });

     const reset = (state) => {
          if (state === "signin")
               setSignin({
                    username: "",
                    password: "",
                    status: "",
               });
          else
               setSignup({
                    username: "",
                    email: "",
                    password: "",
                    password2: "",
                    status: "",
               });
     };

     const signupFN = () => {
          if (signup.username.length === 0) {
               setSignup({ ...signup, status: "enter your username" });
          } else if (!signup.email.includes("@")) {
               if (signup.email.length === 0)
                    setSignup({ ...signup, status: "enter your email" });
               else setSignup({ ...signup, status: "wrrong email" });
          } else if (signup.password.length < 8) {
               if (signup.password.length === 0)
                    setSignup({ ...signup, status: "enter your password" });
               else setSignup({ ...signup, status: "short password" });
          } else if (
               signup.password.length >= 8 &&
               signup.password !== signup.password2
          ) {
               setSignup({ ...signup, status: "password doesn't match" });
          } else {
               let { username, email, password } = signup;
               axios
                    .post("http://localhost:8000/users/signup", {
                         username,
                         email,
                         password,
                    })
                    .then(({ data }) => {
                         // console.log("response signup :", data);
                         setSignup({
                              username: "",
                              email: "",
                              password: "",
                              password2: "",
                              status: "account created",
                              //reset the signup state
                              //status : data => "username already exist" - "account created"
                         });
                         navigateTo("/login");
                    })
                    .catch((error) => {
                         if (error.response.data.includes("E11000 duplicate key error"))
                              setSignup({ ...signup, status: "username already exist" });
                    });
          }
     };

     const signinFN = () => {
          if (signin.username.length === 0) {
               setSignin({ ...signin, status: "enter your username" });
          } else if (signin.password.length < 8) {
               if (signin.password.length === 0)
                    setSignin({ ...signin, status: "enter your password" });
               else setSignin({ ...signin, status: "short password" });
          } else {
               axios
                    .post("http://localhost:8000/users/signin", signin)
                    .then(({ data }) => {
                         setSignin({
                              username: "",
                              password: "",
                              status: "",
                              //reset the signup state
                              //status : data => "username already exist" - "account created"
                         });
                         localStorage.setItem("user", JSON.stringify(data));
                         navigateTo("/");
                    })
                    .catch((error) =>
                         setSignin({ ...signin, status: error.response.data })
                    );
          }
     };

     return (
          <div>
               {/* <Navbar /> */}
               <div className="login">
                    <div className="left-div">
                         <h1>Create an account</h1>
                         <p>it's totally free and secure</p>
                         <p>we don't share your </p>
                         <p>informations with others</p>
                    </div>
                    {view === "signup" ? (
                         <div className="contact">
                              <h3>Sign Up</h3>
                              <span>
                                   Have an account ? &nbsp;
                                   <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                             reset("signup");
                                             setView("signin");
                                        }}
                                   >
                                        <u>Sign In</u>
                                   </span>
                              </span>
                              <input
                                   value={signup.username}
                                   onChange={(e) =>
                                        setSignup({ ...signup, username: e.target.value })
                                   }
                                   name="username"
                                   placeholder="username"
                                   type="text"
                              />
                              <input
                                   value={signup.email}
                                   onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                                   name="email"
                                   placeholder="email"
                                   type="email"
                              />
                              <input
                                   value={signup.password}
                                   onChange={(e) =>
                                        setSignup({ ...signup, password: e.target.value })
                                   }
                                   name="password"
                                   placeholder="password"
                                   type="password"
                              />
                              <input
                                   value={signup.password2}
                                   onChange={(e) =>
                                        setSignup({ ...signup, password2: e.target.value })
                                   }
                                   name="password2"
                                   placeholder="confirm password"
                                   type="password"
                              />
                              <div>
                                   <button onClick={signupFN}> SignUp </button>
                                   <span
                                        style={{
                                             fontSize: "20px",
                                             color: signup.status === "account created" ? "green" : "red",
                                        }}
                                   >
                                        {signup.status}
                                   </span>
                              </div>
                         </div>
                    ) : (
                         <div className="contact">
                              <h3>Sign In</h3>
                              <span>
                                   Don't have an account ? &nbsp;
                                   <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                             reset("signin");
                                             setView("signup");
                                        }}
                                   >
                                        <u>Sign Up</u>
                                   </span>
                              </span>
                              <input
                                   value={signin.username}
                                   onChange={(e) =>
                                        setSignin({ ...signin, username: e.target.value })
                                   }
                                   name="username"
                                   placeholder="username"
                                   type="text"
                              />
                              <input
                                   value={signin.password}
                                   onChange={(e) =>
                                        setSignin({ ...signin, password: e.target.value })
                                   }
                                   name="password"
                                   placeholder="password"
                                   type="password"
                              />
                              <div>
                                   <button onClick={signinFN}> SignIn </button>
                                   <span style={{ fontSize: "20px", color: "red" }}>
                                        {signin.status}
                                   </span>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default Login;
