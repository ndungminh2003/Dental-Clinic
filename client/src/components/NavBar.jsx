import React from "react";

import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="flex w-full bg-blue-hosta justify-evenly items-center h-20">
        <div className="logo flex justify-center items-center">LOGO</div>
        <div className=" flex gap-24">
          <Link to="/" className=" text-2xl hover:text-white">
            Home
          </Link>
          <Link to="/about" className=" text-2xl hover:text-white">
            About Us
          </Link>
          <Link to="/profile" className=" text-2xl hover:text-white">
            Profile
          </Link>
          <Link to="/service" className=" text-2xl hover:text-white">
            Services
          </Link>
          <br></br>
          <Link to="/contact" className=" text-xl text-white font-bold bg-cyan-blue-azure rounded-lg w-60 h-10 flex justify-center items-center border-solid border-white hover:bg-ebony-clay">
            Book an appointment
          </Link>
        </div> 
        
      <div className="flex gap-1">
          <Link to="/login" className=" text-xl text-white bg-cyan-blue-azure hover:bg-ebony-clay">
            Login
          </Link>
          <Link to="/signup" className=" text-xl text-white bg-cyan-blue-azure hover:bg-ebony-clay">
            Signup
          </Link>
      </div>
        
        
      </div>
    </>
  );
}
