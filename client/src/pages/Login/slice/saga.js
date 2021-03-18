import { takeLatest, call, put } from "redux-saga/effects";
import { userActions as actions } from ".";
import axios from "axios";
import _ from "lodash";

import { getMessageFromAxiosError } from "app/utils/axios";
import env from "react-dotenv";

const loginUrl = `${env.API_SERVER_URL}/login`;

function* loginUser(action) {
  try {
    const response = yield call(axios.post, loginUrl, action.payload);

    console.log("response... ", response);
    const token = _.get(response, "data.token", "TOKEN_NOT_FOUND");
    yield put(
      actions.loginSuccess({
        username: action.payload.username,
        token,
      })
    );
  } catch (err) {
    console.log("err... ", err);
    yield put(actions.loginFailed(getMessageFromAxiosError(err)));
  }
}

export function* userSaga() {
  console.log(process.env);
  yield takeLatest(actions.loginRequest.type, loginUser);
}
