import React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function PopupSuccess(props) {
  const { onClose, open, message } = props;
  return (
    <Dialog onClose={onClose} open={open} className="p-5" me>
      <div className="w-[350px] h-[310px] border-4	border-emerald-500 p-5">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Center the icon using flexbox */}
            <CheckCircleIcon style={{ fontSize: 70, color: "#2ecc71" }} />
          </div>
          <h1 className="text-center text-lg font-medium text-emerald-500 mt-5">
            SUCCESS!!
          </h1>
          <p className="text-center mt-5">
            {message}
          </p>
        </div>
        <button
          onClick={() => onClose()}
          className="bg-emerald-500 rounded-md px-3 py-2 w-full mt-10"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
PopupSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message:  PropTypes.string.isRequired,
};
