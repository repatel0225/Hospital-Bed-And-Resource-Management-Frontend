import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
  USER_LOGIN,
} from "../../utility/actionTypes";
import { loginSuccess } from "../actions/userLogin";
import { toast } from "react-toastify";
import { IAction } from "../../models/action.model";
import { IUserResponse } from "../../models/users.model";

// API call to check the entered user details are correct or not
export async function checkLoginUser(userData: any) {
  const res = await fetch(`http://localhost:5000/api/user`, {
    method: "POST",
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
}

// Worker saga to check the logged in user details
export function* loginUser(action: IAction) {
  const values = action?.payload;
  try {
    const result: IUserResponse = yield call(checkLoginUser, values);
    if (
      result.data &&
      result.data.userData &&
      result.data.userData.length > 0
    ) {
      localStorage.setItem("Token", result.data.token);
      toast.success(LOGIN_SUCCESS);
      yield put(loginSuccess(result.data.userData));
    } else {
      toast.error(INVALID_CREDENTIALS);
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}

// Watcher saga to check the login user details
export function* loginWatcherSaga() {
  yield takeLatest(USER_LOGIN, loginUser);
}
