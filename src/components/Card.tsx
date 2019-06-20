import React, { Fragment, useState } from "react";
import { Draggable } from "react-smooth-dnd";
import { Icon, Divider } from "antd";
import Popup from "./Popup";
import "../styles/index.css";
export const Card = ({ card, updateAction }: any) => {
  const [state, setState] = useState<{
    visible?: boolean;
    type?: string;
    editable?: boolean;
    cardId?: string;
    canDelete?: boolean;
  }>({
    visible: false,
    type: "card",
    cardId: "",
    canDelete: false
  });
  const showModal = (cardId: string) => {
    setState({ type: "card", visible: true, cardId });
  };
  const handleClose = (upadted: any, isData: boolean) => {
    setState({ type: "card", visible: false });
    if (isData) updateAction(upadted);
  };

  const deleteCard = (cardId: any) => {
    setState({ type: "card", visible: true, cardId, canDelete: true });
  };
  return (
    <Fragment>
      {card.filter(Boolean).map((card: any) => {
        return (
          <Draggable key={card.id}>
            <div {...card.props}>
              <div className="card-content">
                <div className="title">
                  <h3>{card.title}</h3>
                </div>
                <div className="icons">
                  <span onClick={e => showModal(card.id)}>
                    <Icon type="edit" />
                  </span>{" "}
                  <span
                    className="delete-icon"
                    onClick={e => deleteCard(card.id)}
                  >
                    <Icon type="delete" />
                  </span>
                </div>
              </div>
              <hr />
              <p>{card.data}</p>
            </div>
          </Draggable>
        );
      })}
      <Popup
        title={
          state.canDelete ? `Delete  ${state.type}` : `Update ${state.type}`
        }
        type={state.type}
        visible={state.visible}
        handleClose={handleClose}
        editable={state.editable}
        cardId={state.cardId}
        canDelete={state.canDelete}
      />
    </Fragment>
  );
};
