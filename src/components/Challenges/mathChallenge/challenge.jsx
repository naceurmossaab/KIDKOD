import React, { useState, useEffect } from "react";
import axios from "axios";
import DragAndDrop from "../dragAndDrop/EvenOdd/EvenOdd.jsx";

const Challenge = () => {
	const [content, setcontent] = useState({
		quations: [{ choices: [], announcement: "" }],
	});
	let tasks = content.quations;

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/challenge/1`)
			.then(({ data }) => {
				setcontent(data);
				console.log(tasks);
			})
			.catch((err) => console.log(err));
	}, [content._id]);

	return (
		<div>
			<DragAndDrop
				containers={tasks[0].choices}
				question={tasks[0].announcement}
			/>
		</div>
	);
};

export default Challenge;
