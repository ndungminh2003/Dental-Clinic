import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function AddUser (){
  const [value,setValue] = useState();
  const [selectedOption, setSelectedOption] = useState('male');
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="px-24 py-14">
        <h1 className=" text-2xl font-semibold pb-5">
          ADD USER
        </h1>
        <div className ="flex mt-5">
          <h1>Type</h1>
          <div>
            <label className ="ml-[118px]">
              <input className ="mr-2" type="radio" name="myRadio" value="doctor"  onChange={handleRadioChange} />
                Doctor
            </label>
          </div>
          <div>
            <label className ="ml-5">
              <input className ="mr-2" type="radio" name="myRadio" value="staff" defaultChecked={true} onChange={handleRadioChange} />
                Staff
            </label>
          </div>
        </div>
        <div className="flex  grow mt-5">
          <div className="flex w-1/2 items-center">
            <div className="w-1/5">
              <label className="font-mono rounded-md text-center	">Phone</label>
            </div>
            <div  className="w-4/5 ml-[100px]">
              <PhoneInput
                inputClass="!w-full"
                placeholder="Enter phone number"
                country='vn'
                regions={'asia'}
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/5">
              <label className="font-mono rounded-md text-center	">Birthday</label>
            </div>
            <input
              type="date"
              className={`w-4/5 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/5">
            <label className="font-mono rounded-md text-center	">
              Fullname
            </label>
          </div>
          <input
            type="text"
            className={` w-4/5  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/5">
            <label className="font-mono rounded-md text-center	">
              Password
            </label>
          </div>
          <input
            type="text"
            className={` w-4/5  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        {selectedOption === "doctor" && 
          <div className="flex items-center grow mt-3">
            <div className="w-1/5">
              <label className="font-mono rounded-md text-center	">
                Introduction
              </label>
            </div>
            <textarea
              className={`w-4/5 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
        }
        <div className ="flex mt-5">
          <h1>Gender</h1>
          <div>
            <label className ="ml-[100px]">
              <input className ="mr-2" type="radio" value="male" defaultChecked={true} />
                Male
            </label>
          </div>
          <div>
            <label className ="ml-5">
              <input className ="mr-2" type="radio" value="female" />
                Female
            </label>
          </div>
        </div>
        
        <div className="text-right text-white mt-5">
          <button className="bg-ebony-clay rounded-md px-3 py-2">
            Add
          </button>
        </div>
      </div>
  )
}

