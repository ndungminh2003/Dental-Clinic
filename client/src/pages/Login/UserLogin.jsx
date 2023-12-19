import React from "react";
import Login from "../../components/Login";
import { Toaster } from "react-hot-toast";

export default function UserLogin() {
  return (
    <div className="bg-slate-300">
      <Toaster position="top-center" reverseOrder={false} />
      <Login
        bgcolor={"bg-blue-hosta"}
        ringcolor={"focus:ring-blue-hosta"}
        role="guest"
      />
    </div>
  );
}
