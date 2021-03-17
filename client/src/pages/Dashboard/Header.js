import * as React from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

import profileImg from "images/donn-gabriel.png";

const StyledHeader = styled(Layout.Header)`
  height: 72px;
  background-color: white;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1;
  color: ${({ theme: { colors } }) => colors.tealLike};
  font-family: ${({ theme: { fonts } }) => fonts[0]};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
  font-weight: 600;
`;

const Logout = styled.div`
  cursor: pointer;
`;

export default function Header({ username, handleLogout }) {
  return (
    <>
      <StyledHeader>
        <Row>
          <Col xs={6} md={2}>
            <img src={profileImg} alt="profile" />
          </Col>
          <Col xs={6} md={2}>
            {username}
          </Col>
          <Col xs={8} md={18}></Col>
          <Col xs={4} md={2}>
            <Logout onClick={handleLogout}>Logout</Logout>
          </Col>
        </Row>
      </StyledHeader>
    </>
  );
}
