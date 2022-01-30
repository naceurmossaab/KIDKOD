import "./admin.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Tasks   from "./components/Tasks";
import Charts  from "./components/Charts";
import Users   from "./components/Users";
import Login   from "./components/Login";
import { useState, useEffect } from "react";

const Admin = () => {
     const [admin, setAdmin] = useState({}); //'username': 'admin'
     const [users, setUsers] = useState([]);
     const [view, setView] = useState("dashboard");
     const [chartType, setChartType] = useState("bar"); // "all", "bar", "line", "pie", "radar"
     const [labels, setLabel] = useState([]);
     const [dataSets, setDataSets] = useState([]);
     const [chartData, setChartData] = useState({
          labels:["wassim", "ghassen", "saddem", "wael", "gassen", "bob", "sakr"],
          datasets: [
               {
                    data: [2, 3, 1, 1, 1, 1, 2],
                    backgroundColor:'green',
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.6) ',
                         'rgba(54, 162, 235, 0.6) ',
                         'rgba(255, 206, 86, 0.6) ',
                         'rgba(75, 192, 192, 0.6) ',
                         'rgba(153, 102, 255, 0.6)',
                         'rgba(255, 159, 64, 0.6) ',
                         'rgba(255, 99, 132, 0.6) '
                    ]
               }
          ]
     });
     const session = () =>
          JSON.parse(localStorage.getItem("admin"))
               ? setAdmin(JSON.parse(localStorage.getItem("admin")))
               : setAdmin(null);

     const logout = () => {
          localStorage.removeItem("admin");
          setAdmin(null);
     };
     useEffect(() => session(), []);
     useEffect(() => { }, [view]);
     useEffect(() => axios.get("http://localhost:8000/api/admin/users")
               .then(({ data }) => {
                    setUsers(data);
                    setLabel(data.map(user=>user.username));
                    setChartData({ labels, ...chartData});
               }), []);

     return(
          <div>
          {admin?.username ?
          (<div className="background page-wrapper chiller-theme toggled">
               <Sidebar active={view} admin={admin} logout={logout} view={setView}/>
               {/* sidebar-wrapper  */}
               <main className="page-content">
                    {view === 'dashboard' ? 
                    (<div>
                         <Charts type="all" chartData={chartData} displayLegend={true}/>
                         <div className="dashboard">
                              <Users type={["username", "email"]} />
                              <div className="number-users">All users : {users.length}</div>
                         </div>
                    </div>) : (<div />)}
                    {view === 'users' ? (<Users type={["all"]} />) : (<div />)}
                    {view === 'tasks' ? (<Tasks />) : (<div />)}
                    {view === 'charts' ? (<Charts type={chartType} chartData={chartData} displayLegend={false} />) : (<div />)}
               </main>
          </div>):(<Login admin={setAdmin} />)}
          </div>
     );
}

export default Admin;