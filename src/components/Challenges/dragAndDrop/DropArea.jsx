import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import Drag from "./Drag.jsx";

const DropArea = () => {
	const [challengeData, setchallengeData] = useState([
		{ choices: [], equation: "" },
	]);
	const [index, setIndex] = useState(0);
	const [choices, setchoices] = useState(challengeData[index].choices);
	const [equation, setequation] = useState(challengeData[index].equation);
	const [responce, setresponce] = useState([]);
	const [goal, setGoal] = useState(false);
	const [challengeResponce, setchallengeResponce] = useState([]);
	const [submitFlag, setsubmitFlag] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/dndChallenge/1")
			.then(({ data }) => {
				setchallengeData(data.challengeData);
				setchoices(data.challengeData[index].choices);
				setequation(data.challengeData[index].equation);
			});
	}, []);

	const handelGoalClick = () => {
		setGoal(!goal);
		console.log(goal);
	};

	const passeToNext = () => {
		if (index < challengeData.length - 1) {
			setIndex(index + 1);
			setchoices(challengeData[index + 1].choices);
			setequation(challengeData[index + 1].equation);
			setresponce([]);
		}
		console.log(challengeResponce);
		if (challengeResponce.length < challengeData.length) {
			if (responce[0]) {
				setchallengeResponce([
					...challengeResponce,
					responce[0].name === challengeData[index].correct,
				]);
			} else {
				setchallengeResponce([...challengeResponce, false]);
			}
		}

		if (challengeResponce.length === challengeData.length)
			setsubmitFlag(true);
	};

	const submitResponce = () => {
		let test = challengeResponce.reduce(
			(acc, ele) => (ele ? acc + 1 : acc),
			0
		);
		console.log(test);
		if (test > 3) {
			localStorage.get();
			// update the user level
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
			setresponce([]);
			let ids = choices.map((choice) => choice.id);
			if (!ids.includes(item.id)) setchoices([...choices, item]);
			console.log("hhhhh");
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
						{submitFlag && (
							<div className='submit-btn'>
								<button onClick={submitResponce}>Submit</button>
							</div>
						)}
					</div>
					{!submitFlag && (
						<img
							src='https://cdn3d.iconscout.com/3d/premium/thumb/right-arrow-3711690-3105412.png'
							className='challenge-arrow right-arrow'
							onClick={passeToNext}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default DropArea;
