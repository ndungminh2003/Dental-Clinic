import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Login({ bgcolor, ringcolor }) {
  const [value,setValue] = useState();

  return (
    <div className="w-full flex items-center	min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className=" bg-white	p-10 rounded-md ">
          <h2 className="text-center text-5xl font-extrabold pb-10">Login</h2>
          <div>
            <div className="mb-4">
              <label className="font-mono ">Phone</label>
              <hr />
                <PhoneInput
                  inputClass="!w-full !h-[45px] "
                  placeholder="Enter phone number"
                  country='vn'
                  regions={'asia'}
                  value={value}
                  onChange={setValue}
                  />
            </div>
            <div className="mb-4">
              <label className="font-mono rounded-md	">Password</label>
              <hr />
              <input
                type="password"
                className={` ${ringcolor} w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-25 border border-gray-300	`}
              ></input>
            </div>
            <div className="flex justify-between mb-6">
              <div>
                <input type="checkbox" className="mr-2 align-middle	"></input>
                <label className="font-mono text-base">Remember me</label>
              </div>
              <div>
                <Link to="#" className="font-mono text-sm ">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <button
                className={`${bgcolor} py-2 rounded-md w-full text-white`}
              >
                Login
              </button>
            </div>
            <div>
              <h2 className="font-mono">
                Don't have account?{" "}
                <Link to="/sign-up" className="text-red-700 font-medium">
                  Sign up
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}