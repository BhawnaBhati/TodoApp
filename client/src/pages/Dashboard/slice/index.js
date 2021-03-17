import { createSlice } from "@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import { taskSaga } from "./saga";

export const initialState = {
  loading: false,
  error: null,
  isLoaded: false,
  latestTasks: [],
  tasksCompleted: 0,
  totalTasks: 0,
  currentTask: {},
  filteredTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    dashboardRequest(state, action) {
      state.error = null;
    },
    dashboardSuccess(state, action) {
      state.isLoaded = true;
      state.latestTasks = action.payload.latestTasks;
      state.tasksCompleted = action.payload.tasksCompleted;
      state.totalTasks = action.payload.totalTasks;
    },
    dashboardFailed(state, action) {
      state.error = action.payload.error;
      state.isLoaded = false;
      state.latestTasks = [];
      state.tasksCompleted = 0;
      state.totalTasks = 0;
    },
    clearDashboard(state, action) {
      state.isLoaded = false;
      state.latestTasks = [];
      state.tasksCompleted = 0;
      state.totalTasks = 0;
      state.currentTask = {};
    },
    addTaskRequest(state, action) {
      state.error = null;
    },
    addTaskSuccess(state, action) {
      state.isLoaded = false;
      state.currentTask = action.payload;
    },
    addTaskFailed(state, action) {
      state.error = action.payload.error;
    },
    searchTaskRequest(state, action) {
      state.error = null;
    },
    searchTaskSuccess(state, action) {
      state.filteredTasks = action.payload;
    },
    searchTaskFailed(state, action) {
      state.error = action.payload.error;
      state.currentTask = [];
    },
    editTaskRequest(state, action) {
      state.error = null;
    },
    editTaskFailed(state, action) {
      state.error = action.payload.error;
      state.currentTask = [];
    },
    deleteTaskRequest(state, action) {
      state.error = null;
    },
    editDeleteTaskSuccess(state, action) {
      state.isLoaded = false;
    },
    deleteTaskFailed(state, action) {
      state.error = action.payload.error;
      state.currentTask = [];
    },
  },
});

// Actions - to be used in Saga
export const { actions: taskActions, reducer } = taskSlice;

// cutom hook version for React components - avoid using 2 hooks there
export const useTaskSlice = () => {
  useInjectReducer({ key: taskSlice.name, reducer: taskSlice.reducer });
  useInjectSaga({ key: taskSlice.name, saga: taskSaga });
  return { actions: taskSlice.actions };
};
