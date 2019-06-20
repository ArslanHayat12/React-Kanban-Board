import React, { useState, useEffect, Fragment } from "react";
import { Button } from "antd";
import Popup from "./Popup";
import "antd/dist/antd.css";
import "../styles/index.css";
const Head = (props: any) => {
  const [state, setState] = useState<{ visible?: boolean; type?: string }>({
    visible: false,
    type: "board"
  });
  const showModal = (type: string) => {
    setState({ visible: true, type });
  };
  const handleClose = (upadted: any) => {
    setState({ visible: false });
    props.updateAction(upadted);
  };

  return (
    <Fragment>
      <b>Kanban Board</b>
      <div className="buttons">
        <Button type="primary" onClick={() => showModal("board")}>
          Create Board
        </Button>{" "}
        &nbsp;
        <Button type="primary" onClick={() => showModal("card")}>
          Create Card
        </Button>
        <Popup
          title={`Create ${state.type}`}
          type={state.type}
          visible={state.visible}
          handleClose={handleClose}
        />
      </div>
    </Fragment>
  );
};

export default Head;
