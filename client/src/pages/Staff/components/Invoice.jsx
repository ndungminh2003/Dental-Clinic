import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import InvoiceCom from "./InvoiceCom/InvoiceCom";
export default function Invoice (props)  {
    const { onClose, selectedValue, open, values ,services,medicine,status } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };
    const [openChange, setOpenChange] = React.useState(false);
    const handleCloseChange = () => {
      setOpenChange(false);
    };
    const handleListItemClick = (value) => {
      onClose(value);
    };
    const handleInvoiceClick = () => {
      window.print();
    };
    return (
      <Dialog onClose={handleClose} open={open}>
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
    selectedValue: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    medicine: PropTypes.shape({
      name: PropTypes.array.isRequired,
      quantity: PropTypes.array.isRequired,
      price: PropTypes.array.isRequired,
    }),
    status: PropTypes.string.isRequired,
  };
