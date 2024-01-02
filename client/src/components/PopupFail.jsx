import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import CancelIcon from '@mui/icons-material/Cancel';
export default function PopupFail(props) {
    const { onClose, open,message} = props;
    return (
      <Dialog onClose={onClose} open={open} className="p-5">
        <div className ="w-[350px] h-[310px] border-4	border-red-400 p-5">
          <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Center the icon using flexbox */}
            <CancelIcon style={{ fontSize: 70, color: "#f87171" }} />
          </div>
            <h1 className ="text-center text-lg font-medium text-red-400">SORRY!</h1>
            <p className ="text-center mt-5">{message}</p>
            <p className ="text-center mt-5">Please try again</p>
          </div>
          <button
            onClick={() => onClose()}
            className="bg-red-400 rounded-md px-3 py-2 w-full mt-10 text-white"
          >
            Close
          </button>
        </div>
      </Dialog>
    );
}
PopupFail.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    message:  PropTypes.string.isRequired,
  };
  