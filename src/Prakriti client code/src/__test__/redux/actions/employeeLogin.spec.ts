import {
  checkUserLogin,
  clearLoginUser,
  loginFailed,
  loginSuccess,
} from "../../../redux/actions/userLogin";
import {
  CLEAR_LOGIN_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "../../../utility/actionTypes";

export const userDetails = {
  name: "Test User",
  email: "test@mail.com",
  password: "12345678",
};

describe("On userAction", () => {
  it("should cal checkUserLogin()", () => {
    const formValues = {
      email: "gtestuser@gmail.com",
      password: "test@123",
    };
    const data = {
      type: USER_LOGIN,
      payload: formValues,
    };
    expect(checkUserLogin(formValues)).toStrictEqual(data);
  });

  it("should call loginSuccess()", () => {
    const data = {
      type: USER_LOGIN_SUCCESS,
      payload: [userDetails],
    };
    expect(loginSuccess([userDetails])).toStrictEqual(data);
  });

  it("should call loginFailed()", () => {
    const err = "something went wrong";
    const data = { payload: "something went wrong", type: USER_LOGIN_FAILED };
    expect(loginFailed(err)).toStrictEqual(data);
  });

  it("should call clearLoginUser()", () => {
    const data = {
      type: CLEAR_LOGIN_USER,
    };
    expect(clearLoginUser()).toStrictEqual(data);
  });
});
