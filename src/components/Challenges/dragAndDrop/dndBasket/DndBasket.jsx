import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import DragItem from "./DragItem.jsx";
import "./DndBasket.css";
// import WinAnimation from "./winAndLooseAnimation/WinAnimation.jsx";

const question = {
	choices: [
		{
			id: 1,
			name: "grap",
			categorie: "type1",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/grape-4521297-3753411.png",
		},
		{
			id: 2,
			name: "pear",
			categorie: "type1",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/pear-4521299-3753413.png",
		},
		{
			id: 3,
			name: "banana",
			categorie: "type1",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/banana-4521290-3753404.png",
		},
		{
			id: 4,
			name: "pineapple",
			categorie: "type1",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/pineapple-4521281-3753395.png",
		},
		{
			id: 5,
			name: "tomato",
			categorie: "type2",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/chili-4339984-3600611.png",
			// image: "https://cdn3d.iconscout.com/3d/premium/thumb/tomato-4383810-3640392.png",
		},
		{
			id: 6,
			name: "carotte",
			categorie: "type2",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/carrot-4383840-3640388.png",
		},
		{
			id: 7,
			name: "potato",
			categorie: "type2",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/potato-4339974-3600620.png",
		},
		{
			id: 8,
			name: "pumpkin",
			categorie: "type2",
			image: "https://cdn3d.iconscout.com/3d/premium/thumb/pumpkin-4383223-3640402.png",
		},
	],
	basketsNames: ["Fruits", "Vegetables"],
};

