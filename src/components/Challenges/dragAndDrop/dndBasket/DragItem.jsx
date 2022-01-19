import React from "react";
import { useDrag } from "react-dnd";

const DragItem = ({ id, name, image }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: "drag",
		item: { id, name },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return <img src={image} className='drg-item-image' ref={dragRef} />;
};

export default DragItem;
