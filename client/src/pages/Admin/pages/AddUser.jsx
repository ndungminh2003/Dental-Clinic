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
    <div className="px-24 py-14 w-full">
        <h1 className=" text-2xl font-semibold pb-5">
          ADD USER
        </h1>
        <div className ="flex lex-grow mt-5 w-full">
          <div className ="w-1/6">
            <h1 className="font-mono ">Type</h1>
          </div>
          <div className ="w-5/6 flex">
            <div>
              <label >
                <input className ="mr-2" type="radio" name="myRadio" value="doctor"  onChange={handleRadioChange} />
                  Doctor
              </label>
            </div>
            <div className ="ml-4">
              <label>
                <input className ="mr-2" type="radio" name="myRadio" value="staff" defaultChecked={true} onChange={handleRadioChange} />
                  Staff
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-grow mt-5">
          <div className="w-1/6 flex	items-center">
            <label className="font-mono rounded-md text-center">Phone</label>
          </div>
          <div className="flex flex-grow w-5/6 items-center">
            <div className="w-1/2">
              <PhoneInput
                inputClass="!w-full"
                placeholder="Enter phone number"
                country='vn'
                regions={'asia'}
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="flex w-1/2 items-center ml-2">
              <div className="w-1/5">
                <label className="font-mono rounded-md text-center	">Birthday</label>
              </div>
              <input
                type="date"
                className={` ml-4 w-4/5 px-3 py-2 rounded-md  border border-gray-300	`}
                ></input>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-grow mt-3">
          <div className="w-1/6">
            <label className="font-mono rounded-md text-center	">
              Fullname
            </label>
          </div>
          <input
            type="text"
            className={` w-5/6  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center flex-grow mt-3">
          <div className="w-1/6">
            <label className="font-mono rounded-md text-center	">
              Password
            </label>
          </div>
          <input
            type="text"
            className={` w-5/6  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        {selectedOption === "doctor" && 
          <div className="flex items-center flex-grow mt-3">
            <div className="w-1/6">
              <label className="font-mono rounded-md text-center	">
                Introduction
              </label>
            </div>
            <textarea
              className={`w-5/6 px-3 py-2 rounded-md border border-gray-300 resize-none`}
            ></textarea>
          </div>
        }
        <div className ="flex lex-grow mt-5 w-full">
          <div className ="w-1/6">
            <h1 className="font-mono ">Type</h1>
          </div>
          <div className ="w-5/6 flex">
            <div>
              <label >
                <input className ="mr-2" type="radio" name="myRadio" value="male"   />
                  Male
              </label>
            </div>
            <div className ="ml-4">
              <label>
                <input className ="mr-2" type="radio" name="myRadio" value="female" defaultChecked={true}  />
                  Female
              </label>
            </div>
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

