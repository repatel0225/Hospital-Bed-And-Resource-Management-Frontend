import { render } from "@testing-library/react";
import ProtectedRoute from "../../route/ProtectedRoute";
import { useNavigate } from "react-router";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { userDetails } from "../redux/actions/employeeLogin.spec";

const mockStoreData = {
  loggedInUser: {
    data: [userDetails],
  },
};

const mockStore = configureStore();
const store = mockStore(mockStoreData);

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("When ProtectedRoute runs", () => {
  let navigate: jest.Mock;
  beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <ProtectedRoute />
      </Provider>
    );
  });
});
