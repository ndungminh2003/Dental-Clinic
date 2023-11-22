import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div className ="flex flex-row">
      <Sidebar/>
      <div className ="flex-grow">
        <div >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
