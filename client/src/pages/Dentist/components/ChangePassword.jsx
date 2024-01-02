import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { updateService } from "../../../features/service/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeDentistPassword } from "../../../features/dentist/dentistSlice";
import PopupFail from "../../../components/PopupFail";
import PopupSuccess from "../../../components/PopupSuccess";
export default function ChangePassword(props) {
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let { error, loading, success, message } = useSelector(
    (state) => state.dentist
  );

  const { onClose, open, password } = props;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [wrongLength, setWrongLength] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isFalse, setIsFalse] = useState("");
  const [mess, setMess] = useState("");

  const handleClosePopUp = () => {
    setIsSuccess(false);
    setIsFail(false);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };
  const verifyPassword = () => {
    if (currentPassword === password) {
      setIsTrue(true);
      setIsFalse(false);
    } else {
      setIsFalse(true);
    }
  };
  const handleChange = (e) => {
    setIsFalse(false);
    setCurrentPassword(e.target.value);
  };
  const handleChangePass = (e) => {
    setNewPassword(e.target.value);
    setIsSame(false);
    setWrongLength(false);
  };

  const handleChangePassword = () => {
    if (newPassword === currentPassword) {
      setIsSame(true);
    } else if (newPassword.length < 11 || newPassword.length > 50) {
      setWrongLength(true);
    } else {
      let data = {
        dentistId: user.id,
        oldPassword: password,
        newPassword: newPassword,
      };
      dispatch(changeDentistPassword(data));
    }
  };
  const resetFrom =() =>{
    setIsTrue(false);
    setIsFalse(false);
    setIsSame(false);
    setCurrentPassword("");
    setNewPassword("");
    setWrongLength(false);
  }
  useEffect(() => {
    if (loading) {
      if (message === "success") {
        setIsSuccess(true);
        setMess("change password successfully!");
        resetFrom();
      } else {
        setIsFail(true);
        setMess("change password unsuccessfully!");
      }
    }
  }, [loading, success, message]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-[400px] p-10">
        <h1 className=" text-center text-2xl font-semibold pb-10">
          CHANGE PASSWORD
        </h1>
        {isTrue ? (
          <>
            <div>
              <label className="font-mono rounded-md text-center ">
                Enter your new password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handleChangePass}
                className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none`}
              ></input>
            </div>
            {isSame && (
              <div className="text-xs text-red-600">
                New password should be different from existing password
              </div>
            )}
            {wrongLength && (
              <div className="text-xs text-red-600">
                New Password should be in range 11-50
              </div>
            )}
            <div className="text-right mt-5">
              <button
                onClick={handleChangePassword}
                className="bg-sky-500 rounded-md px-3 py-2"
              >
                Change
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="font-mono rounded-md text-center ">
                Enter your current password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border border-gray-300 resize-none`}
              ></input>
            </div>
            {isFalse && (
              <div className="text-xs text-red-600">
                Password incorrect, please try again
              </div>
            )}
            <div className="text-right mt-5">
              <button
                onClick={verifyPassword}
                className="bg-sky-500 rounded-md px-3 py-2"
              >
                Verify
              </button>
            </div>
          </>
        )}
      </div>
      <PopupSuccess
        onClose={handleClosePopUp}
        open={isSuccess}
        message={mess}
      />
      <PopupFail onClose={handleClosePopUp} open={isFail} message={mess} />
    </Dialog>
  );
}

ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
};
