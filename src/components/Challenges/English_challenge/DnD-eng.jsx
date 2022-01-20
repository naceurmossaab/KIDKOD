import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropArea from "./DropArea-eng";
import "./DnD-Eng.css";

const EngDnD = ({ user, setUser, close }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DropArea close={close} user={user} setUser={setUser} />
    </DndProvider>
  );
};

export default EngDnD;
