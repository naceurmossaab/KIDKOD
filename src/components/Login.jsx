import "../style/Login.css";
import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {
     const navigateTo = useNavigate ();
     const [view, setView] = useState("signin");
     const [signup, setSignup] = useState({
          username: "",
          email   : "",
          password: "",
          status  : "",
     });
     const [signin, setSignin] = useState({
          username: "",
          password: "",
          status  : "",
     });

     const changeSignUp = (e) => {
          let key = e.target.name;
          let value = e.target.value;
          let obj = signup;
          obj[key] = value;
          setSignup(obj);
     };

     const changeSignIn = (e) => {
          let key = e.target.name;
          let value = e.target.value;
          let obj = signin;
          obj[key] = value;
          setSignin(obj);
     };

     const signupFN = () => {
          console.log("signup ", signup);
          axios.post('http://localhost:8000/users/signup', signup)
               .then(({ data }) => {
                    console.log(data);
                    setSignup({
                         username: "",
                         email: "",
                         password: "",
                         status: " " + data
                        //reset the signup state
                        //status : data => "username already exist" - "account created" 
                    })
               })
               .catch((err) => console.log("Login Component => signup error : ", err.message));
     }

     const signinFN = () => {
          console.log("signin ", signin);
          axios.post('http://localhost:8000/users/signin', signin)
               .then(( {data} ) => {
                    console.log(data);
                    setSignin({
                         username: "",
                         password: "",
                         status: " logged as : " + data.username
                         //reset the signup state
                         //status : data => "username already exist" - "account created" 
                    });
                    localStorage.setItem("user", JSON.stringify(data));
                    navigateTo("/");
               })
               .catch((err) => console.log("Authentification => signin error : ", err.message));
     }

     return (
          <div className='login'>
               <div className='left-div'>
                    <h1>Create an account</h1>
                    <p>it's totally free and secure</p>
                    <p>we don't share your </p>
                    <p>informations with others</p>
               </div>
               {view === "signup" ? (
                    <div className='contact'>
                         <h3>Sign Up</h3>
                         <span>
                              Have an account ?
                              <span className='cursor-pointer' onClick={() => setView("signin")}>
                                   <u>Sign In</u>
                              </span>
                         </span>
                         <input onChange={changeSignUp} name='username' placeholder='username' type='text' />
                         <input onChange={changeSignUp} name='password' placeholder='password' type='text' />
                         <input onChange={changeSignUp} name='email'    placeholder='email'    type='text' />
                         <div>
                              <button onClick={signupFN}> SignUp </button>
                              <span style={{ fontSize: "20px", color: signup.status === "username already exist" ? "red" : "green" }} >
                                   {signup.status}
                              </span>
                         </div>
                    </div>
               ) : (
                    <div className='contact'>
                         <h3>Sign In</h3>
                         <span>
                              Don't have an account ?
                              <span className='cursor-pointer' onClick={() => setView("signup")} >
                                   <u>Sign Up</u>
                              </span>
                         </span>
                              <input onChange={changeSignIn} name='username' placeholder='username' type='text'    />
                              <input onChange={changeSignIn} name='password' placeholder='password' type='password'/>
                         <div>
                              <button onClick={signinFN}> SignIn </button>
                                   <span style={{ fontSize: "20px", color: signin.status.includes("logged") ? "green" : "red" }}>
                                   {signin.status}
                              </span>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default Login;
