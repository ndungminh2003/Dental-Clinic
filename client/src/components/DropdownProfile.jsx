import React from "react";
import { Link } from "react-router-dom";
import { faUser, faFileMedical, faCalendar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const DropdownProfile = ({ onClose }) => {
    const handleItemClick = (item) => {
      console.log(`Clicked on: ${item}`);
      onClose();
    };
  
    return (
      <div className="absolute top-[2rem]  w-48  bg-white border border-gray-300 p-2 z-10 rounded-2xl">
        <ul className="flex flex-col gap-4 ">
          <li className ="hover:bg-gray-300" onClick={() => handleItemClick("My Profile")}>
            <Link to="/profile"> <FontAwesomeIcon className="pr-2"icon={faUser} />My Profile</Link>
          </li>
          <li className ="hover:bg-gray-300"onClick={() => handleItemClick("My Medical Records")}>
            <Link to="/my-dental-record"><FontAwesomeIcon className="pr-2"icon={faFileMedical} />My Medical Records</Link>
          </li>
          <li className ="hover:bg-gray-300"onClick={() => handleItemClick("My Appointments")}>
          <Link to="/my-appointment"><FontAwesomeIcon className="pr-2"icon={faCalendar} />My Appointments</Link></li>
          <li className ="hover:bg-gray-300"onClick={() => handleItemClick("Logout")}>
          <Link to="/login"><FontAwesomeIcon className="pr-2"icon={faSignOutAlt} />Logout</Link></li>
        </ul>
      </div>
    );
  };
  
  export default DropdownProfile;