import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Vis from "./components/Map.jsx";
import Envirement from "./components/Envirement.jsx";
import Home3D from "./components/Home3D.jsx";

import React from "react";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/test' element={<Vis />}></Route>
				<Route path='/envirement' element={<Envirement />}></Route>
				<Route path='/home3d' element={<Home3D />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
