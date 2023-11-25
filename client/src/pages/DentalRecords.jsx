import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
export default function DentalRecords() {
    return ( <>
    <NavBar />
    <div className='flex flex-col pl-[450px] pr-[450px] pb-16'>
        <div className="flex items-center">
            <div className="w-full max-w-3xl mx-auto pt-20">
            <h2 className="text-center text-5xl font-extrabold pb-10">MY DENTAL RECORDS</h2>
            </div>
        </div>
        <div className='flex flex-col gap-6'>
            <div>
                <h3 className='font-bold text-3xl'>Welcome to My Dental Records</h3>
                <div className='text-2xl'>Here, you can easily review your dental treatment history and procedures. This dental records provides detailed information about past treatments, enabling you to  maintain better oral health.</div>
                <br></br>
                <div className=' text-2xl'>Let's begin exploring your Dental Records and learn more about your dental health!</div>
            </div>
            <input type="search" placeholder="Search for dental records..." className='h-12 w-11/12 rounded-xl border-2 border-solid border-black text-2xl pl-10'></input>
        </div>
        <div>FILTER</div>
        <div className='flex flex-col gap-10 overflow-y-scroll h-80 pt-20 w-full'>
            <div className='border-2 border-solid border-black rounded-xl w-11/12 pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center'>
                <div className='font-bold text-3xl'>
                    TOOTH DECAY
                </div>
                <div className='flex flex-row gap-56 text-2xl'>
                    <div className='flex flex-row gap-2 '>
                        <div className='font-bold'> Date of visit:</div>
                        <div>20/10/2023</div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="font-bold">Dentist:</div>
                        <div>Dr.Anh Nguyen</div>
                    </div>
                </div>
                <div className='flex flex-row gap-[400px] text-2xl'>
                    <div className='flex flex-row gap-2 '>
                        <div className="font-bold">Service:</div>
                        <div>Tooth Extraction</div>
                    </div>
                </div>
                <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-20 '>See more</button>
            </div>
            <div className='border-2 border-solid border-black rounded-xl w-11/12 pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center'>
                <div className='font-bold text-3xl'>
                    TOOTH DECAY
                </div>
                <div className='flex flex-row gap-56 text-2xl'>
                    <div className='flex flex-row gap-2 '>
                        <div className='font-bold'> Date of visit:</div>
                        <div>20/10/2023</div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="font-bold">Dentist:</div>
                        <div>Dr.Anh Nguyen</div>
                    </div>
                </div>
                <div className='flex flex-row gap-[400px] text-2xl'>
                    <div className='flex flex-row gap-2 '>
                        <div className="font-bold">Service:</div>
                        <div>Tooth Extraction</div>
                    </div>
                </div>
                <button className='text-blue-hosta hover:underline text-xl flex flex-row justify-end pr-20 '>See more</button>
            </div>
        </div>
        
    </div>
    <Footer />
    </>)
}