import React from 'react'

export default function AddMedication (){
  return (
    <div className="px-14 py-10">
        <h1 className=" text-2xl font-semibold pb-5">
          ADD MEDICATION
        </h1>
        <div className="flex  grow mt-3">
          <div className="flex w-1/2 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Code</label>
            </div>
            <input
              type="text"
              className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Name</label>
            </div>
            <input
              type="text"
              className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-1/2 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Quantity</label>
            </div>
            <input
              type="text"
              className={` w-3/4 ml-2 px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/2 items-center ml-7">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Unit</label>
            </div>
            <input
              type="text"
              className={`w-3/4 px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">
              Description
            </label>
          </div>
          <textarea
            className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
          ></textarea>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">
              Indication
            </label>
          </div>
          <textarea
            className={`w-3/4 px-3 py-2 rounded-md border border-gray-300 resize-none`}
          ></textarea>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">
              Expiration date
            </label>
          </div>
          <input
            type="text"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>

        <div className="text-right mt-5">
          <button className="bg-sky-500 rounded-md px-3 py-2">
            Save
          </button>
        </div>
      </div>
  )
}

