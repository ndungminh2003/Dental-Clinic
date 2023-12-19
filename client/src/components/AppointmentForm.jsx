import React, { useEffect, useState } from "react";
import YourFormComponent from "./MultipleForm";
import phone from "../images/phone.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { makeAppointment } from "../features/appointment/appointmentSlice";
import * as Yup from "yup";

const initialValues = {
  name: "",
  birthday: "",
  address: "",
  phone: "",
  gender: "",
  date: "",
  startTime: "",
  dentistId: null,
};
const VALID_PHONE =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  birthday: Yup.string().required("Birthday is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .required("Enter phone number")
    .matches(VALID_PHONE, "Phone number is not valid"),
  gender: Yup.string().required("Gender is required"),
  date: Yup.date().required("Date is required"),
  startTime: Yup.string().required("Date is required"),
  dentistId: Yup.number().required("Choose your dentist"),
});

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);

  const { loading, error, success, message } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    if (isSubmited && !loading && success) {
      // toast.success("Sign up Successfull!");
      setIsSubmited(false);
      navigate("/book-successful");
    } else if (isSubmited && !loading && error) {
      // toast.error(message);
      setIsSubmited(false);
      navigate("/book-failed");
    }
  }, [isSubmited, success, error, loading]);
  return (
    <>
      <div className="flex flex-col">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            dispatch(makeAppointment(values));
            setIsSubmited(true);
            console.log(values);
            actions.setSubmitting(false);
            // formik.resetForm();
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="justify-center items-center border-2 border-solid border-blue-hosta rounded-3xl bg-blue-hosta "
            >
              <h1 className="text-5xl font-bold pt-10 flex flex-col items-center">
                BOOK APPOINTMENT
              </h1>
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="flex flex-row gap-16 items-center justify-center w-[1000px]  pt-10">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">NAME</h3>
                    <input
                      type="text"
                      className="rounded-xl w-[390px] h-[48px] text-2xl"
                      placeholder="  Enter your name"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={50}
                    ></input>
                    {formik.touched.name && formik.errors.name && (
                      <div>{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">DATE OF BIRTH</h3>
                    <input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={formik.values.birthday}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                    ></input>
                    {formik.touched.birthday && formik.errors.birthday && (
                      <div>{formik.errors.birthday}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-2xl">ADDRESS</h3>
                  <input
                    type="text"
                    className="rounded-xl w-[845px] h-[48px] text-2xl"
                    placeholder="  Enter your address"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={120}
                  ></input>
                  {formik.touched.address && formik.errors.address && (
                    <div>{formik.errors.address}</div>
                  )}
                </div>
                <div className="flex flex-row gap-16 items-center justify-center w-[1000px] ">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">PHONE NUMBER</h3>
                    <input
                      type="text"
                      className="rounded-xl w-[390px] h-[48px] text-2xl"
                      placeholder="  Enter your phone number"
                      maxLength={11}
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.phone && formik.errors.phone && (
                      <div>{formik.errors.phone}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-2xl">GENDER</h3>
                    <select
                      id="gender"
                      name="gender"
                      defaultValue={"Nam"}
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                    >
                      <option value="Nam">Male</option>
                      <option value="Nữ">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                      <div>{formik.errors.gender}</div>
                    )}
                  </div>
                </div>
              </div>
              <YourFormComponent />
              <div className="flex flex-row gap-44 pl-28 pt-10 pb-10">
                <button
                  type="submit"
                  className="text-xl bg-dirty-blue rounded-xl flex items-center justify-center w-[250px] h-16 font-bold text-white hover:bg-ebony-clay"
                >
                  {/* <Link to="/book-successful">Book appointment</Link> */}
                  Book appointment
                </button>
                <div className="flex flex-row gap-8">
                  <div className="w-[60px] h-18 bg-white rounded-xl flex items-center justify-center">
                    <img src={phone} alt="phone" className=" w-10 h-10 " />
                  </div>
                  <div className="flex flex-col text-2xl font-bold">
                    <div>DENTAL 24H EMERGENCY</div>
                    <div>0989 123 456</div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
