import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Services(){
    return(<>
    <NavBar />
    <div class="flex flex-col justify-center pl-[450px] pr-[450px] items-center gap-5">
        <div class="w-full flex items-center">
            <div class="w-full max-w-3xl mx-auto pt-10">
            <h2 class="text-center text-5xl font-extrabold pb-7">SERVICES</h2>
            </div>
        </div>
        <div class="text-xl ">Our operations team is on hand to support you through each step of your journey, from finding the right appointment time to coordinating with specialists. We’re excited to take care of your teeth, but you’re not just your smile. You’re a whole person, and we provide whole-person service. Here are some of the ways we can take care of you:</div>
        <div class="flex flex-row gap-12 pb-6">
            <div class="flex flex-col gap-6">
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
            </div>
        
            <div class="flex flex-col gap-6">
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
                <div class="w-80 h-28 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                    <div class="text-2xl">IMPLANTS</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing lorem interdum sagittis. </div>
                </div>
            </div>
        </div>
        <p>Book an appointment with just a few clicks. Or, give us a ring to learn more about our offerings</p>
        <div>
            <button class="bg-cyan-blue-azure text-white text-xl font-bold h-16 w-72 rounded-xl">
                <Link to="/book-appointment">Book an appointment</Link></button>
        </div>
        <div class="flex flex-row gap-1 text-xl pb-10"><p>Give us a call at: </p>
            <button class="text-blue-hosta font-bold hover:underline ">0989 123 456 </button>
        </div>
    </div>

    <Footer />
    </>)
}

