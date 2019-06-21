import React, { Fragment, useState,useContext } from "react";
import { Draggable } from "react-smooth-dnd";
import {AppContext} from "../context/";
import { Icon } from "antd";
import Popup from "./Popup";
import "../styles/index.css";

export const Card = ({ card }: any) => {
  const { dispatch } = useContext(AppContext);
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

  const handleClose = (value: string, message: string) => {
    setState({ type: "card", visible: false });
    if(dispatch) dispatch({type:"UPDATE_DATA",value,message});
    setTimeout(() => {
      if (dispatch) dispatch({ type: "UPDATE_DATA", value: "", message: "" });
    }, 3000);
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
              <p>{card.description}</p>
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
