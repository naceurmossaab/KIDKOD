import "./admin.css";
import 'font-awesome/css/font-awesome.min.css';
import Sidebar from "./Sidebar";
import Tasks   from "./Tasks";
import { useState, useEffect } from "react";

const Admin = () => {
     const [view, setView] = useState("dashboard");
     useEffect(() => {

     }, [view])

     return(
          <div className="page-wrapper chiller-theme toggled">
               <Sidebar active={view} view={setView}/>
               {/* sidebar-wrapper  */}
               <main className="page-content">
                    <div className="container-fluid">
                         {view === 'dashboard' ? (<div>dashboard content</div>) : (<Tasks />)}
                    </div>
               </main>
          </div>
     );
}

export default Admin;