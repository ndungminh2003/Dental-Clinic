import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createService,
  resetState,
} from "../../../features/service/serviceSlice";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  let { error, loading, success } = useSelector((state) => state.service);

  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Must be greater than 1")
        .max(50, "Must be less than 50")
        .required("Required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Required"),
    }),

    onSubmit: (values) => {
      let data = {
        name: values.name,
        description: values.description,
        price: values.price,
      };
      console.log("Before dispatching createService");
      dispatch(createService(data));
      console.log("After dispatching createService");
      setIsSubmited(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300); // ?
    },
  });

  useEffect(() => {
    if (isSubmited && !loading && success) {
      toast.success("Thêm dịch vụ thành công");
    } else if (isSubmited && !loading && error) {
      toast.error("Thêm dịch vụ thất bại");
      setIsSubmited(false);
    }
  }, [isSubmited, success, error, loading]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-14 py-10">
          <h1 className=" text-2xl font-semibold pb-5">ADD SERVICE</h1>
          <div className="flex  grow mt-3">
            <div className="w-[130px] flex items-center">
              <label className="font-mono rounded-md text-center mt-[-18px]">
                Name
              </label>
            </div>
            <div className=" flex flex-col w-full justify-between h-16">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={` px-3 py-2 rounded-md border border-gray-300 `}
              ></input>
              {formik.touched.name && formik.errors.name ? (
                <div className=" text-red-400 text-xs ml-4">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex  grow mt-3">
            <div className="w-[130px] flex items-center">
              <label className="font-mono rounded-md text-center mt-[-18px]">
                Price
              </label>
            </div>
            <div className=" flex flex-col w-full justify-between h-16">
              <input
                id="price"
                name="price"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className={` px-3 py-2 rounded-md border border-gray-300 `}
              ></input>
              {formik.touched.price && formik.errors.price ? (
                <div className=" text-red-400 text-xs ml-4">
                  {formik.errors.price}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center grow mt-10">
            <div className="w-[130px]">
              <label className="font-mono rounded-md text-center	">
                Description
              </label>
            </div>
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="text-right mt-5">
            <button className="bg-sky-500 rounded-md px-3 py-2" type="submit" >
              Save
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
