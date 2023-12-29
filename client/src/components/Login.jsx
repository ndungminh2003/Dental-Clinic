import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const initialValues = {
  phone: "",
  password: "",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("Enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Please enter a password")
    .min(11, "Password must be at least 11 characters"),
});

export default function Login({ bgcolor, ringcolor, role }) {
  const [isSubmited, setIsSubmited] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, role: role };
      dispatch(login(values));
      setIsSubmited(true);
      formik.resetForm();
    },
  });

  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSubmited && !loading && success) {
      toast.success("Login Successfull!");
      setIsSubmited(false);
      let path = role;
      if (role == "guest") path = "";
      navigate(`/${path}`);
    } else if (isSubmited && !loading && error) {
      toast.error(message);
      setIsSubmited(false);
    }
  }, [isSubmited, success, error, loading]);
  return (
    <div className="w-full flex items-center	min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className=" bg-white	p-10 rounded-md ">
          <h2 className="text-center text-5xl font-extrabold pb-10">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="font-mono ">Phone</label>
              <hr />
              <PhoneInput
                  inputClass="!w-full !h-11"
                  placeholder="Enter phone number"
                  country="vn"
                  regions={"asia"}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-xs text-red-600">{formik.errors.phone}</div>
              ):(
                <div className ="h-4">
                </div>
              )
              }
            </div>
            <div className="mb-4">
              <label className="font-mono rounded-md	">Password</label>
              <hr />
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={` ${ringcolor} w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-25 border border-gray-300	`}
              ></input>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-xs text-red-600">{formik.errors.password}</div>
              ):(
                <div className ="h-4">
                </div>
              )}
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <input type="checkbox" className="mr-2 align-middle	"></input>
                <label className="font-mono text-base">Remember me</label>
              </div>
              <div>
                <Link to="#" className="font-mono text-sm ">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <button
                className={`${bgcolor} py-2 rounded-md w-full text-white`}
                type="submit"
              >
                Login
              </button>
            </div>
            <div>
              <h2 className="font-mono">
                Don't have account?{" "}
                <Link to="/sign-up" className="text-red-700 font-medium">
                  Sign up
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
