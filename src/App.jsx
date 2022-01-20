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
import DnDBasket from "./components/Challenges/dragAndDrop/dndBasket/BasketChallenge.jsx";
import EnglishDnD from "./components/Challenges/English_challenge/DnD-eng";
import DragAndDrop from "./components/Challenges/dragAndDrop/EvenOdd/EvenOdd.jsx";
import Challenge from "./components/Challenges/mathChallenge/challenge";
import InstractionOne from "./components/Instructions/InstractionOne";

import Admin from "./admin";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<Home />}></Route> */}
				<Route path='/login' element={<Login />}></Route>
				<Route path='/test' element={<Vis />}></Route>
				<Route path='/envirement' element={<Envirement />}></Route>
				<Route path='/' element={<LandingPage />}></Route>
				<Route path='/challenge' element={<DnD />}></Route>
				<Route
					path='/instractionOne'
					element={<InstractionOne />}
				></Route>
				<Route path='/dndbasket' element={<DnDBasket />}></Route>
				<Route
					path='/game/cubetowergame'
					element={<CubeTowerGame />}
				></Route>
				<Route path='/drop' element={<DnD />}></Route>
				<Route path='/admin' element={<Admin />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
