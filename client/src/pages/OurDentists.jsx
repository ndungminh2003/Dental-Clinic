import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import profile_pic from '../images/CharliePuth.png'
import Form from "../components/AppointmentForm"

export default function OurDentists() {
    return (<>
    <div className="flex flex-col justify-center items-center gap-10">
        <NavBar />
            <div className='flex flex-col justify-center items-center gap-16 w-10/12'>
                <div className='text-6xl font-extrabold'>OUR DENTISTS</div>
                <div >
                    <div className='text-4xl font-extrabold'>Welcome to Our Dentists!</div>
                    <div className='text-2xl '>Meet our dedicated dental professionals, each committed to delivering personalized care tailored to your unique needs. With a passion for dentistry, our team strives to make your visit comfortable and enjoyable, ensuring you leave with not just a healthier smile but a positive dental experience. We look forward to the privilege of enhancing your oral health journey and creating a brighter, healthier smile for you. Thank you for choosing us – your partner in achieving and maintaining a confident, glowing smile!</div>
                </div>
                <div className='flex flex-row gap-16'>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                </div>
                <div className='flex flex-row gap-16'>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                    <a href='/our-dentist/specific-dentist/'>
                        <div className='flex flex-col gap-1'>
                            <img src={profile_pic} alt=""/>
                            <div className='text-3xl text-ebony-clay font-bold pt-5 hover:underline'>CHARLIE PUTH</div>
                            <div className='text-gray-500'>General & Cosmetic Dentist</div>
                        </div>
                    </a>
                </div>
            </div>
            <Form />
        <Footer />
    </div>
    </>
    )}











