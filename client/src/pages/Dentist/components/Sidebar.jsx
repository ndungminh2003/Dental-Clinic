import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-screen w-[300px] z-10 bg-Topaz p-3	">
      <div className="mx-2 mb-10 mt-5">
        <h1 className="text-3xl font-bold uppercase text-center text-white		">
          Dencare
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="appointment/all" className="bg-light-Topaz side">
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
                        : "text-dark-Topaz"
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
                        : "text-dark-Topaz"
                    }`}
                  >
                    Add appointment
                  </span>
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
