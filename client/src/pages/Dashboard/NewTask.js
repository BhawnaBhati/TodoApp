import React, { useState } from "react";
import { Modal as AntModal, Button, Input } from "antd";
import styled from "styled-components";
const { TextArea } = Input;

const Modal = styled(AntModal)`
  button.ant-btn.ant-btn-primary {
    background-color: "#5285EC";
  }
`;

const NewTask = ({ addTask }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskname, setTaskName] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addTask(taskname);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginTop: "4px", backgroundColor: "#5285EC" }}
      >
        New Task
      </Button>
      <Modal
        title="Add New Task"
        okText="Add"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        preserve={false}
      >
        <TextArea
          type="textarea"
          placeholder="Task Name"
          name="taskname"
          value={taskname}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default NewTask;
