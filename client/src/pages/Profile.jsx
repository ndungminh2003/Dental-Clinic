import React from 'react'
import profile_pic from '../images/CharliePuth.png'
export default function Profile() {
  return (
    <div className="w-full flex items-center">
      <div className="w-full max-w-3xl mx-auto pt-32">
          <h2 className="text-center text-5xl font-extrabold pb-10">My Profile</h2>
          <div className=" bg-mercury p-10 rounded-large ">
            <div className="flex flex-col items-center">
            <img className="rounded-full h-32 " src={profile_pic} alt=""/>
            </div>
              
           <br></br>
           
            <div className="rounded-md flex flex-row ">
              <div className="rounded-md flex flex-col space-y-9 mr-32">
                <div className="font-bold ml-16">Name:</div>
                <div className="font-bold ml-16">Date of birth:</div>
                <div className="font-bold ml-16">Address:</div>
              </div>
              <div className="rounded-md flex flex-col space-y-4">
                <input type="text" className=" w-96 h-10 rounded-md"></input>
                <input type="date" className=" w-96 h-10 rounded-md"></input>
                <input type="text" className=" w-96 h-10 rounded-md"></input>
              </div>
          </div>
          <br></br>
          <div className='flex justify-center'>
            <button className=' w-40 py-2 rounded-md text-white bg-dirty-blue'>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
