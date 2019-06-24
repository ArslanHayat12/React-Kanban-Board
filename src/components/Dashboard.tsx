import React, { useState, useEffect,useContext,useCallback } from "react";
import { Container } from "react-smooth-dnd";
import { AppContext } from "../context/";
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

const Dashboard = () => {
  const [state, setState] = useState<ToDoState>(initialState());
  const { content } = useContext(AppContext);

  useEffect(() => {
    if (content.message === "isSearch") {
      const searched = searchRecords(
        initialState().board,
        "children",
        "card",
        content.value
      );
      setState(searched);
    } else {
      setState(initialState());
    }
  }, [content.value, content.message]);

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
      {content.message && content.message !== "isSearch" ? (
        <Alert
          message={content.message}
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
          children={state.board.children}
          action={updateState}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
