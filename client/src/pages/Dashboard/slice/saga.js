import { takeLatest, call, put } from "redux-saga/effects";
import { taskActions as actions } from ".";
import { getMessageFromAxiosError } from "app/utils/axios";

import axios from "axios";
// import _ from "lodash";

const baseUrl = "http://localhost:4000";
const dashboardUrl = `${baseUrl}/dashboard`;
const taskUrl = `${baseUrl}/tasks`;

function* getDashBoard() {
  try {
    const response = yield call(axios.get, dashboardUrl);
    console.log("response... ", response);
    yield put(actions.dashboardSuccess(response.data));
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.dashboardFailed(getMessageFromAxiosError(err)));
  }
}

function* addTask(action) {
  try {
    const response = yield call(axios.post, taskUrl, action.payload);
    console.log("response... ", response);
    yield put(actions.addTaskSuccess(response.data));
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.addTaskFailed(getMessageFromAxiosError(err)));
  }
}

function* searchTask(action) {
  try {
    const response = yield call(axios.get, taskUrl, {
      params: action.payload,
    });
    console.log("response... ", response);
    yield put(actions.searchTaskSuccess(response.data));
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.searchTaskFailed(getMessageFromAxiosError(err)));
  }
}

function* editTask(action) {
  try {
    const response = yield call(
      axios.put,
      `${taskUrl}/${action.payload.id}`,
      action.payload
    );
    console.log("response... ", response);
    yield put(actions.editDeleteTaskSuccess());
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.searchTaskFailed(getMessageFromAxiosError(err)));
  }
}

function* deleteTask(action) {
  try {
    const response = yield call(
      axios.delete,
      `${taskUrl}/${action.payload.id}`
    );
    console.log("response... ", response);
    yield put(actions.editDeleteTaskSuccess());
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.deleteTaskFailed(getMessageFromAxiosError(err)));
  }
}

export function* taskSaga() {
  yield takeLatest(actions.dashboardRequest.type, getDashBoard);
  yield takeLatest(actions.addTaskRequest.type, addTask);
  yield takeLatest(actions.searchTaskRequest.type, searchTask);
  yield takeLatest(actions.editTaskRequest.type, editTask);
  yield takeLatest(actions.deleteTaskRequest.type, deleteTask);
}
