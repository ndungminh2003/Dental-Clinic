import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { updateCustomerProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  birthday: Yup.string().required("Birthday is required"),
  address: Yup.string().required("Address is required"),
});

const formatDate = (date) => {
  if (typeof date != "string") return "";
  if (date.includes("T")) {
    const dateParts = date.split("-");
    const jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );
    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const day = jsDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else return date;
};

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);
  const { user, loading, error, success, message } = useSelector(
    (state) => state.auth
  );
  const initialValues = {
    name: user.name,
    birthday: formatDate(user.birthday),
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      values.id = user.id;
      dispatch(updateCustomerProfile(values));
      setIsSubmited(true);
    },
  });

  useEffect(() => {
    if (isSubmited && !loading && success) {
      toast.success("Change profile Successfull!");
      setIsSubmited(false);
    } else if (isSubmited && !loading && error) {
      toast.error(message);
      setIsSubmited(false);
    }
  }, [isSubmited, success, error, loading]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <div className="w-full flex items-center pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-mercury p-10 rounded-3xl">
              <h2 className="text-center text-6xl font-extrabold pb-10">
                MY PROFILE
              </h2>
              <br></br>

              <div className="rounded-md flex flex-row ">
                <div className="rounded-md flex flex-col space-y-9 mr-16 gap-3">
                  <div className="font-bold ml-16 text-xl pt-3">NAME:</div>
                  <div className="font-bold ml-16 text-xl pt-10">
                    DATE OF BIRTH:
                  </div>
                  <div className="font-bold ml-16 text-xl pt-11">GENDER:</div>
                  <div className="font-bold ml-16 text-xl pt-12">
                    PHONE NUMBER:
                  </div>
                  <div className="font-bold ml-16 text-xl pt-10">ADDRESS:</div>
                </div>
                <div className="rounded-md flex flex-col space-y-4 gap-4">
                  <input
                    type="text"
                    className=" w-96 h-10 rounded-md pl-2"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-xs text-red-600">
                      {formik.errors.name}
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={` w-96 h-10 rounded-md pl-1`}
                  ></input>
                  {formik.touched.birthday && formik.errors.birthday ? (
                    <div className="text-xs text-red-600">
                      {formik.errors.birthday}
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                  <select
                    className=" w-96 h-10 rounded-md pl-1"
                    id="gender"
                    name="gender"
                    defaultValue={"Male"}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-xs text-red-600">
                      {formik.errors.gender}
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                  <PhoneInput
                    country="vn"
                    inputProps={{
                      id: "phoneNumber",
                      name: "phoneNumber",
                      className: "w-96 h-10 rounded-md pl-11",
                      value: formik.values.phoneNumber,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                    }}
                    regions={"asia"}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-xs text-red-600">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                  <input
                    type="text"
                    className=" w-96 h-10 rounded-md pl-2"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-xs text-red-600">
                      {formik.errors.address}
                    </div>
                  ) : (
                    <div className="h-4"></div>
                  )}
                </div>
              </div>

              <br></br>
              <div className="flex justify-center">
                <button
                  className="w-40 py-2 rounded-md text-white bg-dirty-blue"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Popup component */}
      {/* {isSavedPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-green-500 text-lg font-semibold">
              Your information has been saved
            </p>
            <div className="flex justify-center">
              <button
                className="mt-4 bg-dirty-blue text-white py-2 px-4 rounded-md"
                onClick={() => setSavedPopupVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </div>
  );
}
