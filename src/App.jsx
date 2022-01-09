import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Vis from "./components/Map.jsx";

import Challenges from "./components/Challenges/Challenges.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Challenges" element={<Challenges />}></Route>
        <Route path="/test" element={<Vis />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
