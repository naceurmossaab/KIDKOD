import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DndBasket from "./DndBasket";

const DnDBasket = ({ user, setUser, close }) => {
	return (
		<DndProvider backend={HTML5Backend}>
			<DndBasket close={close} user={user} setUser={setUser} />
		</DndProvider>
	);
};

export default DnDBasket;
