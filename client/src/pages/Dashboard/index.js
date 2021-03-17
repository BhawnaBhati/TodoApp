import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Layout, Row, Col, Input as AntInput } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useTaskSlice } from "pages/Dashboard/slice";
import { useUserSlice } from "pages/Login/slice";
import { selectTask } from "pages/Dashboard/slice/selectors";
import { selectUser } from "pages/Login/slice/selectors";

import "antd/dist/antd.css";
import Header from "./Header";
import TaskCards from "./TaskCards";
import TaskList from "./TaskList";
import NewTask from "./NewTask";

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // TODO : make it 100vh - 72px (header height)
  height: 88vh;
  width: 100%;
`;

const Wrapper = styled.div`
  @media (min-width: 1024px) {
    padding: 20px 80px;
  }
`;

const Content = styled.div`
  width: 300px;
  background-color: white;
  font-family: ${(props) => props.theme.fonts[0]};
  border-radius: 12px;
  padding: 10px;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.gray1};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  border: none;
  border-radius: 8px;
  margin: 12px 24px;
  min-width: 240px;
`;

const Button = styled(Input)`
  display: block;
  padding: 10px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  border: none;
  border-radius: 8px;
  margin: 12px 24px 30px;
  min-width: 240px;
  color: white;
  background-color: ${(props) => props.theme.colors.blue};
  min-width: 250px;
`;

// const NewTask = () => <Button type="submit" value="+ New Task" />;

const Heading = styled.h1`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.tealLike};
  padding-top: 8px;
`;

const Dashboard = () => {
  const { actions } = useTaskSlice();
  const { actions: userActions } = useUserSlice();
  const { isAuthenticated, userData } = useSelector(selectUser);
  const {
    latestTasks,
    tasksCompleted,
    totalTasks,
    isLoaded,
    filteredTasks,
  } = useSelector(selectTask);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && !isLoaded) {
      dispatch(actions.dashboardRequest());
      dispatch(actions.searchTaskRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { username } = userData;
  if (!isAuthenticated) {
    return <Redirect to={"/"} />;
  }

  const handleLogout = () => {
    dispatch(actions.clearDashboard());
    dispatch(userActions.logoutSuccess());
    // return <Redirect to={"/"} />;
  };

  const handleSearch = (keyword) => {
    if (keyword && keyword.length >= 3) {
      // call API in half a second when search word is passed
      setTimeout(
        () => dispatch(actions.searchTaskRequest({ name: keyword })),
        500
      );
    }
  };

  const addTask = (taskname) => {
    dispatch(actions.addTaskRequest({ name: taskname }));
  };

  const editTask = (task) => {
    dispatch(actions.editTaskRequest(task));
  };

  const deleteTask = (task) => {
    dispatch(actions.deleteTaskRequest(task));
  };

  const toggleTaskCompleted = (task) => {
    task.completed = !task.completed;
    dispatch(actions.editTaskRequest(task));
  };

  return (
    <Layout>
      <Header handleLogout={handleLogout} username={username} />
      {totalTasks <= 0 ? (
        <ContentWrapper>
          <Content>
            <Heading>You have no task.</Heading>
            <NewTask addTask={addTask} />
          </Content>
        </ContentWrapper>
      ) : (
        <Wrapper>
          <TaskCards
            latestTasks={latestTasks}
            tasksCompleted={tasksCompleted}
            totalTasks={totalTasks}
          />
          <Row style={{ padding: "30px" }}>
            <Col xs={8} md={15}>
              <Heading>Tasks</Heading>
            </Col>
            <Col xs={8} md={5}>
              <AntInput
                prefix={<SearchOutlined />}
                style={{ padding: "8px" }}
                placeholder="Search By Task Name"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
            <Col xs={1} md={1}></Col>
            <Col xs={3} md={2}>
              <NewTask addTask={addTask} />
            </Col>
          </Row>

          <TaskList
            filteredTasks={filteredTasks}
            toggleTaskCompleted={toggleTaskCompleted}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        </Wrapper>
      )}
    </Layout>
  );
};

export default Dashboard;
