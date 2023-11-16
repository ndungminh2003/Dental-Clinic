import React from "react";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex w-full border-b border-solid border-gray justify-evenly items-center h-20">
        <div className="logo flex justify-center items-center">LOGO</div>
        <div className=" flex gap-24">
          <Link to="/" className=" text-2xl hover:underline">
            Home
          </Link>
          <Link to="/about" className=" text-2xl hover:underline">
            About Us
          </Link>
          <Link to="/profile" className=" text-2xl hover:underline">
            Profile
          </Link>
          <Link to="/service" className=" text-2xl hover:underline">
            Services
          </Link>
          <Link to="/our-dentist" className=" text-2xl hover:underline">
            Our Dentists  
          </Link>
          <br></br>
          <Link to="/contact" className=" text-xl text-white font-bold bg-blue-hosta rounded-lg w-60 h-10 flex justify-center items-center border-solid border-white hover:bg-dirty-blue">
            Book an appointment
          </Link>
        </div> 
        
      <div className="flex gap-1">
          <Link to="/login" className=" text-xl text-black bg-gray-200 hover:bg-blue-hosta hover:text-white">
            Login
          </Link>
          <Link to="/sign-up" className=" text-xl text-black bg-gray-200 hover:bg-blue-hosta hover:text-white ">
            Signup
          </Link>
      </div>
        
        
      </div>
    </>
  );
}
