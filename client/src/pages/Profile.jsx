import React from 'react'
import profile_pic from '../images/CharliePuth.png'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center gap-16">
    <NavBar />
    <div className="w-full flex items-center">
      <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-center text-6xl font-extrabold pb-10">MY PROFILE</h2>
          <div className=" bg-mercury p-10 rounded-large ">
            <div className="flex flex-col items-center">
            <img className="rounded-full h-36 " src={profile_pic} alt=""/>
            </div>
              
           <br></br>
           
            <div className="rounded-md flex flex-row ">
              <div className="rounded-md flex flex-col space-y-9 mr-16 gap-3">
                <div className="font-bold ml-16 text-xl">NAME:</div>
                <div className="font-bold ml-16 text-xl">DATE OF BIRTH:</div>
                <div className="font-bold ml-16 text-xl">GENDER:</div>
                <div className="font-bold ml-16 text-xl">PHONE NUMBER:</div>
                <div className="font-bold ml-16 text-xl">ADDRESS:</div>
              </div>
              <div className="rounded-md flex flex-col space-y-4 gap-4">
                <input type="text" className=" w-96 h-10 rounded-md"></input>
                <input type="date" className=" w-96 h-10 rounded-md"></input>
                <select name="" className=" w-96 h-10 rounded-md">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input type="text" className=" w-96 h-10 rounded-md" maxLength={10}></input>
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
    <Footer />
    </div>
    
  )
}
