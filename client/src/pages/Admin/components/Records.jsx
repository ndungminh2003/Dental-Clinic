import React from 'react'
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
export default function Record(props) {
    const { onClose, selectedValue, open, values } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="w-[300px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            MEDICAL RECORD HISTORY 
          </h1>
          <div className ="flex items-center">
            <h1 className ="mr-5">1</h1>
            <button className ="bg-sky-500 rounded-md px-3 py-2">
              10/10/2020
            </button>
          </div>
          <div className ="flex items-center mt-5">
            <h1 className ="mr-5">1</h1>
            <button className ="bg-sky-500 rounded-md px-3 py-2">
              10/10/2020
            </button>
          </div>
          <div className ="flex items-center mt-5">
            <h1 className ="mr-5">1</h1>
            <button className ="bg-sky-500 rounded-md px-3 py-2">
              10/10/2020
            </button>
          </div>
          <div className ="flex items-center mt-5">
            <h1 className ="mr-5">1</h1>
            <button className ="bg-sky-500 rounded-md px-3 py-2">
              10/10/2020
            </button>
          </div>
        </div>
      </Dialog>
    );
  }
  
  Record.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
  };