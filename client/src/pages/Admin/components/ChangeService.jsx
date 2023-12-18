import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { updateService } from "../../../features/service/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

export default function ChangeService(props) {
  const dispatch = useDispatch();
  const { onClose, open, values } = props;
  const handleClose = () => {
    onClose();
  };

  const initValue = {
    serviceId: values.id,
    name: values.name,
    description: values.description,
    price: values.price,
  };

  const formik = useFormik({
    initialValues: values,

    validationSchema: Yup.object({
      name: Yup.string().max(50, "Must be less than 50"),
    }),
    onSubmit: (values) => {
      let updateData = {
        serviceId: initValue.serviceId,
        name: typeof values.name === "undefined" ? initValue.name : values.name,
        description:
          typeof values.description === "undefined"
            ? initValue.description
            : values.description,
        price:
          typeof values.price === "undefined" ? initValue.price : values.price,
      };

      dispatch(updateService(updateData));
      formik.resetForm();
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-[600px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            CHANGE SERVICE
          </h1>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center">ID</label>
            </div>
            <input
              id="id"
              name="id"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              placeholder={values.id}
              disabled={true}
              className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></input>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center">Name</label>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder={values.name}
              className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></input>
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
              placeholder={values.description}
              className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Price</label>
            </div>
            <input
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              placeholder={values.price}
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

ChangeService.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
};
