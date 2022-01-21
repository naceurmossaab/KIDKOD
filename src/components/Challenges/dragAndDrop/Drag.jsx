import React from "react";
import { useDrag } from "react-dnd";

const Drag = ({ id, name }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "drag",
		item: { id, name },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return (
		<div className='drag-card' ref={dragRef}>
			{name}
		</div>
	);
};

export default Drag;
