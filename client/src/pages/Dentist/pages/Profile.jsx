import React from "react";
export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center gap-16 mt-10">
      <div className="w-full flex items-center	">
        <div className="w-full max-w-3xl mx-auto bg-mercury rounded-2xl">
          <h2 className="text-center text-5xl font-extrabold pb-10 mt-10">
            MY PROFILE
          </h2>
          <div className="px-3 pb-3">
            <br></br>

            <div className="rounded-md flex flex-row ">
              <div className="rounded-md flex flex-col space-y-7 mr-16 gap-3">
                <div className="font-bold ml-16 text-xl">NAME:</div>
                <div className="font-bold ml-16 text-xl">DATE OF BIRTH:</div>
                <div className="font-bold ml-16 text-xl">GENDER:</div>
                <div className="font-bold ml-16 text-xl">PHONE NUMBER:</div>
                <div className="font-bold ml-16 text-xl">ADDRESS:</div>
                <div className="font-bold ml-16 text-xl">INTRODUCTION:</div>
              </div>
              <div className="rounded-md flex flex-col space-y-3 gap-3">
                <input type="text" className=" w-96 h-10 rounded-md"></input>
                <input type="date" className=" w-96 h-10 rounded-md"></input>
                <select name="" className=" w-96 h-10 rounded-md">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input
                  type="text"
                  className=" w-96 h-10 rounded-md"
                  maxLength={10}
                ></input>
                <input type="text" className=" w-96 h-10 rounded-md"></input>
                <textarea className=" w-96 h-20 rounded-md"></textarea>
              </div>
            </div>
            <div className ="text-right py-5 pr-16 w-full text-red-400">
                Change password?
            </div>
            <br></br>
            <div className="flex justify-center">
              <button className=" w-40 py-2 rounded-md text-white bg-dirty-blue">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
