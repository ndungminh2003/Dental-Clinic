import React from 'react'
import Filter from '../components/Filter'
export default function DentalRecords() {
    return ( 
    <div className='flex flex-col w-1/2'>
        <div className="w-full flex items-center">
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
        <Filter />
    </div>)
}