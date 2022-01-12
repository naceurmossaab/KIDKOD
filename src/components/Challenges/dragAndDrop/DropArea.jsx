import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag.jsx";

const PETS = [
	{ id: 1, name: "dog" },
	{ id: 2, name: "cat" },
	{ id: 3, name: "fish" },
	{ id: 4, name: "hamster" },
];
const DropArea = () => {
	const [basket, setBasket] = useState([]);
	const [{ isOver }, dropRef] = useDrop({
		accept: "drag",
		drop: (item) =>
			setBasket((basket) =>
				!basket.includes(item) ? [...basket, item] : basket
			),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	return (
		<React.Fragment>
			<div className='pets'>
				{PETS.map((pet, index) => (
					<Drag draggable id={pet.id} key={index} name={pet.name} />
				))}
			</div>
			<div className='basket' ref={dropRef}>
				{basket.map((pet, index) => (
					<Drag id={pet.id} key={index} name={pet.name} />
				))}
				{isOver && <div>Drop Here!</div>}
			</div>
		</React.Fragment>
	);
};

export default DropArea;
