import { combineReducers, Reducer } from "redux";
import loginReducer from "./loginReducer";

// Maintained all reducers
const rootReducer: Reducer<any> = combineReducers({
  loggedInUser: loginReducer,
});
export default rootReducer;
