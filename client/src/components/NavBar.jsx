import React, { useState } from "react";

import DropdownProfile from "../components/DropdownProfile";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div className="flex w-full border-b border-solid border-gray justify-evenly items-center h-20">
        <div>Logo</div>
        <div className="flex gap-24">
          <Link to="/" className="text-2xl hover:underline">
            Home
          </Link>
          <Link to="/contact-us" className="text-2xl hover:underline">
            Contact Us
          </Link>
          <Link to="/service" className="text-2xl hover:underline">
            Services
          </Link>
          <Link to="/our-dentist" className="text-2xl hover:underline">
            Our Dentists
          </Link>
          <br />
          <Link
            to="/book-appointment"
            className="text-xl text-white font-bold bg-blue-hosta rounded-lg w-60 h-10 flex justify-center items-center border-solid border-white hover:bg-dirty-blue"
          >
            Book an appointment
          </Link>
        </div>

        <div className="flex gap-1">
          <div className="relative">
            <button
              className="text-xl text-black bg-gray-200 hover:bg-blue-hosta hover:text-white cursor-pointer"
              onClick={toggleDropdown}
            >
              Profile
            </button>
            {showDropdown && <DropdownProfile onClose={closeDropdown} />}
          </div>
        </div>
      </div>
    </>
  );
}