const DndBasket = ({ user, setUser, close }) => {
	const [challengeData, setchallengeData] = useState([
		{ choices: question.choices, equation: "" },
	]);
	const [index, setIndex] = useState(0);
	const [choices, setchoices] = useState(challengeData[index].choices);
	const [baskerType1, setbaskerType1] = useState([]);
	const [baskerType2, setbaskerType2] = useState([]);
	const [goal, setGoal] = useState(false);
	const [challengeResponce, setchallengeResponce] = useState([]);
	const [submitFlag, setsubmitFlag] = useState(false);
	const [handAnimation, sethandAnimation] = useState(true);
	const [view, setview] = useState({
		challenge: true,
		win: false,
		loose: false,
	});

	// useEffect(() => {
	// 	axios
	// 		.get("http://localhost:8000/api/dndChallenge/1")
	// 		.then(({ data }) => {
	// 			setchallengeData(data.challengeData);
	// 			setchoices(data.challengeData[index].choices);
	// 			setequation(data.challengeData[index].equation);
	// 		});
	// 	stopHandAnimation();
	// }, []);

	const stopHandAnimation = () => {
		setTimeout(() => {
			sethandAnimation(false);
		}, 11000);
	};

	const handelGoalClick = () => {
		setGoal(!goal);
	};

	const passeToNext = () => {
		if (index < challengeData.length - 1) {
			setIndex(index + 1);
			setchoices(challengeData[index + 1].choices);
			setbaskerType1([]);
			setbaskerType2([]);
		}
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

		console.log(challengeResponce);

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
			setUser({ ...user, level: user.level + 1 });
			axios
				.put(
					`http://localhost:8000/api/users/updateLevel/${user._id}`,
					{ level: user.level + 1 }
				)
				.then(({ data }) => {
					console.log(data.level);
				})
				.catch((err) => console.log(err));
		}
	};

	const [{ isOver }, dropChoiceRef] = useDrop({
		accept: "drag",
		drop: (item) => {
			let ids = choices.map((choice) => choice.id);
			if (!ids.includes(item.id)) setchoices([...choices, item]);
			setbaskerType1(
				baskerType1.filter((rest) => item.name !== rest.name)
			);
			setbaskerType2(
				baskerType2.filter((rest) => item.name !== rest.name)
			);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const [{ isOver1 }, dropBasket1Ref] = useDrop({
		accept: "drag",
		drop: (item) => {
			let ids = baskerType1.map((choice) => choice.id);
			if (!ids.includes(item.id)) setbaskerType1([...baskerType1, item]);
			setchoices(choices.filter((rest) => item.name !== rest.name));
			setbaskerType2(
				baskerType2.filter((rest) => item.name !== rest.name)
			);
		},
		collect: (monitor) => ({
			isOver1: monitor.isOver(),
		}),
	});
	const [{ isOver2 }, dropBasket2Ref] = useDrop({
		accept: "drag",
		drop: (item) => {
			let ids = baskerType2.map((choice) => choice.id);
			if (!ids.includes(item.id)) setbaskerType2([...baskerType2, item]);
			setchoices(choices.filter((rest) => item.name !== rest.name));
			setbaskerType1(
				baskerType1.filter((rest) => item.name !== rest.name)
			);
		},
		collect: (monitor) => ({
			isOver2: monitor.isOver(),
		}),
	});
	return (
		<React.Fragment>
			{view.challenge ? (
				<div className='dnd-container2'>
					{/* {handAnimation && (
						<div className='hand-animation'>
							<video
								loading='lazy'
								muted='muted'
								src='https://cdn.discordapp.com/attachments/902991650727538769/932640853799866458/dragAndDropInstractions.mp4'
								type='video/mp4'
								autoplay='autoplay'
								loop='loop'
							></video>
						</div>
					)} */}
					<div className='icons'>
						<img
							className='challenge-goal icon'
							src='https://cdn3d.iconscout.com/3d/premium/thumb/down-arrow-2871138-2384397.png'
							onClick={handelGoalClick}
						/>

						<img
							className='challenge-close icon'
							src='https://cdn3d.iconscout.com/3d/premium/thumb/close-4112733-3408782@0.png'
							onClick={close}
						/>
					</div>
					{goal && (
						<div className='goal-text'>
							Your child begins by understanding that 'add'
							'substract' ... means to combine two groups of
							objects. Children will soon learn to pair numbers
							that sum to to 5, then 10, and upwards from there.
							These are called number bonds and are very important
							because larger calculations usually depend on being
							fluent with them.
						</div>
					)}
					<div className='question-container'>
						<div className='sub-container'>
							<div className='question-responce'>
								<div className='question'>
									Which is the missing number ?
								</div>
								<div className='choices'>
									{/* <div className='responce-detail'>
										{equation}
									</div> */}

									<div
										className='choices-pics'
										ref={dropChoiceRef}
									>
										{choices.map((item, index) => (
											<DragItem
												draggable
												id={item.id}
												key={index}
												name={item.name}
												image={item.image}
											/>
										))}
									</div>
								</div>
							</div>
							<div className='basket-container'>
								<div className='basket-and-basket-label'>
									<div
										className='basket  basket-typt-1'
										ref={dropBasket1Ref}
									>
										{baskerType1.map((item, index) => (
											<DragItem
												draggable
												id={item.id}
												key={index}
												name={item.name}
												image={item.image}
											/>
										))}
									</div>
									<div className='basket-label'>
										{question.basketsNames[0]}
									</div>
								</div>
								<div className='basket-and-basket-label'>
									<div
										className='basket  basket-typt-2'
										ref={dropBasket2Ref}
									>
										{baskerType2.map((item, index) => (
											<DragItem
												draggable
												id={item.id}
												key={index}
												name={item.name}
												image={item.image}
											/>
										))}
									</div>
									<div className='basket-label'>
										{question.basketsNames[1]}
									</div>
								</div>
							</div>
							{submitFlag && (
								<div className='submit-btn'>
									<button onClick={submitResponce}>
										Submit
									</button>
								</div>
							)}
						</div>
						<div className='next-arrow'>
							{!submitFlag && (
								<div  className="next-label">
									<div>NEXT</div>
									<video
										loading='lazy'
										muted='muted'
										src='https://cdnl.iconscout.com/lottie/premium/thumb/forward-3428862-2914892.mp4'
										width='45.06976744186045'
										height='45.06976744186045'
										type='video/mp4'
										autoplay='autoplay'
										loop='loop'
									></video>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div>
					<div>
						{view.loose && (
							<div className='dnd-container2'>LOOOOOSE</div>
						)}
					</div>
					<div>
						{view.win && (
							<div className='dnd-container2'>
								{/* <WinAnimation /> */}
							</div>
						)}
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default DndBasket;
