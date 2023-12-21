import React from "react";
import Login from "../../components/Login";
import { Toaster } from "react-hot-toast";

export default function DentistLogin() {
  return (
    <div className="bg-Topaz">
      <Toaster position="top-center" reverseOrder={false} />
      <Login
        bgcolor={"bg-Topaz"}
        ringcolor={"focus:ring-Topaz"}
        role="dentist"
      />
    </div>
  );
}
