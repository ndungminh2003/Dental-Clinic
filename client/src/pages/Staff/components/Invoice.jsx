import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";

export default function Invoice (props)  {
    const { onClose, selectedValue, open, values ,medicine,status } = props;
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
      setOpenChange(true);
    };
    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="w-[500px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            SEE MEDICAL RECORD
          </h1>
          <div className="flex items-center grow">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Patient</label>
            </div>
            <input
              type="text"
              value={values[2]}
              disabled="true"
              className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Doctor</label>
            </div>
            <input
              type="text"
              value={"Nguyễn Văn A"}
              disabled="true"
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Day</label>
            </div>
            <input
              type="date"
              disabled="true"
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Service</label>
            </div>
            <div className ="w-3/4">
              <input
                type="text"
                // value={serviceName}
                disabled="true"
                className={` w-full  px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
            </div>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Medicine</label>
            </div>
            {/* <div className ="w-3/4">
              {medicine && medicine.name.map((medName, index) => (
                <div className="m-1 flex grow"key={index}>
                  <input
                    type="text"
                    value={medName}
                    disabled="true"
                    className={` w-2/3  px-3 py-2 rounded-md border border-gray-300	`}
                  ></input>
                  <input
                    type="text"
                    value={medicine.quantity[index]}
                    disabled="true"
                    className={` w-1/3 ml-1  px-3 py-2 rounded-md border border-gray-300	`}
                  ></input>
                </div>
              ))}
            </div> */}
          </div>
          
          <div className="text-right mt-5">
            {status === "Chưa thanh toán" 
            ?
            <button
              onClick={() => handleListItemClick("hi")}
              className="bg-sky-500 rounded-md px-3 py-2 mr-2"
            >
              Already Paid
            </button>
            :
            <button
              className="bg-yellow-300 rounded-md px-3 py-2 mr-2"
            >
              Pay
            </button>
            }
            <button
              onClick={handleInvoiceClick}
              className="bg-sky-500 rounded-md px-3 py-2 mr-2"
            >
              Invoice
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
