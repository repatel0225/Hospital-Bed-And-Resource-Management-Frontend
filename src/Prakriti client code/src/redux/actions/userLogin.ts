import { IFormLoginValues, IUser } from "../../models/users.model";
import {
  CLEAR_LOGIN_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "../../utility/actionTypes";

// Action creator to check the employee login
export const checkUserLogin = (loginData: IFormLoginValues) => {
  return {
    type: USER_LOGIN,
    payload: loginData,
  };
};

// Action creator to login success
export const loginSuccess = (userData: IUser[]) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userData,
  };
};

// Action creator to login failure
export const loginFailed = (error: string) => {
  return {
    type: USER_LOGIN_FAILED,
    payload: error,
  };
};

// Action creator to clear login user data
export const clearLoginUser = () => {
  return {
    type: CLEAR_LOGIN_USER,
  };
};
