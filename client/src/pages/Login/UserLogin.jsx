import React from "react";
import Login from "../../components/Login";
import { ToastContainer } from "react-toastify";
export default function UserLogin() {
  return (
    <div className="bg-slate-300">
      <ToastContainer
        position="top-center"
        autoClose={250}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Login bgcolor={"bg-blue-hosta"} ringcolor={"focus:ring-blue-hosta"} />
    </div>
  );
}
