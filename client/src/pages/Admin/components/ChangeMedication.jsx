import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { updateMedicine } from "../../../features/medicine/medicineSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

export default function ChangeMedication(props) {

  const dispatch = useDispatch();
  const { onClose, open, values } = props;
  const handleClose = () => {
    onClose();
  };

  console.log(values);

  const formik = useFormik({
    initialValues: values,

    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, "Must be greater than 1")
        .max(50, "Must be less than 50")
        .required("Required"),
    }),
    onSubmit: (values) => {
      let updateData = {
        medicineId: values.id,
        name: values.name,
        quantity: values.quantity,
        unit: values.unit,
        description: values.description,
        indication: values.indication,
        expirationDate: values.expirationDate
      };

      console.log(updateData.medicineId);
      dispatch(updateMedicine(updateData));
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-[600px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            CHANGE MEDICATIONS
          </h1>
          <div className="flex  grow mt-3">
            <div className="flex w-1/2 items-center">
              <div className="w-1/4">
                <label className="font-mono rounded-md text-center	">Code</label>
              </div>
              <input
                id="id"
                name="id"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.id}
                placeholder={values.id}
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
                placeholder={values.name}
                className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
              ></input>
            </div>
          </div>
          <div className="flex  grow mt-3">
            <div className="flex w-1/2 items-center">
              <div className="w-1/3">
                <label className="font-mono rounded-md text-center">
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
                placeholder={values.quantity}
                className={` w-2/3 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
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
                placeholder={values.unit}
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
              value={values.description}
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
              value={values.indication}
              className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Expiration date
              </label>
            </div>
            <input
              id="expirationDate"
              name="expirationDate"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expirationDate}
              placeholder={values.expirationDate}
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="text-right mt-5">
            <button
              onClick={onClose}
              className="bg-sky-500 rounded-md px-3 py-2"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}

ChangeMedication.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
};
