import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import staffServices from "../../../features/staff/staffServices";
import { updateStaffProfile } from "../../../features/staff/staffSlice";
import ChangePassword from "../components/ChangePassword";
export default function Profile() {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let { error, loading, success } = useSelector((state) => state.staff);
  const [openChange, setOpenChange] = React.useState(false);
  const [staffData, setStaffData] = useState();
  const [initValue, setInitValue] = useState();
  const fetchData = async () => {
    try {
      const response = await staffServices.getOneStaff(user.id);
      setStaffData(response[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [error, loading, success]);

  useEffect(() => {
    console.log("staff", staffData);
  }, [staffData]);

  useEffect(() => {
    if (staffData) {
      let initValue = {
        name: staffData.name,
        gender: staffData.gender,
        phoneNumber: staffData.phoneNumber,
      };
      setInitValue(initValue);
    }
  }, [staffData]);

  const formik = useFormik({
    initialValues: staffData || {
      name: "",
      gender: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, "Must be less than 50"),
    }),
    onSubmit: (values) => {
      let updateData = {
        staffId: staffData.id,
        name: values.name === "" ? initValue.name : values.name,
        phoneNumber:
          values.phoneNumber === ""
            ? initValue.phoneNumber
            : values.phoneNumber,
        gender: values.gender === "" ? initValue.gender : values.gender,
      };
      dispatch(updateStaffProfile(updateData));
      formik.resetForm();
    },
  });
  const handleCloseChange = () => {
    setOpenChange(false);
  };

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
                    <div className="font-bold ml-16 text-xl">GENDER:</div>
                    <div className="font-bold ml-16 text-xl">PHONE NUMBER:</div>
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
                      placeholder={staffData?.name}
                    ></input>
                    <select name="" className=" w-96 h-10 rounded-md p-2" value={staffData?.gender} disabled>
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
                      placeholder={staffData?.phoneNumber}
                    ></input>
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
        password={staffData?.password}
      />
    </div>
  );
}
