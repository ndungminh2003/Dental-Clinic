import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dentist() {
  return (
    <div className ="flex flex-row">
      <Sidebar/>
      <div className ="flex-grow p-5">
        <Outlet />
      </div>
    </div>
  );
}
