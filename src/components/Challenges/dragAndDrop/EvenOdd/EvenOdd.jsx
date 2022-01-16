import React from "react";
const { useState, useEffect } = React;
import "./EvenOdd.css";
// const DragAndDropQuiz = (choices = [], announcement = "") => {
// 	return (
// 		// <div className='container'>
// 		<DragAndDrop containers={choices} question={announcement} />
// 		// </div>
// 	);
// };

// const containers = [
// 	{ name: "Even numbers" },
// 	{
// 		name: "All numbers",
// 		items: ["Three", "Two", "Five", "Six", "One", "Seven", "Four"],
// 	},
// 	{ name: "Odd numbers" },
// ];

// [
// 	{
// 		name: "result is 5",
// 	},
// 	{
// 		name: "All numbers",
// 		items: [2, 3, 4, 5, 6, 24, "=", "+", "X", "="],
// 	},
// 	{
// 		name: "result is 24",
// 	},
// ];

var containers = [
	{
		announcement:
			"Formulate a product operation on the right to get 24 and a sum operation on the left to get 5",
		choices: [
			{
				name: "result is 5",
			},
			{
				name: "All numbers",
				items: [2, 3, 4, 5, 6, 24, "=", "+", "x", "="],
			},
			{
				name: "result is 24",
			},
		],
		correct: [
			{
				5: [2, "+", 3, "=", 5],
				24: [4, "x", 6, "=", 24],
			},
		],
	},
	{
		announcement:
			"move numbers greater than ten to the left and numbers lesser thna ten to the right",
		choices: [
			{
				name: "Greater",
			},
			{
				name: "All numbers",
				items: [
					"Three",
					"Two",
					"Five",
					"Six",
					"Eleven",
					"Therteen",
					"Twenty",
				],
			},
			{
				name: "Lesser",
			},
		],
		correct: [
			{
				greater: ["Three", "Five", "Six", "Two"],
				lesser: ["Eleven", "Therteen", "Twenty"],
			},
		],
	},
	{
		announcement:
			"move even numbers to the left and odd numbers to the right",
		choices: [
			{
				name: "Even numbers",
			},
			{
				name: "All numbers",
				items: ["Three", "Two", "Five", "Six", "One", "Seven", "Four"],
			},
			{
				name: "Odd numbers",
			},
		],
		correct: [
			{
				odd: ["One", "Three", "Five", "Seven"],
				even: ["Two", "Four", "Six"],
			},
		],
	},
];

const items = (array) =>
	array.map((ele, i) => {
		let item = {
			itemName: ele,
			status: "ok",
			id: "item" + (i + 1),
		};
		return item;
	});

const input = (array) => {
	// console.log("ggggggggggg", array);
	var containers = {};
	for (var i = 0; i < array.length; i++) {
		var str = "container" + (i + 1);
		containers[str] = {
			name: array[i].name,
			key: str,
			items: array[i].items ? items(array[i].items) : [],
		};
	}
	return containers;
};

const DragAndDrop = (props) => {
	const [index, setindex] = useState(0);
	let initialData = { containers: input(containers[index].choices) };
	const [dragStatus, setDragStatus] = useState(null);
	const [appData, setAppData] = useState(initialData);
	const [runTest, setRunTest] = useState(false);
	const [currentContainer, setCurrentContainer] = useState(null);
	const [itemId, setItemId] = useState(null);
	const [response, setResponse] = useState(null);


	const handleMoveItemToNewContainer = (
		currentState,
		newContainer,
		currentContainer,
		itemId,
		index
	) => {
		const newState = { ...currentState };
		const newContainerItems = newState.containers[newContainer].items;
		const currentContainerItems =
			newState.containers[currentContainer].items;
		const itemToMove = currentContainerItems.filter(
			(item) => itemId === item.id
		);
		if (newContainer === currentContainer) {
			return;
		} else {
			newState.containers[newContainer].items = [
				...newContainerItems,
				itemToMove[0],
			];
			newState.containers[currentContainer].items = [
				...currentContainerItems.filter((item) => item.id !== itemId),
			];
			console.log(newState);
			setResponse(newState);
			setAppData(newState);
		}
	};

	const handelClick = () => {
		console.log(response);
		var inc = index + 1;
		if (index < containers.length-1) {
			setindex(inc)
				setAppData({containers: input(containers[index].choices)})
				}
		else props.close()
	};

	useEffect(() => {
		if (runTest) {
			handleMoveItemToNewContainer(appData, "container2", "container1");
		}
	});

	return (
		<div className='container'>
						<img onClick={()=>{props.close()}} id="close" src="https://cdn.discordapp.com/attachments/902266709568782436/931835733495382026/close.png"/>

			<div className='drag-and-drop'>
				<div className='drag-and-drop__header'>
					<h3>{containers[index].announcement}</h3>
				</div>
				<div className='drag-and-drop__content'>
					{Object.keys(appData.containers).map((container, i) => {
						return (
							<DropContainer
								key={i}
								setCurrentContainer={setCurrentContainer}
								name={appData.containers[container].name}
								id={container}
								containerKey={appData.containers[container].key}
								items={appData.containers[container].items}
								handleMoveItemToNewContainer={
									handleMoveItemToNewContainer
								}
								currentContainer={currentContainer}
								appData={appData}
								setItemId={setItemId}
								itemId={itemId}
							/>
						);
					})}
				</div>
				<button
					className='submitBTN'
					type='submit'
					onClick={handelClick}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

const DropContainer = ({
	items,
	name,
	setCurrentContainer,
	handleMoveItemToNewContainer,
	currentContainer,
	appData,
	containerKey,
	setItemId,
	itemId,
}) => {
	const [isHovered, setHovered] = useState(false);

	const dragOver = (e) => {
		e.preventDefault();
	};

	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
	};

	const dragDrop = (e) => {
		e.preventDefault();
		console.log(containerKey);
		handleMoveItemToNewContainer(
			appData,
			containerKey,
			currentContainer,
			itemId,
			0
		);
	};

	return (
		<div className='column'>
			<div className={"column__toolbar"}>
				<h2 className='column__name'>{name}</h2>
				{/* <ColumnOptions isHovered={isHovered} /> */}
			</div>
			<ul
				className='drop-container'
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={dragDrop}
				onMouseOver={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				{items && items.length > 0
					? items.map((item, index) => {
							return (
								<DraggableItem
									key={index}
									itemName={item.itemName}
									itemId={item.id}
									setItemId={setItemId}
									setCurrentContainer={setCurrentContainer}
									currentContainerName={containerKey}
								/>
							);
					  })
					: "No items"}
			</ul>
		</div>
	);
};

const DraggableItem = ({
	itemName,
	itemId,
	status = "ok",
	currentContainerName,
	setCurrentContainer,
	setItemId,
}) => {
	const handlePrepForDrop = () => {
		setItemId(itemId);
		setCurrentContainer(currentContainerName);
	};
	return (<div>
		<li
			className={`draggable-item draggable-item--${status}`}
			draggable='true'
			onDragStart={() => {
				handlePrepForDrop();
			}}
		>
			<h3 className='draggable-item__name'>{itemName}</h3>
		</li>
		</div>
	);
};

export default DragAndDrop;
