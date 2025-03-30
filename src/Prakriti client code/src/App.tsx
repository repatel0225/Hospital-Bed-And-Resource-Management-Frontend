import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { lazy } from "react";
import configStore from "./redux/store/configStore";
import Header from "./components/core/Header";
import ProtectedRoute from "./route/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";

const Login = lazy(() => import("./pages/Login"));

const store = configStore();

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={store.persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route element={<ProtectedRoute />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
