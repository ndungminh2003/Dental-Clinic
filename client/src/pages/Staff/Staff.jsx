import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
export default function Staff() {
  return (
    <div className ="flex ">
      <div classname =" w-[1rem]">
        <Sidebar/>
      </div>
      <div className ="grow">
        <Header/>
        <div style={{ height: "calc(100vh - 80px)", overflowX: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
