import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLogin, clearLoginUser } from "../redux/actions/userLogin";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
 
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
 
  // To get the logged in user details from the store
  const loggedInDetails = useSelector(
    (store: any) => store.loggedInUser?.data[0]
  );
 
  // On page render, clearing all the localstorage data
  useEffect(() => {
    dispatch(clearLoginUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // To check the user logged in or not
  useEffect(() => {
    if (loggedInDetails) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInDetails]);
 
  // Validation for the login page
  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
  });
 
  // Initial value for the login form
  const initialValues: any = {
    email: "",
    password: "",
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="flex flex-col w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values: any) => {
            dispatch(checkUserLogin(values));
          }}
        >
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please Enter Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please Enter Password"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <div className="flex justify-end">
              <a
                href="/register"
                className="text-base font-bold text-blue-500 underline cursor-pointer"
              >
                Register User
              </a>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};
 
export default Login