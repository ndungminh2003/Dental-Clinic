import React from 'react'

const AddRecord = () => {
  return (
    <div className ="p-10 text-xl ">
      <h1>All Records</h1>
      <div>
        <div className="mb-4">
          <label className="font-mono ">Phone</label>
          <hr />
          <input
            type="text"
            className={` w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-25 border border-gray-300	`}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default AddRecord