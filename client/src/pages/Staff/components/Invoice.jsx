import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import InvoiceCom from "./InvoiceCom/InvoiceCom";
export default function Invoice (props)  {
    const { onClose, open,services,medicine } = props;
    console.log(services);
    console.log(medicine);
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const handleInvoiceClick = () => {
      window.print();
    };
    return (
      <Dialog onClose={onClose} open={open}>
        <div className=" p-10">
          <div>
            <InvoiceCom services ={services} medicine ={medicine}/>
          </div>
          <div className="text-right mt-5">
            <button
              onClick={handleInvoiceClick}
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
  };
