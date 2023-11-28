import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function OurDentists() {
    return (<>
    <NavBar />
    <div className="flex flex-col pl-[500px] pr-[500px] items-center pb-28 justify-center">
    <div className="w-full flex flex-col gap-3 items-center">
        <h2 className="text-5xl font-extrabold pt-10">CONTACT US</h2>
        <i className="text-xl ">You are one step closer to the smile that you will love</i>
    </div>
    <div className="flex flex-row gap-4 pt-10">
        <div className="flex flex-col gap-6 w-80 border-solid border-2 border-gray-300 rounded-xl">
            <input type="text" name="" id="" placeholder="Your first name" className="text-xl h-12"></input>
        </div>
        <div className="flex flex-col gap-6 w-80 border-solid border-2 border-gray-300 rounded-xl">
            <input type="text" name="" id="" placeholder="Your last name" className="text-xl h-12"></input>
        </div>
    </div>
    <div className="flex flex-row gap-4 pt-4">
        <div className="flex flex-col gap-6 w-[656px] border-solid border-2 border-gray-300 rounded-xl">
            <input type="email" name="" id="" placeholder="Your email" className="text-xl h-12"></input>
        </div>
    </div>
    <div className="flex flex-row gap-4 pt-4">
        <div className="flex flex-col gap-6 w-[656px] border-solid border-2 border-gray-300 rounded-xl">
            <input type="text" name="" id="" placeholder="Your phone number" maxLength={10} className="text-xl h-12"></input>
        </div>
    </div>
    <div className="flex flex-row gap-4 pt-4">
        <div className="flex flex-col gap-6 w-[656px] border-solid border-2 border-gray-300 rounded-xl">
            <textarea rows="5" placeholder="Your message" className="text-xl" style={{ width: '100%', padding: '5px' }} />
        </div>
    </div>
    <i className="pr-24 pl-24 font-bold pt-6">WE WOULD LOVE TO EMAIL YOU HELPFUL DENTAL TIPS, SPECIAL OFFERS, AND INSIDER INFO. WE WILL ALWAYS TREAT YOUR INFORMATION WITH THE UTMOST CARE AND NEVER SHARE IT WITH ANYONE.</i>
    <div className="pt-6">
        <button className="bg-cyan-blue-azure text-white text-xl font-bold h-10 w-28 hover:bg-ebony-clay">SUBMIT</button>
    </div>
    <div className="flex flex-row gap-1 text-xl pt-2">
        <p>Or give us a call at: </p>
        <button className="text-blue-hosta font-bold hover:underline ">0989 123 456 </button>
    </div>
</div>
    <Footer />
    </>)}


