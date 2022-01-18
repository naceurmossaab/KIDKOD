import "./style/tasks.css";
import { useState } from "react";
import axios from "axios";

const Tasks = () =>{
     const [data, setData] = useState([]);
     const [equation, setEquation] = useState("");
     const [choice1, setChoice1] = useState("");
     const [choice2, setChoice2] = useState("");
     const [choice3, setChoice3] = useState("");
     const [choice4, setChoice4] = useState("");
     const [correct, setCorrect] = useState("");
     const [succes, setSucces] = useState("");
     const [step, setStep] = useState(1);
     const[error, setError]= useState({});

     const next = (event) => {
          event.preventDefault();
          if(equation.length === 0)     setError({equation: "put a question"});
          else if(choice1.length === 0 || choice2.length === 0 || choice3.length === 0 || choice4.length === 0)   
          setError({choices : "fill all the choices"});
          else if(correct.length === 0) setError({correct : "put the correct answer"});
          else{
               setData([...data, {equation,choices:[choice1,choice2,choice3,choice4],correct}]);
               setEquation("");
               setChoice1("");
               setChoice2("");
               setChoice3("");
               setChoice4("");
               setCorrect("");
               setError({});
               setStep(step+1);
               document.getElementById("task-form").reset();
          }
     }
     
     const save = (event) => {
          event.preventDefault();
          setEquation("");
          setChoice1("");
          setChoice2("");
          setChoice3("");
          setChoice4("");
          setCorrect("");
          setError({});
          axios.post("http://localhost:8000/api/dndChallenge/add",{'challengeData': data, 'level': 1})
               .then((reponse)=>setSucces('task added'));
     }
     
     return(
          <div className="container">
               <div className="steps">
                    <div className="step step-1">
                         <div className="liner" />
                         <span>question {step}</span>
                    </div>
               </div>
               <div className="line">
                    {/* <div className="dot-move" /> */}
                    <div className={step===1?'dot one active'  :'dot one'}   />
                    <div className={step===2?'dot two active'  :'dot two'}   />
                    <div className={step===3?'dot three active':'dot three'} />
                    <div className={step===4?'dot four active' :'dot four'}  />
                    <div className={step===5?'dot five active' :'dot five'}  />
               </div>
               <div className="slider-ctr">
                    <div className="slider">
                    {step > 5 ? (
                         <div className="slider-form form-button"> 
                         <button className="next" onClick={() => save(event)}>Save</button><span className="task-succes">{succes}</span> 
                         <button className="next" onClick={(event) =>{event.preventDefault(); setStep(1); setSucces('')}}>new task</button>
                         </div>
                    ):(
                         <form id="task-form" className="slider-form">
                              <label className="input" > <input type="text" name="equation" className="name" placeholder={`question ${step}`} onChange={(e)=>setEquation(e.target.value)} /> </label>
                              <label className="choix-answer" > 
                              <label className="choix" > 
                                   <input type="text" name="choix-1" className="name" placeholder="choix 1" onChange={(e)=>setChoice1({id: 1, name: e.target.value})} />
                                   <input type="text" name="choix-2" className="name" placeholder="choix 2" onChange={(e)=>setChoice2({id: 2, name: e.target.value})} />
                                   <input type="text" name="choix-3" className="name" placeholder="choix 3" onChange={(e)=>setChoice3({id: 3, name: e.target.value})} />
                                   <input type="text" name="choix-4" className="name" placeholder="choix 4" onChange={(e)=>setChoice4({id: 3, name: e.target.value})} />
                              </label>
                              <label className="answer"> <input type="text" name="correct" className="name" placeholder="answer" onChange={(e)=>setCorrect(e.target.value)} /> </label>
                              </label>
                              <div className="form-button"> <button className="next" onClick={() => next(event)}>Next Step</button> <span className="task-error">{error?.equation||error?.choices||error?.correct}</span> </div>
                         </form>
                    )}
                    </div>
               </div>
          </div>

     );
}

export default Tasks;