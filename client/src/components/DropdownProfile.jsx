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
      <div className="absolute top-[2rem]  w-44  bg-white border border-gray-300 p-2 z-10 rounded-2xl">
        <ul className="flex flex-col gap-4 ">
          <li className ="hover:bg-mercury" onClick={() => handleItemClick("My Profile")}>
            <Link to="/profile"> <FontAwesomeIcon icon={faUser} />My Profile</Link>
          </li>
          <li className ="hover:bg-mercury"onClick={() => handleItemClick("My Medical Records")}>
            <Link to="/my-dental-record"><FontAwesomeIcon icon={faFileMedical} />My Medical Records</Link>
          </li>
          <li className ="hover:bg-mercury"onClick={() => handleItemClick("My Appointments")}>
          <Link to="/my-appointment"><FontAwesomeIcon icon={faCalendar} />My Appointments</Link></li>
          <li className ="hover:bg-mercury"onClick={() => handleItemClick("Logout")}>
          <Link to="/login"><FontAwesomeIcon icon={faSignOutAlt} />Logout</Link></li>
        </ul>
      </div>
    );
  };
  
  export default DropdownProfile;