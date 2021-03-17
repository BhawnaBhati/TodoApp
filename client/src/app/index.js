import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "pages/Login/slice/selectors";
import { useUserSlice } from "pages/Login/slice";

import Login from "pages/Login";
import Dashboard from "pages/Dashboard";

function PersistUser() {
  const { actions } = useUserSlice();
  const { isAuthenticated } = useSelector(selectUser);
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated && user) {
      dispatch(actions.restoreUserData(JSON.parse(user)));
    }
  });
  return <></>;
}

function App() {
  return (
    <>
      <PersistUser />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
