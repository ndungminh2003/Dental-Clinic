import React from "react";
import { Link } from "react-router-dom";
import fb_pic from '../images/facebook.png'
import Logo from '../images/logo.png'
import ig_pic from '../images/instagram.png'
import tw_pic from '../images/twitter.png'
import phone from '../images/phone.png'
import clock from '../images/clock.png'
import address from '../images/address.png'

export default function Footer() {
    return (
    <>
    <div className="flex bg-yankees-blue justify-evenly items-center h-80 w-full">
      <div className="container mx-auto grid grid-cols-3 gap-4 py-3 justify-items-center p-6">
      <div className=" flex flex-col gap-7 ">
        <div className="flex flex-row">
        <div><img
              src={Logo}
              alt="Facebook"
              className=" w-12 h-12 cursor-pointer "
            />
            </div>
            <p className=" ml-2 flex items-center text-2xl text-white text-grullo font-extrabold" >DentalCare</p>
        </div>
          <div className="flex flex-col gap-4">
            <p className=" ml-2 text-white">Follow us on:</p>

          <div className="flex gap-4 items-center ml-2">
            <img
              src={fb_pic}
              alt="Facebook"
              className=" w-8 h-8 cursor-pointer "
            />
            <img
              src={ig_pic}
              alt="Instagram"
              className=" w-8 h-8 cursor-pointer "
            />
            <img
              src={tw_pic}
              alt="Twitter"
              className=" w-8 h-8 cursor-pointer "
            />
            
          </div>
          </div>
          
          <div className="text-white ">
                <h2>©DentalCare 2023. All Rights Reserved</h2>
            </div>
        </div>
        <div className=" flex flex-col gap-5  text-white">
          <h1 className="flex justify-center font-extrabold">QUICK LINKS</h1>
          <Link to="/contact-us" className=" cursor-pointer ml-2 hover:underline">Contact Us</Link>
          <Link to="/service" className=" cursor-pointer ml-2 hover:underline">Dental Services</Link>
          <Link to="/our-dentist" className=" cursor-pointer ml-2 hover:underline">Dentists</Link>
          <p className=" cursor-pointer ml-2 hover:underline">FAQs</p>
        </div>

        <div className=" flex flex-col gap-3 justify-center ">
          <h1 className="font-extrabold text-white">CONTACT & INFORMATION</h1>
          <div className="flex flex-row items-center gap-1">
            <div className=" w-12 h-12 bg-white rounded-xl flex justify-center items-center ">
              <img src={phone} alt="Facebook" className="w-10 h-10 "/>
            </div>
            <div className="flex flex-col ">
                <p className="  ml-2 text-white">Phone number</p>
                <p className="  ml-2 text-white text-xl">0989 123 456</p>
            </div>
          </div>
          
          <div className="flex flex-row items-center gap-1 ">
            <div className=" w-12 h-12 bg-white rounded-xl flex justify-center items-center ">
              <img src={clock} alt="Facebook" className="w-10 h-10 "/>
            </div>
            
            <div className="flex flex-col ">
                <p className="  ml-2 text-white">Opening Hour</p>
                <p className="  ml-2 text-white text-xl">07:30 AM - 17:10 PM</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className=" w-12 h-12 bg-white rounded-xl flex justify-center items-center ">
              <img src={address} alt="Facebook" className="w-10 h-10 "/>
            </div>
            <div className="flex flex-col ">
                <p className="  ml-2 text-white">Clinic Address</p>
                <p className="  ml-2 text-white text-xl">227 Nguyen Van Cu, Ward 4, District 10, HCMC</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
    </>);
}