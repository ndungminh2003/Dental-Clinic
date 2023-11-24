import React from 'react'
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";

export default function DeleteUser(props) {
    const { onClose, open } = props;

    const handleClose = () => {
      onClose();
    };
  
  
    return (
        <Dialog onClose={handleClose} open={open}>
        <div className="w-[400px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            Delete
          </h1>
          <div className = "text-center">
            Delete unsuccessfully, please try again!
          </div>
            <div className ="text-right mt-5">
            <button onClick={handleClose} className ="bg-slate-500 rounded-md px-3 py-2">Close</button>
            </div>
        </div>
      </Dialog>
    );
}

DeleteUser.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  