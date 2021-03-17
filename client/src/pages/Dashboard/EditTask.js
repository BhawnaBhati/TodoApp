import React, { useState } from "react";
import { Modal, Input } from "antd";
import { EditFilled } from "@ant-design/icons";
const { TextArea } = Input;

const EditTask = ({ task, editTask }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskname, setTaskName] = useState(task.name);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    editTask({ id: task.id, name: taskname });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <EditFilled
        style={{ fontSize: "20px", color: "#647278", cursor: "pointer" }}
        onClick={showModal}
      />
      <Modal
        title="Edit Task"
        okText="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        preserve={false}
      >
        <TextArea
          // type="textarea"
          placeholder="Task Name"
          name="taskname"
          value={taskname}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default EditTask;
