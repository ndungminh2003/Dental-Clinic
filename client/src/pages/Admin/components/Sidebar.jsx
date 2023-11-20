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
    <div className="h-screen w-[300px] z-10 bg-ebony-clay p-3	">
      <div className="mx-2 mb-10 mt-5">
        <h1 className="text-3xl font-bold uppercase text-center text-white		">
          Dencare
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="medication/all" className="bg-light-ebony-clay side">
              <TodayIcon style={{ color: "white" }} />
              <span className="ml-2 mr-3 text-white	">
                Medication management
              </span>
              {pathname.includes("medication") ? (
                <ExpandLessIcon style={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "white" }} />
              )}
            </NavLink>
          </li>
          {pathname.includes("medication") && (
            <div>
              <li>
                <NavLink to="medication/all" className=" side">
                  <span
                    className={`ml-8  
                    ${
                      pathname.includes("medication/all")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    All medications
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="medication/add" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("medication/add")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    Add medication
                  </span>
                </NavLink>
              </li>
            </div>
          )}
          <li>
            <NavLink to="user/all" className="bg-light-ebony-clay side mt-2">
              <TodayIcon style={{ color: "white" }} />
              <span className="ml-2 mr-3 text-white	">
                User management
              </span>
              {pathname.includes("user") ? (
                <ExpandLessIcon style={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "white" }} />
              )}
            </NavLink>
          </li>
          {pathname.includes("user") && (
            <div>
              <li>
                <NavLink to="user/all" className=" side">
                  <span
                    className={`ml-8  
                    ${
                      pathname.includes("user/all")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    All users
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="user/add" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("user/add")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    Add user
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="user/doctor" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("user/doctor")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    Doctor's schedule
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
