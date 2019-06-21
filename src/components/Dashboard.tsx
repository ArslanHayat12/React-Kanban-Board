import React, { useState, useEffect, Fragment } from "react";
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
import { Alert } from "antd";
import "../styles/index.css";

const Dashboard = ({ data }: any) => {
  const [state, setState] = useState<ToDoState>(initialState());

  useEffect(() => {
    if (data.message === "isSearch") {
      const searched = searchRecords(
        initialState().board,
        "children",
        "card",
        data.value
      );
      setState(searched);
    } else {
      setState(initialState());
    }
  }, [data.value, data.message]);

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
    <div className="content">
      {data.message && data.message !== "isSearch" ? (
        <Alert
          message={data.message}
          type="success"
          showIcon
          className="alert"
        />
      ) : null}

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
        />
      </Container>
    </div>
  );
};

export default Dashboard;
