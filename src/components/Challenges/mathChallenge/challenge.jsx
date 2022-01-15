import React, { useState, useEffect } from "react";
import axios from "axios";
import DragAndDrop from "../dragAndDrop/EvenOdd/EvenOdd.jsx";

const Challenge = () => {
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
					items: [2, 3, 4, 5, 6, 24, "=", "+", "X", "="],
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
					items: [
						"Three",
						"Two",
						"Five",
						"Six",
						"One",
						"Seven",
						"Four",
					],
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
	// const [content, setcontent] = useState({
	// 	quations: [{ choices: [], announcement: "" }],
	// });
	// let tasks = content.quations;

	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:8000/api/challenge/1`)
	// 		.then(({ data }) => {
	// 			setcontent(data);
	// 			// console.log(tasks);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [content._id]);
	const [index, setindex] = useState(0)
	return (
		<div>
			<DragAndDrop
				question={containers[index].announcement}
				containers={containers[index].choices}
			/>
		</div>
	);
};

export default Challenge;
