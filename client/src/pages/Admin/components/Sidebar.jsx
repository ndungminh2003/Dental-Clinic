import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user || user?.role != "admin") {
      navigate("/admin/login");
    }
  }, []);
  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("login");
  };
  return (
    <div className=" w-full h-screen z-10 bg-ebony-clay p-3	">
      <div className="mx-2 mb-10 mt-5">
        <h1 className="text-3xl font-bold uppercase text-center text-white		">
          Dencare
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <NavLink
              to="service/all"
              className={`${
                pathname.includes("service")
                  ? "bg-light-ebony-clay"
                  : "bg-ebony-clay"
              } side`}
            >
              <MedicalServicesIcon style={{ color: "white" }} />
              <span className="ml-2 mr-3 text-white	">Service management</span>
              {pathname.includes("service") ? (
                <ExpandLessIcon style={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "white" }} />
              )}
            </NavLink>
          </li>
          {pathname.includes("service") && (
            <div>
              <li>
                <NavLink to="service/all" className=" side">
                  <span
                    className={`ml-8  
                    ${
                      pathname.includes("service/all")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    All services
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="service/add" className=" side">
                  <span
                    className={`ml-8 
                    ${
                      pathname.includes("service/add")
                        ? "text-white"
                        : "text-dark-ebony-clay"
                    }`}
                  >
                    Add service
                  </span>
                </NavLink>
              </li>
            </div>
          )}
          <li>
            <NavLink
              to="medication/all"
              className={`${
                pathname.includes("medication")
                  ? "bg-light-ebony-clay"
                  : "bg-ebony-clay"
              } side`}
            >
              <VaccinesIcon style={{ color: "white" }} />
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
            <NavLink
              to="user/all"
              className={`${
                pathname.includes("user")
                  ? "bg-light-ebony-clay"
                  : "bg-ebony-clay"
              } side`}
            >
              <PersonIcon style={{ color: "white" }} />
              <span className="ml-2 mr-3 text-white	">User management</span>
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
            </div>
          )}
          <button className="mt-2 side" onClick={handleLogoutClick}>
            <LogoutIcon style={{ color: "white" }} />
            <span className="ml-2 mr-14 text-white">Log out</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
