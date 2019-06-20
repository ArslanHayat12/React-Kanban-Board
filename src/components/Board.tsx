import React, { useState, Fragment } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, initialState, makeCopy, getSelectedItem } from "../utils/";
import { ToDoState } from "../interfaces/";
import { Card } from "./Card";
import "../styles/index.css";

export const Board = ({ children, action, updateAction }: any) => {
  const [state, setState] = useState<ToDoState>(initialState());

  const getCardPayload = (columnId: any, index: number) => {
    return getSelectedItem("id", columnId, children).card[index];
  };
  const onCardDrop = (columnId: any, dropResult: any) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const board = makeCopy(initialState().board);
      const column = getSelectedItem("id", columnId, board.children);
      const columnIndex = board.children.indexOf(column);
      const newColumn = makeCopy(column);
      newColumn.card = applyDrag(newColumn.card, dropResult);
      board.children.splice(columnIndex, 1, newColumn);
      action(board);
      setState({ board });
    }
  };
  return (
    <Fragment>
      {children.map((column: any) => {
        return (
          <Draggable key={column.id}>
            <div className={column.props.className}>
              <div className="card-column-header">
                <span className="column-drag-handle">&#x2630;</span>
                {column.name}
              </div>
              <Container
                {...column.props}
                groupName="col"
                onDrop={e => onCardDrop(column.id, e)}
                getChildPayload={index => getCardPayload(column.id, index)}
                dragClass="card-transition"
                dropClass="card-drop"
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: "drop-preview"
                }}
                dropPlaceholderAnimationDuration={200}
              >
                <Card card={column.card} updateAction={updateAction} />
              </Container>
            </div>
          </Draggable>
        );
      })}
    </Fragment>
  );
};
