import React from "react";
import Login from "../../components/Login";
import { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  return (
    <div className="bg-ebony-clay">
      <Toaster position="top-center" reverseOrder={false} />
      <Login bgcolor={"bg-ebony-clay"} ringcolor={"focus:ring-ebony-clay"} />
    </div>
  );
}
