import React, { Fragment } from "react";
import { Modal, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { getItem, getSelectedItem } from "../utils/";
const { Option } = Select;
const InputForm = (props: any) => {
  const {
    visible,
    title,
    type,
    onCancel,
    onCreate,
    form,
    cardId,
    canDelete,
    onDelete
  } = props;
  const { getFieldDecorator } = form;
  const boardItems = getItem("boardItems") || [];
  const selectedItem = cardId
    ? getSelectedItem("key", cardId, getItem("cardItems"))
    : {};
 
 
  return (
    <Modal
      visible={visible}
      title={title}
      okText={title}
      onCancel={onCancel}
      onOk={() => (canDelete ? onDelete(form) : onCreate(form))}
    >
      {canDelete ? 
        `Do you want to delete ${selectedItem.title} card?`
      : (
        <Form layout="vertical">
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              initialValue: selectedItem && selectedItem.title,
              rules: [
                {
                  required: true,
                  message: `Please enter title of the ${type}`
                }
              ]
            })(<Input />)}
          </Form.Item>
          {type === "card" ? (
            <Fragment>
              <Form.Item label="Description">
                {getFieldDecorator("description", {
                  initialValue: selectedItem && selectedItem.description,
                  rules: [
                    {
                      required: true,
                      message: `Please enter description of the ${type}`
                    }
                  ]
                })(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="Board">
                {getFieldDecorator("boardId", {
                  initialValue: selectedItem && selectedItem.boardId,
                  rules: [
                    {
                      required: true,
                      message: "Please select board name"
                    }
                  ]
                })(
                  <Select placeholder="Select board name">
                    {boardItems &&
                      boardItems.map((x: any) => {
                        return <Option key={x.key}>{x.title}</Option>;
                      })}
                  </Select>
                )}
              </Form.Item>
            </Fragment>
          ) : null}
        </Form>
      )}
    </Modal>
  );
};

export default Form.create<any>({ name: "form_in_modal" })(InputForm);
