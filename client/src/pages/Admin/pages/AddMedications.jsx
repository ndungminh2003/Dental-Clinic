import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createMedicine } from "../../../features/medicine/medicineSlice";
import * as Yup from "yup";

export default function AddMedication() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      medicineId: "",
      name: "",
      quantity: "",
      unit: "",
      description: "",
      indication: "",
      expirationDate: "",
      price: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Must be greater than 1")
        .max(50, "Must be less than 50")
        .required("Required"),
    }),
    onSubmit: (values) => {
      let data = {
        medicineId: values.id,
        name: values.name,
        quantity: values.quantity,
        unit: values.unit,
        description: values.description,
        indication: values.indication,
        expirationDate: values.expirationDate,
        price: values.price,
      };
      console.log(data.unit);
      alert(JSON.stringify(values, null, 2));
      dispatch(createMedicine(data));
    },

  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-14 py-10">
        <h1 className=" text-2xl font-semibold pb-5">ADD MEDICATION</h1>
        <div className="flex  grow mt-3">
          <div className="flex w-1/2 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Code</label>
            </div>
            <input
              id="medicineId"
              name="medicineId"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.medicineId}
              className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Name</label>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-1/2 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Quantity
              </label>
            </div>
            <input
              id="quantity"
              name="quantity"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Unit</label>
            </div>
            <input
              id="unit"
              name="unit"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.unit}
              className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-1/2 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Expiration date</label>
            </div>
            <input
              type="date"
              className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Price</label>
            </div>
            <input
              type="text"
              className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
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
            className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
          ></textarea>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
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
            className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
          ></textarea>
        </div>
        <div className="text-right mt-5">
          <button className="bg-sky-500 rounded-md px-3 py-2" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
