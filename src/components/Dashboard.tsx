import React, { useState, useEffect } from "react";
import { Container } from "react-smooth-dnd";
import {
  applyDrag,
  initialState,
  makeCopy,
  updateObject,
  makeObject,
  reOrderBoard,
  searchRecords
} from "../utils/";
import { ToDoState } from "../interfaces/";
import { Board } from "./Board";
import "../styles/index.css";

const Dashboard = ({ data, updateAction, message }: any) => {
  const [state, setState] = useState<ToDoState>(initialState());

  useEffect(() => {
    if (message === "isSearch") {
      const searched = searchRecords(
        initialState().board,
        "children",
        "card",
        data
      );
      setState(searched);
    } else {
      setState(initialState());
    }
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
        <Board
          data={data}
          children={state.board.children}
          action={updateState}
          updateAction={updateAction}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
