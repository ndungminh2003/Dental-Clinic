import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-screen w-[300px] z-10 bg-dirty-blue p-3	">
      <div className="mx-2 mb-10 mt-5">
        <h1 className="text-3xl font-bold uppercase text-center text-white		">
          Dencare
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="appointment/all" className="bg-light-dirty-blue side">
              <TodayIcon style={{ color: "white" }} />
              <span className="ml-2 mr-3 text-white	">
                Appointment management
              </span>
              {pathname.includes("appointment") ? (
                <ExpandLessIcon style={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "white" }} />
              )}
            </NavLink>
          </li>
          {pathname.includes("appointment") && (
            <div>
              <li>
                <NavLink to="appointment/all" className=" side">
                  <span
                    className={`ml-8  
                    ${
                      pathname.includes("appointment/all")
                        ? "text-white"
                        : "text-dark-dirty-blue"
                    }`}
                  >
                    All appointment
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="appointment/add" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("appointment/add")
                        ? "text-white"
                        : "text-dark-dirty-blue"
                    }`}
                  >
                    Add appointment
                  </span>
                </NavLink>
              </li>
            </div>
          )}
          <li>
            <NavLink to="record/all" className="mt-2 side">
              {" "}
              <DocumentScannerIcon style={{ color: "white" }} />
              <span className="ml-2 mr-14 text-white">Record management</span>
              {pathname.includes("record") ? (
                <ExpandLessIcon style={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "white" }} />
              )}
            </NavLink>
          </li>

          {pathname.includes("record") && (
            <div>
              <li>
                <NavLink to="record/all" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("record/all")
                        ? "text-white"
                        : "text-dark-dirty-blue"
                    }`}
                  >
                    All Records
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="record/add" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("record/add")
                        ? "text-white"
                        : "text-dark-dirty-blue"
                    }`}
                  >
                    Add Record
                  </span>
                </NavLink>
              </li>
            </div>
          )}

          <li>
            <NavLink to="/messages" className="mt-2 side">
              <LogoutIcon style={{ color: "white" }} />
              <span className="ml-2 text-white">Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
