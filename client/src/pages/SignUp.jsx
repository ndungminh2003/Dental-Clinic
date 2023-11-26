import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SignUp() {
  const [value,setValue] = useState();
  return (
    <div className="w-full flex items-center min-h-screen	bg-slate-300">
      <div className="w-full max-w-md mx-auto ">
        <div className=" bg-neutral-100 px-12 py-7 rounded-md  ">
          <h2 className="text-center text-4xl font-extrabold pb-5">Sign up</h2>
          <div className ="w-full">
            <div className="mb-3">
              <label className="font-mono text-sm">Full Name</label>
              <hr />
              <input
                type="text"
                className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
              ></input>
            </div>
            <div className="mb-3 flex grow justify-between w-full">
              <div className ="w-[45%]">
                <label className="font-mono text-sm">Date of birth</label>
                <hr />
                <input
                  type="date"
                  className={`focus:ring-blue-hosta px-2 py-1 input focus:ring-opacity-25  `}
                ></input>
              </div>
              <div className ="w-[45%]">
                <label className="font-mono text-sm">Gender</label>
                <hr />
                <select className ="w-full  px-2 py-1 border border-gray-300 rounded-md">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="font-mono text-sm">Phone</label>
                <hr />
                <PhoneInput
                  inputClass="!w-full !h-[31px]"
                  // className={`focus:ring-blue-hosta w-full px-2 py-1 rounded-md focus:outline-none focus:ring-2 border focus:ring-opacity-25  `}
                  placeholder="Enter phone number"
                  country='vn'
                  regions={'asia'}
                  value={value}
                  onChange={setValue}
                  />
            </div>
            <div className="mb-3">
              <label className="font-mono text-sm">Address</label>
              <hr />
              <input
                type="text"
                className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
              ></input>
            </div>
            <div className="mb-3">
              <label className="font-mono rounded-md text-sm">Password</label>
              <hr />
              <input
                type="password"
                className={`focus:ring-blue-hosta input focus:ring-opacity-25  `}
              ></input>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <input type="checkbox" className="mr-2 align-middle	"></input>
                <label className="font-mono text-sm">Remember me</label>
              </div>
              <div>
                <Link to="#" className="font-mono text-sm ">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mb-3">
              <button
                className={"bg-blue-hosta py-1 rounded-md w-full text-white"}
              >
                Login
              </button>
            </div>
            <div>
              <h2 className="font-mono text-sm">
                Already have account?{" "}
                <Link to="/login" className="text-red-700 font-medium text-sm">
                  Log in
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}