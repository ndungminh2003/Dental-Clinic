import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function BookSuccess() {
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handleConfirmClick = () => {
    setShowPopup(false);
    setShowConfirmation(true);

  };

  const handleConfirmationConfirmClick = () => {
    setShowConfirmation(false);
  };
  const WarningPopup = ({ message, onCancel, onConfirm }) => {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
        <div className='bg-black opacity-50 w-full h-full absolute'></div>
        <div className='bg-white p-8 rounded-md shadow-md z-10'>
          <p>{message}</p>
          <div className='mt-4 flex justify-center'>
            <button
              className='bg-cyan-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-cyan-600'
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
              onClick={onCancel}
            >
              Cancel
            </button>
            
          </div>
        </div>
      </div>
    );
  };


  const ConfirmationPopup = ({ message, onConfirm }) => {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
        <div className='bg-black opacity-50 w-full h-full absolute'></div>
        <div className='bg-white p-8 rounded-md shadow-md z-10'>
          <p>{message}</p>
          <div className='mt-4 flex justify-center'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
              onClick={onConfirm}
            >
            <Link to="/">Return to Home</Link>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-16'>
        <NavBar />
        <div className=' bg-mercury rounded-[60px] w-[1000px] h-[680px] '>
          <div className='flex flex-col items-center gap-5'>
            <div className='pt-10 text-5xl font-bold '>
              Appointment Booked
            </div>
            <div className='text-green-500 font-bold text-2xl'>
              You have successfully booked an appointment
            </div>
            <div className='font-bold text-grullo text-xl'>
              Please check for your information below
            </div>
          </div>
          <div className='flex flex-col gap-4 pt-10'>
                <div className='flex flex-row gap-[228px]'>
                    <div className='text-xl font-bold pl-[270px]'>
                        Name:
                    </div>
                    <div className='text-xl'>
                        Post Malone
                    </div>
                </div>
                <div className='flex flex-row gap-[164px]'>
                    <div className='text-xl font-bold pl-[270px]'>
                        Date of birth:
                    </div>
                    <div className='text-xl'>
                        07/12/2000
                    </div>
                </div>
                <div className='flex flex-row gap-[202px]'>
                    <div className='text-xl font-bold pl-[270px]'>
                        Address:
                    </div>
                    <div className='text-xl'>
                        123 What Street, Ward 1,District 2, HCMC
                    </div>
                </div>
                <div className='flex flex-row gap-[144px] '>
                    <div className='text-xl font-bold pl-[270px]'>
                        Phone number:
                    </div>
                    <div className='text-xl'>
                        0989 012 345
                    </div>
                </div>
                <div className='flex flex-row gap-[214px] '>
                    <div className='text-xl font-bold pl-[270px]'>
                        Gender:
                    </div>
                    <div className='text-xl'>
                        Male
                    </div>
                </div>
                <div className='flex flex-row gap-[216px] '>
                    <div className='text-xl font-bold pl-[270px]'>
                        Dentist:
                    </div>
                    <div className='text-xl'>
                        Dr. Anh Nguyen
                    </div>
                </div>
                <div className='flex flex-row gap-[172px] '>
                    <div className='text-xl font-bold pl-[270px]'>
                        Date of visit:
                    </div>
                    <div className='text-xl'>
                        9/11/2023
                    </div>
                </div>
                <div className='flex flex-row gap-[240px] '>
                    <div className='text-xl font-bold pl-[270px]'>
                        Time:
                    </div>
                    <div className='text-xl'>
                        9AM
                    </div>
                </div>
            </div>
          <div className='flex flex-row justify-between items-center pl-20 pt-10'>
            <div className='text-xl text-white font-bold bg-red-500 text-center rounded-xl w-72 h-12 pt-2 hover:bg-red-600'>
              <button onClick={handleCancelClick}>Cancel Appointment</button>
            </div>

            <div className='flex flex-row gap-8 pr-16'>
              <button className='text-xl font-bold hover:underline'>Print</button>
              <button className='text-xl bg-cyan-blue-azure text-white font-bold rounded-xl w-36 h-12 hover:bg-cyan-500'>
              <Link to="/">
                Home
              </Link>
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <WarningPopup
            message='Are you sure you want to cancel the appointment?'
            onCancel={handleCancelPopup}
            onConfirm={handleConfirmClick}
          />
        )}
        
        {showConfirmation && (
          <ConfirmationPopup
            message='Your appointment has been cancelled'
            onConfirm={handleConfirmationConfirmClick}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
