import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropArea from "./DropArea";
import "./DnD.css";

const DnD = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<DropArea />
		</DndProvider>
	);
};

export default DnD;
