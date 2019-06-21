import React, { useState, Fragment, useContext } from "react";
import { AppContext } from "../context/";
import { Button, Input,Layout } from "antd";
import Popup from "./Popup";
import "antd/dist/antd.css";
import "../styles/index.css";
const Search = Input.Search;
const { Header }  = Layout;
const HeaderContent = () => {
  const { dispatch } = useContext(AppContext);
  const [state, setState] = useState<{ visible?: boolean; type?: string }>({
    visible: false,
    type: "board"
  });
  
  const showModal = (type: string) => {
    setState({ visible: true, type });
  };

  const handleClose = (value: any, message: string) => {
    setState({ visible: false });
    if (dispatch) dispatch({ type: "UPDATE_DATA", value, message });
    setTimeout(() => {
      if (dispatch) dispatch({ type: "UPDATE_DATA", value: "", message: "" });
    }, 3000);
  };

  return (
    <Header className="header">
      <b>Kanban Board</b>
      <div className="buttons">
        <Search
          placeholder="input search text"
          onChange={e => dispatch && dispatch({ type: "UPDATE_DATA", value:e.target.value, message:"isSearch"})}
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
    </Header>
  );
};

export {  HeaderContent as default};
