import React from "react";
import styled from "styled-components";
import { Table, Typography, Checkbox } from "antd";
import "antd/dist/antd.css";
import { DeleteFilled } from "@ant-design/icons";

import EditTask from "./EditTask";

const Wrapper = styled.div`
  padding: 30px;
  font-family: ${(props) => props.theme.fonts[0]};
  @media screen and (max-width: 360px) {
    padding: 5px;
  }
`;

const Text = styled(Typography.Text)`
  color: ${({ theme: { colors } }) => colors.blue};

  font-family: ${(props) => props.theme.fonts[0]};
  overflow-wrap: anywhere;
  @media (min-width: 360px) {
    max-width: 150px;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.smaller};
  }
  @media (min-width: 768px) {
    max-width: 300px;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  }
  @media (min-width: 1024px) {
    max-width: 1050px;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
  }
`;

const TaskList = ({
  filteredTasks,
  editTask,
  deleteTask,
  toggleTaskCompleted,
}) => {
  const columns = [
    {
      title: "",
      key: "id",
      dataIndex: "name",
      editable: true,
      render: (text, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => toggleTaskCompleted(record)}
        >
          <Text delete={record.completed}>{text}</Text>
        </Checkbox>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (text, record) => <EditTask editTask={editTask} task={record} />,
      width: ".1rem",
    },
    {
      title: "",
      dataIndex: "",
      render: (text, record) => (
        <DeleteFilled
          style={{ fontSize: "20px", color: "#647278", cursor: "pointer" }}
          onClick={() => deleteTask(record)}
        />
      ),
      width: ".1rem",
    },
  ];

  const mappedData = Array.isArray(filteredTasks)
    ? filteredTasks.map((item) => {
        return { ...item, key: item.id };
      })
    : [];
  return (
    <Wrapper>
      <Table columns={columns} dataSource={mappedData} width="100%" />
    </Wrapper>
  );
};

export default TaskList;
