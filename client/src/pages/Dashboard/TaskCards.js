import React from "react";
import Chart from "react-google-charts";
import styled from "styled-components";
import { Card as AntCard, Col, Row, Typography } from "antd";

import "antd/dist/antd.css";

const CardWrapper = styled.div`
  padding: 30px;
  @media screen and (max-width: 360px) {
    padding: 5px;
  }
`;

const Card = styled(AntCard)`
  .ant-card-body {
    font-family: ${(props) => props.theme.fonts[0]};
    color: ${({ theme: { colors } }) => colors.tealLike};
    font-weight: 600;
    min-height: 180px;
    border: 5px black;
    margin-top: 20px;
    padding: ${(props) => (props.nopadding ? "12px" : "24px")};

    @media screen and (max-width: 1024px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
    }
    @media screen and (max-width: 768px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
    }
    @media screen and (max-width: 360px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
    }
  }

  &.ant-card {
    border-radius: 12px;
  }
`;

const Span = styled.span`
  &.toneDown {
    padding-top: 35px;
    opacity: 0.85;
  }

  &.highlight {
    color: ${({ theme: { colors } }) => colors.blue};
    font-size: 2.8em;
  }
`;

const TaskList = styled.ul`
  padding-left: 30px;
  @media screen and (max-width: 768px) {
    padding-left: 10px;
  }
  @media screen and (max-width: 360px) {
    padding: 30px;
  }
`;

const Task = styled.li``;

const Text = styled(Typography.Text)`
  color: ${({ theme: { colors } }) => colors.tealLike};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.smaller};
  font-family: ${(props) => props.theme.fonts[0]};
`;

const TaskCards = ({ latestTasks, tasksCompleted, totalTasks }) => {
  const tasksPending = totalTasks - tasksCompleted;
  console.log(tasksCompleted, tasksPending);
  return (
    <CardWrapper>
      {/* <div className="site-card-wrapper"> */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Row>Tasks Completed</Row>
            <Row>
              <Span className="highlight">{tasksCompleted}</Span>
              <Span className="toneDown">/{totalTasks}</Span>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Row>Latest Created Tasks</Row>
            <Row>
              <TaskList>
                {latestTasks.map((task) => {
                  return (
                    <Task>
                      <Text delete={task.completed}>
                        {task.name.length > 26
                          ? task.name.slice(0, 26) + "..."
                          : task.name}
                      </Text>
                    </Task>
                  );
                })}
              </TaskList>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false} nopadding>
            <Chart
              chartType="PieChart"
              width={"100%"}
              height={"150px"}
              data={[
                ["Task", "Status"],
                ["Completed", Number(tasksCompleted)],
                ["Pending", Number(tasksPending)],
              ]}
              options={{
                legend: "none",
                slices: {
                  0: { color: "#5285EC" },
                  1: { color: "#E8ECEC" },
                },
                chartArea: { width: "80%", height: "80%" },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </Card>
        </Col>
      </Row>
      {/* </div> */}
    </CardWrapper>
  );
};

export default TaskCards;
