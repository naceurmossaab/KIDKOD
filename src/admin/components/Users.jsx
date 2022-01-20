import "../style/users.css";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
     const [users, setUsers] = useState([]);
     const [user , setUser]  = useState({});

     useEffect(()=> axios.get("http://localhost:8000/api/admin/users")
                         .then(({data})=> setUsers(data))
                         .catch((error)=>console.log("useeffect admin error", error)),[]);

     return(
          <div className="container-fluid snippets bootdey">
               <div className="row">
                    <div className="col-lg-12">
                         <div className="main-box no-header clearfix">
                              <div className="main-box-body clearfix">
                                   <div className="table-responsive">
                                        <table className="table user-list">
                                             <thead>
                                                  <tr>
                                                       <th><span>User</span></th>
                                                       <th><span>Email</span></th>
                                                       <th className="text-center"><span>Status</span></th>
                                                       <th><span>Created</span></th>
                                                       <th>&nbsp;</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {users.map((user,i)=>
                                                  (<tr key={i}>
                                                       <td>
                                                            <img src={user.loginpic||user.picture} alt="" />
                                                            <span className="user-link label">{user.username}</span>
                                                            <span className="user-subhead">Member</span>
                                                       </td>
                                                       <td>{user.email}</td>
                                                       <td className="text-center">
                                                            <span>pending</span>
                                                       </td>
                                                       <td>
                                                            <span>{user.createdAt.slice(0,10)}</span>
                                                       </td>
                                                       <td style={{ width: '20%' }}>
                                                            <a href="#" className="table-link text-warning">
                                                                 <span className="fa-stack">
                                                                      <i className="fa fa-square fa-stack-2x" />
                                                                      <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                                 </span>
                                                            </a>
                                                            <a href="#" className="table-link text-info">
                                                                 <span className="fa-stack">
                                                                      <i className="fa fa-square fa-stack-2x" />
                                                                      <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                                 </span>
                                                            </a>
                                                            <a href="#" className="table-link danger">
                                                                 <span className="fa-stack">
                                                                      <i className="fa fa-square fa-stack-2x" />
                                                                      <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                                 </span>
                                                            </a>
                                                       </td>
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