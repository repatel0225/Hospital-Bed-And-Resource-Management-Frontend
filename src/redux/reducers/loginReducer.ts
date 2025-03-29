import {
  CLEAR_LOGIN_USER,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "../../utility/actionTypes";

const initialState = {
  data: [],
};

// Based on the action type handled the login details
const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, data: action.payload };
    case USER_LOGIN_FAILED:
      return { ...state, data: action.payload };
    case CLEAR_LOGIN_USER:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
