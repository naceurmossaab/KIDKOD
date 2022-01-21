const Sidebar = (props) => {
     return (
          <nav id="sidebar" className="sidebar-wrapper">
               <div className="sidebar-content">
                    <div className="sidebar-header">
                         <div className="user-pic">
                              <img className="img-responsive img-rounded" src="https://icon2.cleanpng.com/20180920/att/kisspng-user-logo-information-service-design-5ba34f886b6700.1362345615374293844399.jpg" alt="User picture" />
                         </div>
                         <div className="user-info">
                              <span className="user-name">
                                   <strong>{props.admin.username}</strong>
                              </span>
                              <span className="user-role">Administrator</span>
                              <span className="user-status">
                                   <i className="fa fa-circle" />
                                   <span>Online</span>
                              </span>
                         </div>
                    </div>
                    {/* sidebar-header  */}
                    <div className="sidebar-menu">
                         <ul>
                              <li className="header-menu">
                                   <span>General</span>
                              </li>
                              <li className={props.active === 'dashboard' ? "sidebar-dropdown active" : "sidebar-dropdown"} onClick={(e) => props.view('dashboard')}>
                                   <a href="#">
                                        <i className="fa fa-tachometer" />
                                        <span>Dashboard</span>
                                   </a>
                              </li>
                              <li className={props.active === 'users' ? "sidebar-dropdown active" : "sidebar-dropdown"} onClick={(e) => props.view('users')}>
                                   <a href="#">
                                        <i className="fa fa-globe" />
                                        <span>Users</span>
                                   </a>
                              </li>
                              <li className={props.active === 'tasks' ? "sidebar-dropdown active" : "sidebar-dropdown"} onClick={(e) => props.view('tasks')}>
                                   <a href="#">
                                        <i className="fa fa-shopping-cart" />
                                        <span>Tasks</span>
                                        {/* <span className="badge badge-pill badge-danger">3</span> */}
                                   </a>
                              </li>
                              <li className={props.active === 'charts' ? "sidebar-dropdown active" : "sidebar-dropdown"} onClick={(e) => props.view('charts')}>
                                   <a href="#">
                                        <i className="fa fa-pie-chart" />
                                        <span>Charts</span>
                                   </a>
                              </li>
                              <li className="header-menu">
                                   <span>Extra</span>
                              </li>
                         </ul>
                    </div>
                    {/* sidebar-menu  */}
               </div>
               {/* sidebar-content  */}
               <div className="sidebar-footer">
                    <a href="#">
                         <i className="fa fa-bell" />
                         <span className="badge-sonar" />
                    </a>
                    <a href="#">
                         <i className="fa fa-envelope" />
                         <span className="badge-sonar" />
                    </a>
                    <a href="#">
                         <i className="fa fa-cog" />
                         <span className="badge-sonar" />
                    </a>
                    <a href="#" onClick={()=>props.logout()}>
                         <i className="fa fa-power-off" />
                    </a>
               </div>
          </nav>
     );
}

export default Sidebar;