import "./admin.css";
import "font-awesome/css/font-awesome.min.css";
import Sidebar from "./components/Sidebar";
import Tasks   from "./components/Tasks";
import Charts  from "./components/Charts";
import Users  from "./components/Users";
import { useState, useEffect } from "react";

const Admin = () => {
     const [view, setView] = useState("dashboard");
     const [chartType, setChartType] = useState("bar"); // "all", "bar", "line", "pie"
     const [chartData, setChartData] = useState({
          labels: [
               'Boston',
               'Worcester',
               'Springfield',
               'Lowell',
               'Cambridge',
               'New Bedford'
          ],
          datasets: [
               {
                    data: [617594, 181045, 153060, 106519, 105162, 95072],
                    //backgroundColor:'green',
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.6)',
                         'rgba(54, 162, 235, 0.6)',
                         'rgba(255, 206, 86, 0.6)',
                         'rgba(75, 192, 192, 0.6)',
                         'rgba(153, 102, 255, 0.6)',
                         'rgba(255, 159, 64, 0.6)',
                         'rgba(255, 99, 132, 0.6)'
                    ]
               }
          ]
     });
     useEffect(() => { }, [view])

     return(
          <div className="background page-wrapper chiller-theme toggled">
               <Sidebar active={view} view={setView}/>
               {/* sidebar-wrapper  */}
               <main className="page-content">
                    {view === 'dashboard' ? 
                    (<div>
                         <Charts type="all" chartData={chartData} displayLegend={false}/>
                         {/* <Users /> */}
                    </div>) : (<div />)}
                    {view === 'users' ? (<Users />) : (<div />)}
                    {view === 'tasks' ? (<Tasks />) : (<div />)}
                    {view === 'charts' ? (<Charts type={chartType} chartData={chartData} displayLegend={false} />) : (<div />)}
               </main>
          </div>
     );
}

export default Admin;