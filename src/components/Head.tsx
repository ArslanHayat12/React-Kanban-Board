import React, { useState, Fragment } from "react";
import { Button, Input } from "antd";
import Popup from "./Popup";
import "antd/dist/antd.css";
import "../styles/index.css";
const Search = Input.Search;
const Head = (props: any) => {
  const [state, setState] = useState<{ visible?: boolean; type?: string }>({
    visible: false,
    type: "board"
  });
  const showModal = (type: string) => {
    setState({ visible: true, type });
  };
  const handleClose = (upadted: any, message: string) => {
    setState({ visible: false });
    props.updateAction(upadted, message);
  };

  return (
    <Fragment>
      <b>Kanban Board</b>
      <div className="buttons">
        <Search
          placeholder="input search text"
          onChange={e =>  props.updateAction(e.target.value,"isSearch")}
          style={{ width: 200 }}
          
        />{" "}
        <Button type="primary" onClick={() => showModal("board")}>
          Create Board
        </Button>{" "}
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
