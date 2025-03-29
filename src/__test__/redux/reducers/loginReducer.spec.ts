import {
  clearLoginUser,
  loginFailed,
  loginSuccess,
} from "../../../redux/actions/userLogin";
import loginReducer from "../../../redux/reducers/loginReducer";
import { userDetails } from "../actions/employeeLogin.spec";

const initialState = {
  data: [],
};

describe("when Specialization reducer runs", () => {
  it("should call USER_LOGIN_SUCCESS type", () => {
    const result = loginReducer(initialState, loginSuccess([userDetails]));
    const expecedResult = {
      data: [userDetails],
    };
    expect(result).toStrictEqual(expecedResult);
  });

  it("should call USER_LOGIN_FAILED type", () => {
    const err = "something went wrong";
    const result = loginReducer(initialState, loginFailed(err));
    const expectedAction = {
      data: err,
    };
    expect(result).toStrictEqual(expectedAction);
  });

  it("should call CLEAR_LOGIN_USER", () => {
    const result = loginReducer(initialState, clearLoginUser());
    expect(result).toStrictEqual(initialState);
  });

  it("should call default", () => {
    const result = loginReducer(initialState, {
      type: "DEFAULT_TYPE",
    });
    expect(result).toStrictEqual(initialState);
  });
});
