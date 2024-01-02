import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import dentistServices from "../../../features/dentist/dentistServices";
import { updateDentistProfile } from "../../../features/dentist/dentistSlice";
import ChangePassword from "../components/ChangePassword";
export default function Profile() {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let { error, loading, success } = useSelector((state) => state.dentist);
  const [openChange, setOpenChange] = React.useState(false);
  const [dentistData, setDentistData] = useState();
  const [initValue, setInitValue] = useState();
  const fetchData = async () => {
    try {
      const response = await dentistServices.getOneDentist(user.id);
      setDentistData(response[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [error, loading, success]);

  useEffect(() => {
    console.log("dentist", dentistData);
  }, [dentistData]);

  useEffect(() => {
    if (dentistData) {
      let initValue = {
        name: dentistData.name,
        birthday: dentistData.birthday,
        gender: dentistData.gender,
        phoneNumber: dentistData.phoneNumber,
        address: dentistData.address,
        introduction: dentistData.introduction,
      };
      setInitValue(initValue);
    }
  }, [dentistData]);

  const formik = useFormik({
    initialValues: dentistData || {
      name: "",
      birthday: "",
      gender: "",
      phoneNumber: "",
      introduction: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Must be less than 50"),
    }),
    onSubmit: (values) => {
      let updateData = {
        dentistId: dentistData.id,
        name: values.name === "" ? initValue.name : values.name,
        phoneNumber:
          values.phoneNumber === ""
            ? initValue.phoneNumber
            : values.phoneNumber,
        gender: values.gender === "" ? initValue.gender : values.gender,
        birthday: values.birthday === "" ? initValue.birthday : values.birthday,
        introduction:
          values.introduction === ""
            ? initValue.introduction
            : values.introduction,
      };
      dispatch(updateDentistProfile(updateData));
      formik.resetForm();
    },
  });
  const handleCloseChange = () => {
    setOpenChange(false);
  };
  function formatDateString(originalDateString) {
    const [year, month, day] = originalDateString.split("T")[0].split("-");
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-16 mt-10 ">
          <div className="w-full flex items-center	">
            <div className="w-full max-w-3xl mx-auto bg-mercury rounded-2xl">
              <h2 className="text-center text-5xl font-extrabold pb-10 mt-10">
                MY PROFILE
              </h2>
              <div className="px-3 pb-3">
                <br></br>

                <div className="rounded-md flex flex-row ">
                  <div className="rounded-md flex flex-col space-y-7 mr-16 gap-3">
                    <div className="font-bold ml-16 text-xl">NAME:</div>
                    <div className="font-bold ml-16 text-xl">
                      DATE OF BIRTH:
                    </div>
                    <div className="font-bold ml-16 text-xl">GENDER:</div>
                    <div className="font-bold ml-16 text-xl">PHONE NUMBER:</div>
                    <div className="font-bold ml-16 text-xl">INTRODUCTION:</div>
                  </div>
                  <div className="rounded-md flex flex-col space-y-3 gap-3">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className=" w-96 h-10 rounded-md p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder={dentistData?.name}
                    ></input>
                    <input
                      type="date"
                      className=" w-96 h-10 rounded-md p-2"
                      id="birthday"
                      name="birthday"
                      onBlur={formik.handleBlur}
                      value={ dentistData && formatDateString(dentistData.birthday)}
                      disabled
                    ></input>
                    <select name="" className=" w-96 h-10 rounded-md p-2" value={dentistData?.gender} disabled>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <input
                      type="text"
                      className=" w-96 h-10 rounded-md p-2"
                      maxLength={10}
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                      placeholder={dentistData?.phoneNumber}
                    ></input>
                    <textarea
                      className=" w-96 h-20 rounded-md p-2"
                      id="introduction"
                      name="introduction"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.introduction}
                      placeholder={dentistData?.introduction}
                    ></textarea>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setOpenChange(true);
                  }}
                  className="text-right py-5 pr-16 w-full text-red-400"
                >
                  Change password?
                </div>
                <br></br>
                <div className="flex justify-center">
                  <button
                    className=" w-40 py-2 rounded-md text-white bg-dirty-blue"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ChangePassword
        onClose={handleCloseChange}
        open={openChange}
        password={dentistData?.password}
      />
    </div>
  );
}
