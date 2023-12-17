import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { createDentistAccount } from "../../../features/dentist/dentistSlice";
import { createStaffAccount } from "../../../features/staff/staffSlice";

export default function AddUser() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      dateOfBirth: "",
      password: "",
      introduction: "",
      gender: "Nam",
    },

    validationSchema: Yup.object({
      name: Yup.string().max(50, "Must be less than 50").required("Required"),
      phoneNumber: Yup.number().required("Required"),
      password: Yup.string().required("Required"),
      dateOfBirth: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      let data = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        password: values.password,
        introduction: values.introduction,
        gender: values.gender,
      };
      alert(JSON.stringify(values, null, 2));
      if (selectedOption === "doctor") {
        dispatch(createDentistAccount(data));
      } else {
        dispatch(createStaffAccount(data));
      }

      formik.resetForm();
    },
  });

  const [value, setValue] = useState();
  const [selectedOption, setSelectedOption] = useState("doctor");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-24 py-14 w-full">
          <h1 className=" text-2xl font-semibold pb-5">ADD USER</h1>
          <div className="flex lex-grow mt-5 w-full">
            <div className="w-1/6">
              <h1 className="font-mono ">Type</h1>
            </div>
            <div className="w-5/6 flex">
              <div>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="role"
                    value="doctor"
                    onChange={handleRadioChange}
                    defaultChecked={true}
                  />
                  Doctor
                </label>
              </div>
              <div className="ml-4">
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="role"
                    value="staff"
                    onChange={handleRadioChange}
                  />
                  Staff
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-grow mt-10 ">
            <div className="w-1/6 flex mt-1">
              <label className="font-mono rounded-md text-center">Phone</label>
            </div>
            <div className="flex flex-grow w-5/6 items-center">
              <div className="w-3/4 flex flex-col h-16 justify-between">
                <PhoneInput
                  inputClass="!w-full"
                  placeholder="Enter phone number"
                  country="vn"
                  regions={"asia"}
                  value={formik.values.phoneNumber}
                  onChange={(value) =>
                    formik.setFieldValue("phoneNumber", value)
                  }
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex  flex-grow mt-3">
            <div className="w-1/6 mt-2">
              <label className="font-mono rounded-md text-center ">
                Birthday
              </label>
            </div>
            <div className=" w-5/6 flex flex-col h-16 justify-between">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
                className={` w-3/4 px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className=" text-red-400 text-xs ml-4">
                  {formik.errors.dateOfBirth}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-grow mt-3">
            <div className="w-1/6 mt-2">
              <label className="font-mono rounded-md text-center	">
                Fullname
              </label>
            </div>
            <div className=" w-5/6 flex flex-col h-16 justify-between">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={` w-3/4 px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
              {formik.touched.name && formik.errors.name ? (
                <div className=" text-red-400 text-xs ml-4">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-grow mt-3">
            <div className="w-1/6 mt-2">
              <label className="font-mono rounded-md text-center	">
                Password
              </label>
            </div>
            <div className=" w-5/6 flex flex-col h-16 justify-between">
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
              {formik.touched.password && formik.errors.password ? (
                <div className=" text-red-400 text-xs ml-4">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          {selectedOption === "doctor" && (
            <div className="flex items-center flex-grow mt-3">
              <div className="w-1/6">
                <label className="font-mono rounded-md text-center	">
                  Introduction
                </label>
              </div>
              <div className=" w-5/6">
                <textarea
                  id="introduction"
                  name="introduction"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.introduction}
                  className={` w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
                ></textarea>
              </div>
            </div>
          )}
          <div className="flex lex-grow mt-5 w-full">
            <div className="w-1/6">
              <h1 className="font-mono ">Gender</h1>
            </div>
            <div className="w-5/6 flex">
              <div>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formik.values.gender === "Nam"}
                    onChange={() => formik.setFieldValue("gender", "Nam")}
                  />
                  Nam
                </label>
              </div>
              <div className="ml-4">
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formik.values.gender === "Nữ"}
                    onChange={() => formik.setFieldValue("gender", "Nữ")}
                  />
                  Nữ
                </label>
              </div>
            </div>
          </div>

          <div className="text-right text-white mt-5">
            <button
              className="bg-ebony-clay rounded-md px-3 py-2"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
