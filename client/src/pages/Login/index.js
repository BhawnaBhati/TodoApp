import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { useUserSlice } from "./slice";
import { selectUser } from "./slice/selectors";

const LoginContainerBox = styled.div`
  background-color: #f4f4f6;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const LoginContainer = styled.div`
  width: 300px;
  background-color: white;
  font-family: ${(props) => props.theme.fonts[0]};
  border-radius: 12px;
  padding: 10px;
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
  &:input:visited {
    outline: none;
    border: 0px;
    // box-shadow: 0px 0px 2px red;
  }
`;

const Button = styled(Input)`
  color: white;
  background-color: ${(props) => props.theme.colors.blue};
  min-width: 240px;
`;

const Heading = styled.h1`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${({ isHeading, theme: { fontSizes } }) =>
    isHeading ? fontSizes.medium : fontSizes.small};
  color: ${({ theme: { colors } }) => colors.tealLike};
  margin: 24px;
`;

const Login = () => {
  const { actions } = useUserSlice();
  const { isAuthenticated } = useSelector(selectUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  if (isAuthenticated) {
    console.log("redirecting to dashboard");
    return <Redirect to={"/home"} />;
  }

  return (
    <LoginContainerBox>
      <LoginContainer>
        <Heading isHeading>Login</Heading>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          value="Login"
          onClick={() => {
            dispatch(actions.loginRequest({ username, password }));
          }}
        />
      </LoginContainer>
    </LoginContainerBox>
  );
};

export default Login;
