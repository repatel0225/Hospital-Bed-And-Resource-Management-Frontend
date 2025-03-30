import { all } from "redux-saga/effects";
import { loginWatcherSaga } from "./loginUserSaga";

// Handled all the saga's
function* rootSaga() {
  yield all([loginWatcherSaga()]);
}

export default rootSaga;
