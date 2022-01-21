import "../style/charts.css";
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Charts = (props) => {
     return (
          <div className={props.type === "all" ? "charts" : "chart"}>
               {props.type === "all" || props.type === "bar" ? 
               (
                    <Bar
                         data={props.chartData}
                         options={{
                              title: {
                                   display: props.displayTitle,
                                   text: 'Largest Cities in Massachusetts',
                                   fontSize: 25
                              },
                              legend: {
                                   display: props.displayLegend,
                                   position: props.legendPosition,
                                   labels: {
                                        fontColor: '#000'
                                   }
                              },
                              responsive: props.type === 'all' ? false : true
                         }}
                    />

               ) : (<div />)}
               {props.type === "all" || props.type === "line" ?
               (
                    <Line
                         data={props.chartData}
                         options={{
                              title: {
                                   display: props.displayTitle,
                                   text: 'Largest Cities in Massachusetts',
                                   fontSize: 25
                              },
                              legend: {
                                   display: props.displayLegend,
                                   position: props.legendPosition,
                                   labels: {
                                        fontColor: '#000'
                                   }
                              },
                              responsive: props.type === 'all' ? false : true
                         }}
                    />
               ):(<div />)}
               {props.type === "all" || props.type === "pie" ?
               (
                    <Pie
                         data={props.chartData}
                         options={{
                              title: {
                                   display: props.displayTitle,
                                   text: 'Largest Cities in Massachusetts',
                                   fontSize: 25
                              },
                              legend: {
                                   display: props.displayLegend,
                                   position: props.legendPosition,
                                   labels: {
                                        fontColor: '#000'
                                   }
                              },
                              responsive: props.type === 'all' ? false : true
                         }}
                    />
               ):(<div />)}
               
          </div>
     )
}

Charts.defaultProps = {
     displayTitle: true,
     displayLegend: true,
     legendPosition: 'bottom'
}

export default Charts;
