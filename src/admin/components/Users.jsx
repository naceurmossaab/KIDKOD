import "../style/users.css";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = (props) => {
     const [users, setUsers] = useState([]);
     const [user , setUser]  = useState({});
     const [search, setSearch] = useState({"key":"", "value":""});
     const [result, setResult] = useState([]);

     useEffect(()=> axios.get("http://localhost:8000/api/admin/users")
                         .then(({data})=> {
                              setUsers(data); 
                              setResult(data);
                         })
                         .catch((error)=>console.log("useeffect admin error", error)),[search.value]);

     const searchFN = () =>{
          console.log("search => ",search);
          setResult(users);
          search?.key === "" || search?.value === "" ? "" 
               : setResult(result.filter(user => search?.key === "username" ? user.username.includes(search?.value) : search?.key === "email" ? user.email.includes(search?.value) : search?.key === "level" ? user.level.includes(search?.value) : <div/>));
     }

     return(
          <div className={props.type.includes("all") ? "container-fluid" : "w70"}>
               {props.type.includes("all") ? 
               (<div className="row search-div">
                    <span> All students : {result.length}</span>
                    <input className="input" type="text" placeholder="serach" onChange={(e)=>setSearch({...search, value: e.target.value})} />
                    <select className="select" onChange={(e)=>setSearch({...search, key: e.target.value})} name="key">
                         <option value="">&nbsp; &nbsp; &nbsp;</option>
                         <option value="username"> username </option>
                         <option value="email"> email </option>
                         <option value="level"> level </option>
                    </select>
                    <button className="button" onClick={()=> searchFN()}>search</button>
               </div>):('')}
               <div className="row">
                    <div className="col-lg-12">
                         <div className="main-box no-header clearfix">
                              <div className="main-box-body clearfix">
                                   <div className="table-responsive">
                                        <table className="table user-list">
                                             <thead>
                                                  <tr>
                                                       {props.type.includes("username") || props.type.includes("all") ?
                                                       (<th><span>User</span></th>) : ('')}
                                                       {props.type.includes("email") || props.type.includes("all") ?
                                                       (<th><span>Email</span></th>) : ('')}
                                                       {props.type.includes("level") || props.type.includes("all") ?
                                                       (<th className="text-center"><span>Level</span></th>) : ('')}
                                                       {props.type.includes("created") || props.type.includes("all") ?
                                                       (<th><span>Created</span></th>) : ('')}
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {result.map((user,i)=>
                                                  (<tr key={i}>
                                                       {props.type.includes("username") || props.type.includes("all") ?
                                                       (<td className="user-label">
                                                            <img src={user.loginpic||user.picture} alt="" />
                                                            <span className="user-link label">{user.username}</span>
                                                            <span className="user-link user-subhead">member</span>
                                                       </td>):('')}
                                                       {props.type.includes("email") || props.type.includes("all") ?
                                                       (<td>{user.email}</td>):('')}
                                                       {props.type.includes("level") || props.type.includes("all") ?
                                                       (<td className="text-center">
                                                            <span>{user.level}</span>
                                                       </td>):('')}
                                                       {props.type.includes("created") || props.type.includes("all") ?
                                                       (<td className="text-center">
                                                            <span>{user.createdAt.slice(0,10)}</span>
                                                       </td>):('')}
                                                  </tr>))}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

     );
}

export default Users;