import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Profile() {
  const [isSavedPopupVisible, setSavedPopupVisible] = useState(false);

  const handleSaveClick = () => {
    setSavedPopupVisible(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <NavBar />
      <div className="w-full flex items-center">
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-mercury p-10 rounded-3xl">
            <h2 className="text-center text-6xl font-extrabold pb-10">MY PROFILE</h2>
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
                <input type="text" className=" w-96 h-10 rounded-md pl-2"></input>
                <input type="date" className=" w-96 h-10 rounded-md pl-1"></input>
                <select name="" className=" w-96 h-10 rounded-md pl-1">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input type="text" className=" w-96 h-10 rounded-md pl-2" maxLength={10}></input>
                <input type="text" className=" w-96 h-10 rounded-md pl-2"></input>
              </div>
          </div>

            <br></br>
            <div className="flex justify-center">
              <button
                className="w-40 py-2 rounded-md text-white bg-dirty-blue"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup component */}
      {isSavedPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-green-500 text-lg font-semibold">
              Your information has been saved
            </p>
            <div className='flex justify-center'>
              <button
              className="mt-4 bg-dirty-blue text-white py-2 px-4 rounded-md"
              onClick={() => setSavedPopupVisible(false)}
            >
              Close
            </button></div>
            
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}


