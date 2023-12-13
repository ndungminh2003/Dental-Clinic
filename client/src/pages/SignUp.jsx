import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login, signUp } from "../features/auth/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const initialValues = {
  phone: "",
  password: "",
  name: "",
  gender: "",
  birthday: "",
  address: "",
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signUpValidation = Yup.object({
  phone: Yup.string()
    .required("Enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string()
    .required("Please enter a password")
    .min(11, "Password must be at least 11 characters"),
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  birthday: Yup.string().required("Birthday is required"),
  address: Yup.string().required("Address is required"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      dispatch(signUp(values));
      // formik.resetForm();
    },
  });
  return (
    <div className="w-full flex items-center min-h-screen	bg-slate-300">
      <div className="w-full max-w-md mx-auto ">
        <div className=" bg-neutral-100 px-12 py-7 rounded-md  ">
          <h2 className="text-center text-4xl font-extrabold pb-5">Sign up</h2>
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="font-mono text-sm">Full Name</label>
                <hr />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
                ></input>
                {formik.touched.name && formik.errors.name && (
                  <div>{formik.errors.name}</div>
                )}
              </div>
              <div className="mb-3 flex grow justify-between w-full">
                <div className="w-[45%]">
                  <label className="font-mono text-sm">Date of birth</label>
                  <hr />
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`focus:ring-blue-hosta px-2 py-1 input focus:ring-opacity-25  `}
                  ></input>
                  {formik.touched.birthday && formik.errors.birthday && (
                    <div>{formik.errors.birthday}</div>
                  )}
                </div>
                <div className="w-[45%]">
                  <label className="font-mono text-sm">Gender</label>
                  <hr />
                  <select
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full  px-2 py-1 border border-gray-300 rounded-md"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div>{formik.errors.gender}</div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label className="font-mono text-sm">Phone</label>
                <hr />
                <input
                  // inputClass="!w-full !h-[31px]"
                  className={`focus:ring-blue-hosta w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 border focus:ring-opacity-25  `}
                  placeholder="Enter phone number"
                  // country="vn"
                  // regions={"asia"}
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div>{formik.errors.phone}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="font-mono text-sm">Address</label>
                <hr />
                <input
                  type="text"
                  className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.touched.address && formik.errors.address && (
                  <div>{formik.errors.address}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="font-mono rounded-md text-sm">Password</label>
                <hr />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
                ></input>
                {formik.touched.password && formik.errors.password && (
                  <div>{formik.errors.password}</div>
                )}
              </div>
              <div className="flex justify-between mb-6">
                <div>
                  <input type="checkbox" className="mr-2 align-middle	"></input>
                  <label className="font-mono text-sm">Remember me</label>
                </div>
                <div>
                  <Link to="#" className="font-mono text-sm ">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="bg-blue-hosta py-1 rounded-md w-full text-white"
                >
                  Submit
                </button>
              </div>
              <div>
                <h2 className="font-mono text-sm">
                  Already have account?{" "}
                  <Link
                    to="/login"
                    className="text-red-700 font-medium text-sm"
                  >
                    Log in
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
