import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Vis from "./components/test.jsx";
import Envirement from "./components/Envirement.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Challenges from "./components/Challenges/Challenges.jsx";
import CubeTowerGame from "./components/CubeTowerGame.jsx";

import React from "react";
import DnD from "./components/Challenges/dragAndDrop/DnD";
import EvenOdd from "./components/Challenges/dragAndDrop/EvenOdd/EvenOdd.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<Home />}></Route> */}
				<Route path='/login' element={<Login />}></Route>
				<Route path='/test' element={<Vis />}></Route>
				<Route path='/envirement' element={<Envirement />}></Route>
				<Route path='/' element={<LandingPage />}></Route>
				<Route path='/Challenges' element={<Challenges />}></Route>
				<Route path='/evenodd' element={<EvenOdd />}></Route>
				<Route
					path='/game/cubetowergame'
					element={<CubeTowerGame />}
				></Route>
				<Route path='/drop' element={<DnD />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
