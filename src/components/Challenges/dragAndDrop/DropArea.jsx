import React, { useState,useEffect } from "react";
import { useDrop } from "react-dnd";
import Drag from "./Drag.jsx";

const PETS = [
	{ id: 1, name: 10 },
	{ id: 2, name: 8 },
	{ id: 3, name: 9 },
	{ id: 4, name: 15 },
];

const challengeData = [
	{
		equation: "3 + 5 =",
		choices: [
			{ id: 1, name: 10 },
			{ id: 2, name: 8, correct: true },
			{ id: 3, name: 9 },
			{ id: 4, name: 15 },
		],
	},
	{
		equation: "10 + 2 =",
		choices: [
			{ id: 1, name: 15 },
			{ id: 3, name: 9 },
			{ id: 2, name: 12, correct: true },
			{ id: 4, name: 13 },
		],
	},
	{
		equation: "3 - 1 =",
		choices: [
			{ id: 2, name: 2, correct: true },
			{ id: 1, name: 4 },
			{ id: 3, name: 1 },
			{ id: 4, name: 5 },
		],
	},
	{
		equation: "12 - 7 =",
		choices: [
			{ id: 1, name: 19 },
			{ id: 3, name: 6 },
			{ id: 4, name: 10 },
			{ id: 2, name: 5, correct: true },
		],
	},
	{
		equation: "2 x 3 =",
		choices: [
			{ id: 1, name: 5 },
			{ id: 2, name: 6, correct: true },
			{ id: 3, name: 9 },
			{ id: 4, name: 10 },
		],
	},
	{
		equation: "10 x 2 =",
		choices: [
			{ id: 1, name: 12 },
			{ id: 3, name: 8 },
			{ id: 2, name: 20, correct: true },
			{ id: 4, name: 15 },
		],
	},
];

const DropArea = () => {
	const [index, setIndex] = useState(0);
	const [choices, setchoices] = useState(challengeData[index].choices);
	const [equation, setequation] = useState(challengeData[index].equation);
	const [responce, setresponce] = useState([]);
	const [goal, setGoal] = useState(false);
	const [challengeResponce, setchallengeResponce] = useState([]);

	const handelGoalClick = () => {
		setGoal(!goal);
		console.log(goal);
	};

	const passeToNext = () => {
		if (index < challengeData.length - 1) {
			setIndex(index + 1);
			
			setchoices(challengeData[index+1].choices);
			setequation(challengeData[index+1].equation);
			setchallengeResponce([...challengeResponce, ...responce]);
			setresponce([]);
		}
	};



	// const backToPreviouse = () => {
	// 	if (index > 0) {
	// 		setIndex(index - 1);
	// 		setchoices(challengeData[index].choices);
	// 		setequation(challengeData[index].equation);
	// 		setresponce([])
	// 	}
	// };

	const [{ isOver }, dropRef] = useDrop({
		accept: "drag",
		drop: (item) => {
			setresponce(responce.filter((rest) => item.id !== rest.id));
			setchoices([...choices, item]);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const [{ isOver2 }, dropRef2] = useDrop({
		accept: "drag",
		drop: (item) => {
			if (responce.length === 0) {
				setresponce([...responce, item]);
				setchoices(choices.filter((rest) => item.name !== rest.name));
			}
		},
		collect: (monitor) => ({
			isOver2: monitor.isOver(),
		}),
	});
	return (
		<React.Fragment>
			<div className='dnd-container'>
				<div className='icons'>
					<img
						className='challenge-goal icon'
						src='https://cdn3d.iconscout.com/3d/premium/thumb/down-arrow-2871138-2384397.png'
						onClick={handelGoalClick}
					/>
					<img
						className='challenge-close icon'
						src='https://cdn3d.iconscout.com/3d/premium/thumb/close-4112733-3408782@0.png'
					/>
				</div>
				{goal && (
					<div className='goal-text'>
						Your child begins by understanding that 'add'
						'substract' ... means to combine two groups of objects.
						Children will soon learn to pair numbers that sum to to
						5, then 10, and upwards from there. These are called
						number bonds and are very important because larger
						calculations usually depend on being fluent with them.
					</div>
				)}
				<div className='switch-question-container'>
					<img
						src='https://cdn3d.iconscout.com/3d/premium/thumb/left-arrow-3711632-3105353.png'
						className='challenge-arrow left-arrow'
						// onClick={backToPreviouse}
					/>
					<div className='dnd-sub-container'>
						<div className='question-and-responce'>
							<div className='question'>
								Which is the missing number ?
							</div>
							<div className='responce'>
								<div className='responce-detail'>
									{equation}
								</div>
								<div className='choices single' ref={dropRef2}>
									{responce.map((pet, index) => (
										<Drag
											draggable
											id={pet.id}
											key={index}
											name={pet.name}
										/>
									))}
									{isOver2 && (
										<div className='drop-here'>
											Drop Here!
										</div>
									)}
								</div>
							</div>
						</div>
						<div className='choices multiple' ref={dropRef}>
							{choices.map((pet, index) => (
								<Drag
									draggable
									id={pet.id}
									key={index}
									name={pet.name}
								/>
							))}
						</div>
					</div>
					<img
						src='https://cdn3d.iconscout.com/3d/premium/thumb/right-arrow-3711690-3105412.png'
						className='challenge-arrow right-arrow'
						onClick={passeToNext}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default DropArea;
