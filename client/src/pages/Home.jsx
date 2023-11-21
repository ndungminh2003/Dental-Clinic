import React, { useEffect } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import Form from "../components/AppointmentForm"
import bg_cli from "../images/dental_clinic.png"
import fb_pic from '../images/facebook.png'
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from 'aos';


export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the duration of the animation
      once: true, // Only animate once
    });
  }, []);

  return (
  <div className="flex flex-col justify-center items-center w-full">
    <NavBar />
    <div className="flex flex-row my-10 border-2 border-solid border-blue-hosta rounded-[56px] w-[1760px] h-[800px] bg-blue-hosta " data-aos="fade-up">
      <div className="flex flex-row h-full items-center ">
        <div className="text-center flex flex-col justify-center items-center gap-8">
          <h3 className="text-6xl font-extrabold uppercase pl-6">Let us brighten your smile</h3>
          <p className="text-xl pl-24 pr-24">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus, nunc et porttitor tincidunt consectetur adipiscing elit.</p>
          <button className=" text-3xl text-white font-bold bg-cyan-blue-azure rounded-lg  hover:bg-ebony-clay w-96 h-16">
            <Link to="/contact">
              Book an appointment
            </Link>
          </button>
        </div>
        <img src={bg_cli} alt="Facebook" className=" w-3/5 h-full bg-no-repeat bg-center "/>
      </div>
    </div>
    {/*Start Service*/}
    <div className="my-16 flex flex-col justify-center items-center gap-16" data-aos="fade-up">
      <div className="ml-10 flex flex-row w-9/12 gap-16">
        <div>
          <div className=" flex flex-col gap-5 w-auto">
            <span className="text-xl font-bold text-blue-hosta">Services</span>
            <h2 className="text-5xl font-bold ">Feel amazing about your oral health</h2>
          </div>
        </div>
        <div className="w-10/12">
          <p className="text-grullo py-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus, nunc et porttitor tincidunt, ipsum, onsectetur adipiscing elit. Mauris dapibus, nunc et porttitor tincidunt</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        {/* 4 khung service*/}
        <div className="flex flex-row justify-center items-center gap-20">
          <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-4 border-solid border-blue-hosta rounded-3xl pt-10">
            <div className="border-4 border-solid border-blue-hosta rounded-3xl w-40 h-64 flex justify-center items-center">
              <img src={fb_pic} alt="Facebook" className=" w-10 h-10"/>
            </div>
            <h3 className="text-xl font-bold hover:text-blue-hosta">Dentures</h3>
            <p className="text-center text-gr">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-4 border-solid border-blue-hosta rounded-3xl pt-10">
            <div className="border-4 border-solid border-blue-hosta rounded-3xl w-40 h-64 flex justify-center items-center">
              <img src={fb_pic} alt="Facebook" className=" w-10 h-10"/>
            </div>
            <h3 className="text-xl font-bold hover:text-blue-hosta">Implants</h3>
            <p className="text-center text-gr">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-4 border-solid border-blue-hosta rounded-3xl pt-10">
            <div className="border-4 border-solid border-blue-hosta rounded-3xl w-40 h-64 flex justify-center items-center">
            <img src={fb_pic} alt="Facebook" className=" w-10 h-10"/>
            </div>
            <h3 className="text-xl font-bold hover:text-blue-hosta">Root Canal</h3>
            <p className="text-center text-gr">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-4 border-solid border-blue-hosta rounded-3xl pt-10">
            <div className="border-4 border-solid border-blue-hosta rounded-3xl w-40 h-64 flex justify-center items-center">
              <img src={fb_pic} alt="Facebook" className=" w-10 h-10"/>
            </div>
            <h3 className="text-xl font-bold hover:text-blue-hosta">Teeth Whitening</h3>
            <p className="text-center text-gr">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          
        </div>
        {/* 4 khung service*/}
        <Link to="/service" className="flex items-center justify-center text-xl text-white font-bold hover:bg-ebony-clay border-2 border-solid bg-blue-hosta rounded-2xl w-60 h-14">
            View all service list
          </Link>
      </div>
      {/*End Services*/}
      {/*Testimonial*/}
        <div className="ml-10 flex flex-row w-9/12 pt-14 " data-aos="fade-up">
          <div className="w-[416px]">
            <div className="flex flex-col gap-5">
              <span className="text-xl font-bold text-blue-hosta">Testimonial</span>
              <h2 className="text-5xl font-bold">What people have said about us</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-20">
        <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-blue-hosta rounded-3xl  relative">
            <img src={fb_pic} alt="Facebook" className=" w-20 h-20 absolute top-[-15%]"/>
            <h3 className="text-2xl font-bold hover:text-blue-hosta">Adam Levine</h3>
            <p className="text-center text-xl text-grullo">Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet.</p>
            <div></div>
          </div>
          <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-blue-hosta rounded-3xl  relative">
            <img src={fb_pic} alt="Facebook" className=" w-20 h-20 absolute top-[-15%]"/>
            <h3 className="text-2xl font-bold hover:text-blue-hosta">Kylian Mbappe</h3>
            <p className="text-center text-xl text-grullo">Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet.</p>
          </div>
          <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-blue-hosta rounded-3xl  relative">
            <img src={fb_pic} alt="Facebook" className=" w-20 h-20 absolute top-[-15%]"/>
            <h3 className="text-2xl font-bold hover:text-blue-hosta">Trấn Thành</h3>
            <p className="text-center text-xl text-grullo">Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet.</p>
          </div>
        </div>
        {/*Testimonial*/}
        {/*Book appointment*/}
        <div className="ml-10 flex flex-row w-9/12 pt-20 "data-aos="fade-up">
          <div className="w-[416px]">
            <div className="flex flex-col gap-5">
              <span className="text-xl font-bold text-blue-hosta">Book Appointment</span>
            </div>
          </div>
        </div>
        <Form />
        {/*Book appointment*/}
    </div>
    
      <Footer />
    
  </div>)
  
}
