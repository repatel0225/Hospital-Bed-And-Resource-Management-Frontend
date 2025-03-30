import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Login from "../pages/Login";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.loggedInUser?.data);
  useEffect(() => {}, [userDetails, navigate]);
  return userDetails && userDetails.length > 0 ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
