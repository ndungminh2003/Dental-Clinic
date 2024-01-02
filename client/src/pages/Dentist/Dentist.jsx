import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
export default function Dentist() {
  return (
    <div className ="flex flex-row">
      <div>
        <Sidebar/>
      </div>
      <div className ="flex-grow">
        <Header/>
        <div style={{ height: "calc(100vh - 80px)", overflowX: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
