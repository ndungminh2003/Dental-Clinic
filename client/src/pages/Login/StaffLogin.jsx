import React from "react";
import Login from "../../components/Login";
export default function StaffLogin() {
  return (
    <div>
      <Login
        username={"Username"}
        bgcolor={"bg-dirty-blue"}
        ringcolor={"focus:ring-dirty-blue"}
      />
    </div>
  );
}
