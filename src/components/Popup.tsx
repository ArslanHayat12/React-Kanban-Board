import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import Form from "./Form";
import { getMessage, storeItems, deleteItems } from "../utils/";
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
      values.key = uniqid();
      storeItems(type, values, cardId);
      form.resetFields();
      handleClose(
        values.key,
        cardId
          ? `Card "${values.title}"updation successful.`
          : getMessage(
              values.boardId,
              `Card "${values.title}" creation successful.`,
              `Board "${values.title}" creation successful.`
            )
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
      <Form
        title={title}
        type={type}
        visible={visible}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onCancel={handleClose}
        cardId={cardId}
        boardId={boardId}
        canDelete={canDelete}
      />
    </div>
  );
};

export default Popup;
