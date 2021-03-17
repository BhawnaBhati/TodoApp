import { createSlice } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { userSaga } from "./saga";

export const initialState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginRequest(state, action) {
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailed(state, action) {
      state.isAuthenticated = false;
      state.userData = {};
      state.error = action.payload;
    },
    // As there is no session on server side in this app
    // not setting up actions logoutRequest and logoutFailed
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.userData = {};
      localStorage.removeItem("user");
    },
    // Restore Auth infor from localStorage if page is refreshed
    restoreUserData: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
  },
});

// Actions - to be used in Saga
export const { actions: userActions, reducer } = userSlice;

// cutom hook version for React components - avoid using 2 hooks there
export const useUserSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectSaga({ key: userSlice.name, saga: userSaga });
  return { actions: userSlice.actions };
};
