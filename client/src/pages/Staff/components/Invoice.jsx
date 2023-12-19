import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import InvoiceCom from "./InvoiceCom/InvoiceCom";
import { getInvoiceByRecordId } from "../../../features/invoice/invoiceSlice";
import { updateInvoiceStatus } from "../../../features/invoice/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Invoice(props) {
  const { onClose, open, services, medicine, getTotal, recordId } = props;
  const dispatch = useDispatch();
  const {
    invoice: invoiceData,
    loading: invoiceLoading,
    success: invoiceSuccess,
    error: invoiceError,
  } = useSelector((state) => state.invoice);
  useEffect(() => {
    dispatch(getInvoiceByRecordId(recordId));
  }, []);
  // useEffect(() => {
  //   console.log("invoice", invoiceData);
  // }, [invoiceData]);
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleInvoicePrintClick = () => {
    window.print();
  };
  const handlePayClick = () => {
    let data = {
      invoiceId: invoiceData[0].id,
      status: 'Đã thanh toán',
    };
    dispatch(updateInvoiceStatus(data));
  }
  return (
    <Dialog onClose={onClose} open={open}>
      <div className=" p-10">
        <div>
          <InvoiceCom
            services={services}
            medicine={medicine}
            total={getTotal}
          />
        </div>
        <div className="text-right mt-5">
          {invoiceData &&
          invoiceData.length > 0 &&
          invoiceData[0].status === "Chưa thanh toán" ? (
            <button 
              onClick={handlePayClick}
              className="bg-yellow-300 rounded-md px-3 py-2 mr-2">
              Pay
            </button>
          ) : (
            <button className="bg-sky-500 rounded-md px-3 py-2 mr-2">
              Already Paid
            </button>
          )}

          <button
            onClick={handleInvoicePrintClick}
            className="bg-sky-500 rounded-md px-3 py-2 mr-2"
          >
            Print
          </button>
          <button
            onClick={() => handleListItemClick("hi")}
            className="bg-neutral-300 rounded-md px-3 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
}

Invoice.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.float,
      serviceName: PropTypes.string,
    })
  ),
  medicine: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.float,
      quantity: PropTypes.number,
      medicineName: PropTypes.string,
    })
  ),
  recordId: PropTypes.number,
};
