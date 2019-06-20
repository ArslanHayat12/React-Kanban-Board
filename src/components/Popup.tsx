import React, { useState, useEffect } from "react";
import { Button } from "antd";
import InputForm from "./InputForm";
import { getItem,setItem,storeItems,deleteItems } from "../utils/";
import "antd/dist/antd.css";

const Popup = (props: any) => {
  const {type,visible,handleClose,title,cardId,canDelete}=props;

  const handleCreate = (formData: any) => {
    const form = formData;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      storeItems(type,values,cardId);
      form.resetFields();
      handleClose(values,"true");
    });
  };
  const handleDelete = (formData: any) => {
    const form = formData;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      deleteItems(cardId);
      handleClose(cardId,"true");
    });
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
