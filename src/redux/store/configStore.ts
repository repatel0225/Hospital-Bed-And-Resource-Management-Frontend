import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../saga/rootSaga";

const persistConfig = {
  key: "root",
  storage,
};

// To persist the data
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Created a saga middle ware
const sagaMiddleware = createSagaMiddleware();

// Created store to handle and store in local storage
const configStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configStore;
