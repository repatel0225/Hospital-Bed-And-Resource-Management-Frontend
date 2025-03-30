import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import Avatar from "../../../components/core/Avatar";
import { CLEAR_LOGIN_USER } from "../../../utility/actionTypes";
import { userDetails } from "../../redux/actions/employeeLogin.spec";
// import { CLEAR_LOGIN_USER } from "../../../utility/actionTypes";

export const leaveBalance = {
  available: 10,
  availed: 0,
};

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("When Avatar", () => {
  let navigate: jest.Mock;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("should logout on click", () => {
    render(<Avatar userDetails={userDetails} />);

    expect(screen.getByText("T")).toBeInTheDocument();

    // Simulate click to open dropdown
    fireEvent.click(screen.getByText("T"));

    // Check if logout button is visible
    expect(screen.getByTestId("logout-btn")).toBeInTheDocument();

    const button = screen.getByTestId("logout-btn");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({ type: CLEAR_LOGIN_USER });
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
