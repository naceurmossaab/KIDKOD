import React from "react";
const { useState, useEffect } = React;
import "./EvenOdd.css";
const EvenOdd = () => {
	return (
		<div className='container'>
			<DragAndDrop
				containers={containers}
				question='move even numbers to the left and odd numbers to the right'
			/>
		</div>
	);
};

const containers = [
	{ name: "Even numbers" },
	{
		name: "All numbers",
		items: ["Three", "Two", "Five", "Six", "One", "Seven", "Four"],
	},
	{ name: "Odd numbers" },
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

const DragAndDrop = ({ containers, question }) => {
	const initialData = { containers: input(containers) };
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
	};

	useEffect(() => {
		if (runTest) {
			handleMoveItemToNewContainer(appData, "container2", "container1");
		}
	});

	return (
		<div className='drag-and-drop'>
			<div className='drag-and-drop__header'>
				<h3>{question}</h3>
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
			<button type='submit' onClick={handelClick}>
				submit
			</button>
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
	return (
		<li
			className={`draggable-item draggable-item--${status}`}
			draggable='true'
			onDragStart={() => {
				handlePrepForDrop();
			}}
		>
			<h3 className='draggable-item__name'>{itemName}</h3>
		</li>
	);
};

const ColumnOptions = ({ isHovered }) => {
	const [isOpen, setOpen] = useState(false);
	const handleToggle = () => {
		setOpen(!isOpen);
	};

	return (
		<div className='column-options__container'>
			{/* <button
				aria-label='View column options'
				className='column-options__toggle'
				onClick={() => handleToggle()}
			></button> */}
			{/* <div
				className={`column-options__option-panel column-options__option-panel--${
					isOpen ? "active" : "default"
				}`}
			>
				<button>Edit Column Name</button>
				<button>Add Item</button>
			</div> */}
		</div>
	);
};

export default EvenOdd;
