import React from "react";
import Login from "../../components/Login";
import { Toaster } from "react-hot-toast";

export default function StaffLogin() {
  return (
    <div className="bg-dirty-blue">
      <Toaster position="top-center" reverseOrder={false} />
      <Login
        bgcolor={"bg-dirty-blue"}
        ringcolor={"focus:ring-dirty-blue"}
        role="staff"
      />
    </div>
  );
}
