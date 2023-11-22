import React from 'react'
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";

export default function SeeMedication(props) {
    const { onClose, open, values } = props;

    const handleClose = () => {
      onClose();
    };
  
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="w-[600px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            MEDICATIONS
          </h1>
          <div className="flex  grow mt-3">
            <div className ="flex w-1/2 items-center">
              <div className ="w-1/4">
                <label className="font-mono rounded-md text-center	">Code</label>
              </div>
              <input
                type="text"
                value={values[0]}
                disabled="true"
                className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
            </div>
            <div className ="flex w-1/2 items-center ml-7">
              <div className ="w-1/4" >
                <label className="font-mono rounded-md text-center	">Name</label>
              </div>
              <input
                type="text"
                value={values[1]}
                disabled="true"
                className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
              ></input>
            </div>
          </div>
          <div className="flex  grow mt-3">
            <div className ="flex w-1/2 items-center">
              <div className ="w-1/3">
                <label className="font-mono rounded-md text-center	">Quantity</label>
              </div>
              <input
                type="text"
                value={values[5]}
                disabled="true"
                className={` w-2/3 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
            </div>
            <div className ="flex w-1/2 items-center ml-7">
              <div className ="w-1/4" >
                <label className="font-mono rounded-md text-center	">Unit</label>
              </div>
              <input
                type="text"
                value={values[6]}
                disabled="true"
                className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
              ></input>
            </div>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Description</label>
            </div>
            <textarea
                value={values[2]}
                disabled="true"
                className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Indication</label>
            </div>
            <textarea
                value={values[3]}
                disabled="true"
                className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Expiration date</label>
            </div>
            <input
              type="text"
              value={values[4]}
              disabled="true"
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className ="text-right mt-5">
            <button onClick={onClose} className ="bg-sky-500 rounded-md px-3 py-2">Close</button>
          </div>
        </div>
      </Dialog>
    );
}

SeeMedication.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired,
  };
  