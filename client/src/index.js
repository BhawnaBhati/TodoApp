import React from "react";
import ReactDOM from "react-dom";
import App from "app";

import { configureAppStore } from "./app/store/configureStore";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./app/theme";

const store = configureAppStore();
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
