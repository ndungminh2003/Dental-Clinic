import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className=" flex gap-10 bg-amber-500 justify-center">
        <Link to="/" className=" text-2xl">
          Home
        </Link>
        <Link to="/about" className=" text-2xl">
          About
        </Link>
        <Link to="/login" className=" text-2xl">
          Login
        </Link>
        <Link to="/profile" className=" text-2xl">
          Profile
        </Link>
      </div>
    </>
  );
}
