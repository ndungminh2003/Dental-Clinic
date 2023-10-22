import React from "react";
import { Link } from "react-router-dom";

export default function Login({ username, bgcolor, ringcolor }) {
  return (
    <div className="w-full flex items-center	min-h-screen">
      <div className="w-full max-w-md mx-auto">
        <div className=" bg-neutral-100 p-10 rounded-md  ">
          <h2 className="text-center text-5xl font-extrabold pb-10">Login</h2>
          <div>
            <div className="mb-4">
              <label className="font-mono 	">{username}</label>
              <hr />
              <input
                type="text"
                className={`${ringcolor} w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-25 border`}
              ></input>
            </div>
            <div className="mb-4">
              <label className="font-mono rounded-md	">Password</label>
              <hr />
              <input
                type="password"
                className={` ${ringcolor} w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-25 border`}
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
                <Link to="#" className="text-red-700 font-medium">
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
