import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"

export default function MyAppointment() {
    return (<>
    <NavBar />
    <div className="flex flex-col justify-center items-center gap-10 pb-10">
        <div className='flex flex-col justify-center items-center gap-16 pt-20'>
            <div className='text-6xl font-extrabold'>MY APPOINTMENTS</div>
                <div>
                    <div className='text-2xl font-extrabold pl-96'>Welcome to My Appointment.</div>
                    <div className='text-xl pl-96 pr-96'>Manage your dental visits with ease. Schedule, reschedule, or cancel appointments, view upcoming visits, and access your dental records. We're here to make your oral health care convenient. Thank you for choosing us for your dental needs!</div>
                </div>
            </div>
        <div className="pr-[850px] text-xl font-bold">
            My previous appointments
        </div>
        <div className="flex flex-col">
            <div>
                Date of visit: 09/08/2023
            </div>
        </div>
            
        
    </div>
    <Footer />
    
    
    </>)}