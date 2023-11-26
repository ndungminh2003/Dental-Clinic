import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div className ="flex ">
      <div classname =" w-[1rem]">
        <Sidebar/>
      </div>
      <div className ="grow">
        <Outlet />
      </div>
    </div>
  );
}
