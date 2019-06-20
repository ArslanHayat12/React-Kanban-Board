import React, { useState, useEffect, Children } from "react";
import { Container } from "react-smooth-dnd";
import {
  applyDrag,
  initialState,
  makeCopy,
  updateObject,
  makeObject,
  reOrderBoard
} from "../utils/";
import { ToDoState } from "../interfaces/";
import { Board } from "./Board";
import "../styles/index.css";

const Dashboard = ({ data,updateAction }: any) => {
  const [state, setState] = useState<ToDoState>(initialState());

  useEffect(() => {
    setState(initialState());
  }, [data]);

  const updateState = (updatedBoard: any) => {
    const board = makeCopy(state.board);
    board.children = updateObject(board, updatedBoard, "children", "id");
    makeObject(board.children);
    setState({ board });
  };
  const onColumnDrop = (dropResult: any) => {
    const board = makeCopy(state.board);
    board.children = applyDrag(board.children, dropResult);
    reOrderBoard(board.children);
    setState({ board });
  };

  return (
    <div>
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview"
        }}
      >
        <Board data={data}children={state.board.children} action={updateState} updateAction={updateAction} />
      </Container>
    </div>
  );
};

export default Dashboard;
