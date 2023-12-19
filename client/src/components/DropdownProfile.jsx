import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faUser,
  faFileMedical,
  faCalendar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const DropdownProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    console.log(`Clicked on: ${item}`);
    onClose();
  };

  return (
    <div className="absolute top-[3rem] w-[270px]  pl-3 pr-3 bg-white border border-gray-300 p-2 z-10 rounded-2xl">
      <ul className="flex flex-col gap-4 text-xl">
        <li
          className="hover:bg-gray-300 rounded-xl h-10 pl-4 flex flex-col justify-center"
          onClick={() => handleItemClick("My Profile")}
        >
          <Link to="/profile">
            {" "}
            <FontAwesomeIcon className="pr-2" icon={faUser} />
            My Profile
          </Link>
        </li>
        <li
          className="hover:bg-gray-300 rounded-xl h-10 pl-4 flex flex-col justify-center"
          onClick={() => handleItemClick("My Medical Records")}
        >
          <Link to="/my-dental-record">
            <FontAwesomeIcon className="pr-2" icon={faFileMedical} />
            My Medical Records
          </Link>
        </li>
        <li
          className="hover:bg-gray-300 rounded-xl h-10 pl-4 flex flex-col justify-center"
          onClick={() => handleItemClick("My Appointments")}
        >
          <Link to="/my-appointment">
            <FontAwesomeIcon className="pr-2" icon={faCalendar} />
            My Appointments
          </Link>
        </li>
        <li
          className="hover:bg-gray-300 rounded-xl h-10 pl-4 flex flex-col justify-center"
          onClick={() => {
            handleItemClick("Logout");
            dispatch(logout());
            navigate("/login");
          }}
        >
          <div>
            <FontAwesomeIcon className="pr-2" icon={faSignOutAlt} />
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropdownProfile;
