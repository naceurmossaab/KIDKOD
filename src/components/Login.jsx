import "../style/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

//prettier ignore
const Login = () => {
     const navigateTo = useNavigate();
     const [view, setView] = useState("signin");
     const [pictures, setPictures] = useState([]);
     const [signup, setSignup] = useState({
          username: "",
          email: "",
          password: "",
          password2: "",
          loginpic: "",
          status: "",
     });
     const [signin, setSignin] = useState({
          username: "",
          method: "picture",
          password: "",
          loginpic: "",
          status: "",
     });
     const [countpic, setCountpic] = useState(0);

     useEffect(() => getRandomPictures(), []);

     // disable login with picture for 1 hour for specific username using cookie
     const disablePic = (cookieName, cookieValue, hourToExpire) => {
          let date = new Date();
          date.setTime(date.getTime() + (hourToExpire * 60 * 60 * 1000));
          document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
     }

     const getdisableUsername = (cname) => {
          let name = cname + "=";
          let decodedCookie = decodeURIComponent(document.cookie);
          let ca = decodedCookie.split(';');
          for (let i = 0; i < ca.length; i++) {
               let c = ca[i];
               while (c.charAt(0) == ' ') {
                    c = c.substring(1);
               }
               if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
               }
          }
          return "";
     }

     const getRandomPictures = () => {
          axios.get("http://localhost:8000/api/random-pictures/getAll")
               .then(({ data }) => {
                    let pics = [];
                    for (var i = 0; i < 9; i++) {
                         let random = Math.floor(Math.random()*data.length);
                         pics.push(data[random]);
                         // pics.push(data[i]);
                    }
                    setPictures(pics);
               })
               .catch((error) => console.log("error getRandomPictures : ", error));
     }

     const reset = (state) => {
          if (state === "signin")
               setSignin({
                    username: "",
                    password: "",
                    method: "picture",
                    loginpic: "",
                    status: "",
               });
          else
               setSignup({
                    username: "",
                    email: "",
                    password: "",
                    password2: "",
                    loginpic: "",
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
               if (view === "signup") setView("signup-2")
               else {
                    let { username, email, password, loginpic } = signup;
                    console.log({ username, email, password, loginpic });
                    axios.post("http://localhost:8000/api/users/signup", { username, email, password, loginpic })
                         .then(({ data }) => {
                              console.log("response signup :", data);
                              setSignup({ username: "", email: "", password: "", password2: "", status: "account created" });
                              navigateTo("/");
                         })
                         .catch((error) => {
                              if (error.response.data.includes("E11000 duplicate key error"))
                                   setSignup({ ...signup, status: "username already exist" });
                         });
               }

          }
     };

     const signinFN = () => {
          if (signin.username.length === 0) {
               setSignin({ ...signin, status: "enter your username" });
          } else {
               if (view === "signin") {
                    setView("signin-2");
                    setSignin({ ...signin, status: "" });
                    axios.post("http://localhost:8000/api/users/loginpic", { username: signin.username })
                         .then(({ data }) => {
                              let arr1 = [...pictures.slice(1), {'_id': data[0]._id, 'url': data[0].loginpic}];
                              let arr2 = [];
                              while (arr1.length) {
                                   arr2.splice(Math.floor(Math.random() * (arr2.length + 1)), 0, arr1.pop());
                              }
                              setPictures(arr2);
                         })
                         .catch((err) => console.log("get secret picture error : ", err));
               }
               else {
                    let { username, password, loginpic } = signin;
                    // console.log({ username, password, loginpic });
                    if (signin.password.length === 0 && signin.method === "password")
                         setSignin({ ...signin, status: "enter a password" })
                    else if (signin.password.length < 8 && signin.method === "password")
                         setSignin({ ...signin, status: "password too short" })
                    else if (!signin.loginpic.length && signin.method === "picture")
                         setSignin({ ...signin, status: "select a picture" })
                    else {
                         setCountpic(countpic+1);
                         axios.post("http://localhost:8000/api/users/signin", { username, password, loginpic })
                              .then(({ data }) => {
                                   console.log("response signin :", data);
                                   setSignin({ username: "", password: "", status: "", });
                                   localStorage.setItem("user", JSON.stringify(data));
                                   navigateTo("/test");
                              })
                              .catch((error) => setSignin({ ...signin, status: error.response.data }));
                    }
               }

          }
     };

     return (
          <div>
               {/* <Navbar /> */}
               <div className="login">
                    <div className="left-div">
                         {/* <h1>Create an account</h1>
                         <p>it's totally free and secure</p>
                         <p>we don't share your </p>
                         <p>informations with others</p> */}
                    </div>
                    {view === "signup" ? (
                         <div className="contact">
                              <h3>Sign Up</h3>
                              <span>
                                   Have an account ? &nbsp;
                                   <span className="cursor-pointer" onClick={() => { reset("signup"); setView("signin"); }} >
                                        <u>Sign In</u>
                                   </span>
                              </span>
                              <input value={signup.username} onChange={(e) => setSignup({ ...signup, username: e.target.value })} name="username" placeholder="username" type="text" />
                              <input value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} name="email" placeholder="email" type="email" />
                              <input value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} name="password" placeholder="password" type="password" />
                              <input value={signup.password2} onChange={(e) => setSignup({ ...signup, password2: e.target.value })} name="password2" placeholder="confirm password" type="password" />
                              <div>
                                   <button onClick={signupFN}> next </button>
                                   <span style={{ fontSize: "20px", color: signup.status === "account created" ? "green" : "red" }}> {signup.status} </span>
                              </div>
                         </div>

                    ) : view === "signup-2" ? (
                         <div className="contact" id="signup-2">
                              <div id="title">
                                   Choose a picture and memorize it, we will used as method to login later
                              </div>
                              <div id="pictures">
                                   <div className="random-pictures">
                                        {pictures.map((picture, i) => (<img key={i} id={picture._id} src={picture.url} onClick={(e) => setSignup({ ...signup, loginpic: e.target.src })} />))}
                                   </div>
                                   <div id="preview">
                                        <img src={signup?.loginpic} alt="" />
                                   </div>
                              </div>
                              <button onClick={signupFN}>Sign Up</button>
                         </div>
                    ) : view === "signin" ? (
                         <div className="contact">
                              <h3>Sign In</h3>
                              <span>
                                   Don't have an account ? &nbsp;
                                   <span className="cursor-pointer" onClick={() => { reset("signin"); setView("signup"); }}>
                                        <u>Sign Up</u>
                                   </span>
                              </span>
                              <input value={signin.username} onChange={(e) => setSignin({ ...signin, username: e.target.value })} name="username" placeholder="username" type="text" />
                              <span>choose a method :</span>
                              <div className="connexion-method" id="connexion-method">
                                        {!getdisableUsername(`__${signin.username}`) ? (
                                        <label name="picture" className={signin.method === "picture" ? "checked-radio" : ""} onClick={(e) => setSignin({ ...signin, method: "picture" })}>
                                             <input type="radio" name="picture" value="picture" />
                                             <img src="https://cdn3d.iconscout.com/3d/premium/thumb/image-4059094-3364017.png" />
                                             picture
                                        </label>
                                        
                                   ):(
                                        <label className="disable">
                                             <img src="https://cdn3d.iconscout.com/3d/premium/thumb/image-4059094-3364017.png" />
                                             picture
                                        </label>
                                   )}
                                   <label name="password" className={signin.method === "password" || getdisableUsername(`__${signin.username}`) ? "checked-radio" : ""} onClick={(e) => setSignin({ ...signin, method: "password" })}>
                                        <input type="radio" name="password" value="password" />
                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/lock-and-key-4727261-3928178.png" />
                                        password
                                   </label>
                              </div>
                              <div>
                                   <button onClick={()=>{signinFN(); getdisableUsername(`__${signin.username}`)?setSignin({...signin, method:'password'}):''}}> next </button>
                                   <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
                              </div>
                         </div>
                    ) : (
                         signin.method === "picture" ? (
                              countpic > 3 ? (
                                        <div className="contact">
                                             {countpic > 3 && disablePic(`__${signin.username}`, signin.username, 1)}
                                             <span style={{ fontSize: "20px", color: "red" }}>sorry, you try more then 3 times</span><br />
                                             <span>try to connect with password <span onClick={() => { setSignin({ ...signin, method: "password", loginpic: "", status: "" }); cookie('picture', signin.username, 1)}}><u>here</u></span> </span>
                                        </div>
                              ):(
                              <div className="contact" id="signup-2">
                                   <div id="title">
                                        Choose a picture to login
                                   </div>
                                   <div id="pictures">
                                        <div className="random-pictures">
                                             {pictures.map((picture, i) => (<img key={i} id={picture._id} src={picture.url} onClick={(e) => setSignin({ ...signin, loginpic: e.target.src })} />))}
                                        </div>
                                        <div id="preview">
                                             <img src={signin.loginpic} alt="" />
                                        </div>
                                   </div>
                                   <div>
                                        <button onClick={signinFN}>Sign In {countpic||''}</button>
                                        <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
                                   </div>
                              </div>)) : (
                              <div className="contact">
                                   <div><span>username : {signin.username}</span></div>
                                   <input value={signin.password} onChange={(e) => setSignin({ ...signin, password: e.target.value })} name="password" placeholder="password" type="password" />
                                   <div>
                                        <button onClick={signinFN}>Sign In</button>
                                        <span style={{ fontSize: "20px", color: "red" }}> {signin.status} </span>
                                   </div>
                              </div>
                         )
                    )}
               </div>
          </div>
     );
};

export default Login;
