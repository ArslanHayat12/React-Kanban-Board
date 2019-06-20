import React, { useState, useEffect } from "react";
import { Button } from "antd";
import InputForm from "./InputForm";
import { getItem, setItem, storeItems, deleteItems } from "../utils/";
import "antd/dist/antd.css";

const Popup = (props: any) => {
  const {
    type,
    visible,
    handleClose,
    title,
    cardId,
    canDelete,
    boardId
  } = props;

  const handleCreate = (formData: any) => {
    const form = formData;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      storeItems(type, values, cardId);
      form.resetFields();
      handleClose(
        values,
        cardId ? "Card updation successful." : "Creation successful."
      );
    });
  };
  const handleDelete = (message: string) => {
    if (boardId) deleteItems(boardId, "key", "boardItems");
    else deleteItems(cardId, "key", "cardItems");
    handleClose(cardId || boardId, message);
  };
  return (
    <div>
      <InputForm
        title={title}
        type={type}
        visible={visible}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onCancel={handleClose}
        cardId={cardId}
        canDelete={canDelete}
      />
    </div>
  );
};

export default Popup;
