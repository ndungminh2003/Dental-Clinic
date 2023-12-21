import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createMedicine,
  resetState,
} from "../../../features/medicine/medicineSlice";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddMedication() {
  let { error, loading, success } = useSelector((state) => state.medicine);

  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      unit: "",
      indication: "",
      expirationDate: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Must be greater than 1")
        .max(50, "Must be less than 50")
        .required("Required"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("Required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Required"),
      expirationDate: Yup.string().required("Required"),
      unit: Yup.string()
        .oneOf(
          [
            "Viên",
            "Vỉ",
            "Hộp",
            "Ống",
            "Chai",
            "Gói",
            "viên",
            "vỉ",
            "hộp",
            "ống",
            "chai",
            "gói",
          ],
          "Invalid unit, The unit must be Viên, Vỉ, Hộp, Ống, Chai, Gói"
        )
        .required("Required"),
    }),

    onSubmit: (values) => {
      let data = {
        name: values.name,
        quantity: values.quantity,
        unit: values.unit,
        description: values.description,
        indication: values.indication,
        expirationDate: values.expirationDate,
        price: values.price,
      };
      dispatch(createMedicine(data));
      setIsSubmited(true);
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300); // ?
    },
  });

  useEffect(() => {
    if (isSubmited && !loading && success) {
      toast.success("Thêm thuốc thành công");
    } else if (isSubmited && !loading && error) {
      toast.error("Thêm thuốc thất bại");
      setIsSubmited(false);
    }
  }, [isSubmited, success, error, loading]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-14 py-10">
          <h1 className=" text-2xl font-semibold pb-5">ADD MEDICATION</h1>
          <div className="flex  grow mt-3">
            <div className="flex w-1/2 items-center">
              <div className="w-1/4 flex items-center">
                <label className="font-mono rounded-md text-center mt-[-18px]">
                  Name
                </label>
              </div>
              <div className=" flex flex-col w-3/4 justify-between h-16">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`ml-2 px-3 py-2 rounded-md border border-gray-300 `}
                ></input>
                {formik.touched.name && formik.errors.name ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex w-1/2 items-center ml-7">
              <div className="w-1/4 flex items-center">
                <label className="font-mono rounded-md text-center mt-[-18px]">
                  Unit
                </label>
              </div>
              <div className=" flex flex-col w-3/4 justify-between h-16">
                <input
                  id="unit"
                  name="unit"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.unit}
                  className={`ml-2 px-3 py-2 rounded-md border border-gray-300 `}
                ></input>
                {formik.touched.unit && formik.errors.unit ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.unit}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex  grow mt-3">
            <div className="flex w-1/2 items-center">
              <div className="w-1/4 flex items-center">
                <label className="font-mono rounded-md text-center mt-[-18px]">
                  Quantity
                </label>
              </div>
              <div className=" flex flex-col w-3/4 justify-between h-16">
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className={`ml-2 px-3 py-2 rounded-md border border-gray-300 `}
                ></input>
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.quantity}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex w-1/2 items-center ml-7">
              <div className="w-1/4 flex items-center">
                <label className="font-mono rounded-md text-center mt-[-18px]">
                  Price
                </label>
              </div>
              <div className=" flex flex-col w-3/4 justify-between h-16">
                <input
                  id="price"
                  name="price"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className={`ml-2 px-3 py-2 rounded-md border border-gray-300 `}
                ></input>
                {formik.touched.price && formik.errors.price ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex  grow mt-3">
            <div className="flex w-1/2 items-center">
              <div className="w-1/4 flex items-center">
                <label className="font-mono rounded-md text-center mt-[-18px]">
                  Expiration date
                </label>
              </div>
              <div className=" flex flex-col w-3/4 justify-between h-16">
                <input
                  id="expirationDate"
                  name="expirationDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expirationDate}
                  className={`ml-2 px-3 py-2 rounded-md border border-gray-300 `}
                ></input>
                {formik.touched.expirationDate && formik.errors.expirationDate ? (
                  <div className=" text-red-400 text-xs ml-4">
                    {formik.errors.expirationDate}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-center grow mt-10">
            <div className="w-[182px]">
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
          <div className="flex items-center grow mt-10">
            <div className="w-[182px]">
              <label className="font-mono rounded-md text-center	">
                Indication
              </label>
            </div>
            <textarea
              id="indication"
              name="indication"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.indication}
              className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="text-right mt-5">
            <button className="bg-sky-500 rounded-md px-3 py-2" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}