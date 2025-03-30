import { call, put, takeLatest } from "redux-saga/effects";
import {
  checkLoginUser,
  loginUser,
  loginWatcherSaga,
} from "../../../redux/saga/loginUserSaga";
import {
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
  USER_LOGIN,
} from "../../../utility/actionTypes";
import { loginSuccess } from "../../../redux/actions/userLogin";
import { toast } from "react-toastify";
import { userDetails } from "../actions/employeeLogin.spec";

export const resultData = {
  data: {
    token: "jwttoken",
    employeeData: [userDetails],
  },
};

const action = {
  type: USER_LOGIN,
  payload: {
    email: "atchaya@mail.com",
    password: "12345678",
  },
};

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("when loginUserSaga run", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      } as any)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should wait and watch loginWatcherSaga", () => {
    const doctorsObj = loginWatcherSaga();
    expect(doctorsObj.next().value).toEqual(takeLatest(USER_LOGIN, loginUser));
  });

  it("should wait for every loginUser action and call checkLoginUser", () => {
    const workerSaga = loginUser(action);
    expect(workerSaga.next().value).toEqual(
      call(checkLoginUser, action.payload)
    );
    expect(workerSaga.next(resultData).value).toEqual(
      put(loginSuccess([userDetails]))
    );
  });

  it("fetches successfully data from an API", async () => {
    const mockResponse = resultData;
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    } as any);

    const data = await checkLoginUser(action.payload);

    expect(data).toEqual(mockResponse);
  });

  it("should handle errors", () => {
    const generator = loginUser(action);
    const error = new Error("Something went wrong");

    generator.next();
    expect(generator.throw(error).value).toEqual(
      toast.error(SOMETHING_WENT_WRONG)
    );
  });

  it("should handle invalid credentials", () => {
    const generator = loginUser(action);
    const mockResponse = {
      data: {
        token: "jwttoken",
        employeeData: [],
      },
    };

    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      toast.error(INVALID_CREDENTIALS)
    );
  });
});
