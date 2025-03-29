
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {
  SOMETHING_WENT_WRONG,
  USER_ALREADY_EXISTS,
  USER_REGISTERED_SUCCESSFULLY,
} from "../utility/actionTypes";
import { IUser } from "../models/users.model";
import { User } from "../utility/constants";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize the form values
  const initialValues: IUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation for form values
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // To create new employee
  const registerNewUser = async (values: IUser) => {
    try {
      setLoading(true);
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await fetch(`http://localhost:8080/api/v1/user/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
         "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      if (result.message === "Email already exists") {
        toast.error(USER_ALREADY_EXISTS);
      } else {
        toast.success(USER_REGISTERED_SUCCESSFULLY);
        setTimeout(() => {
          navigate("/");
        }, 800);
      }
    } catch (error) {
      toast.error(SOMETHING_WENT_WRONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded shadow-md">
        <div className="hidden w-1/2 md:block">
          <img
            src="/register.jpeg" // Replace with your image URL
            alt="Register"
            className="object-cover w-full h-full rounded-l"
          />
        </div>
        <div className="w-full p-4 space-y-4 md:w-1/2">
          <h1 className="text-xl font-bold text-center">{User.REGISTER}</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IUser) => {
              registerNewUser(values);
            }}
          >
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please Enter Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
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
                  className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please Enter Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please Enter Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please Enter Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="mt-1 text-xs text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <div className="flex justify-end">
                <a
                  href="/"
                  className="text-sm leading-7 underline text-blue-500 cursor-pointer font-bold"
                >
                  Back to Login
                </a>
              </div>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
