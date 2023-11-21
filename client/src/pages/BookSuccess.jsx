import React from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import { Link } from "react-router-dom";

export default function BookSuccess(){
    return(<>
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
                <div className='flex flex-row gap-36'>
                    <div className='text-xl font-bold pl-[280px]'>
                        Name:
                    </div>
                    <div className='text-xl'>
                        Post Malone
                    </div>
                </div>
                <div className='flex flex-row gap-20'>
                    <div className='text-xl font-bold pl-[280px]'>
                        Date of birth:
                    </div>
                    <div className='text-xl'>
                        07/12/2000
                    </div>
                </div>
                <div className='flex flex-row gap-[126px]'>
                    <div className='text-xl font-bold pl-[280px]'>
                        Address:
                    </div>
                    <div className='text-xl'>
                        123 What Street, Ward 1,District 2, HCMC
                    </div>
                </div>
                <div className='flex flex-row gap-[62px] '>
                    <div className='text-xl font-bold pl-[280px]'>
                        Phone number:
                    </div>
                    <div className='text-xl'>
                        0989 012 345
                    </div>
                </div>
                <div className='flex flex-row gap-[133px] '>
                    <div className='text-xl font-bold pl-[280px]'>
                        Gender:
                    </div>
                    <div className='text-xl'>
                        Male
                    </div>
                </div>
                <div className='flex flex-row gap-[133px] '>
                    <div className='text-xl font-bold pl-[280px]'>
                        Dentist:
                    </div>
                    <div className='text-xl'>
                        Dr. Anh Nguyen
                    </div>
                </div>
                <div className='flex flex-row gap-[88px] '>
                    <div className='text-xl font-bold pl-[280px]'>
                        Date of visit:
                    </div>
                    <div className='text-xl'>
                        9/11/2023
                    </div>
                </div>
                <div className='flex flex-row gap-[156px] '>
                    <div className='text-xl font-bold pl-[280px]'>
                        Time:
                    </div>
                    <div className='text-xl'>
                        9AM
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center pl-20 pt-10'>
                <div className= 'text-xl text-white font-bold bg-red-400 text-center w-72 h-12 pt-2 hover:bg-red-600'>
                    <button>Cancel Appointment</button>
                </div>
                
                <div className='flex flex-row gap-8 pr-16'>
                    <button className='text-xl  font-bold hover:underline'>Print</button>
                    <button className='text-xl bg-cyan-blue-azure text-white font-bold w-36 h-12 hover:bg-cyan-500'>
                        <Link to="/">
                            Finish
                        </Link>
                    </button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    </>)
}