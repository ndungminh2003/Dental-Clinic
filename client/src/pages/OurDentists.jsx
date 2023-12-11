import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import profile_pic from "../images/CharliePuth.png";
import Form from "../components/AppointmentForm";

export default function OurDentists() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-20">
        <NavBar />
        <div className="flex flex-col justify-center items-center gap-16 w-[900px]">
          <div className="text-6xl font-extrabold">OUR DENTISTS</div>
          <div>
            <div className="text-2xl font-extrabold">
              Welcome to Our Dentists.
            </div>
            <div className="text-xl ">
              Meet our dedicated team of experienced and compassionate dental
              professionals committed to providing personalized care. Your oral
              health is our priority, and we look forward to creating a
              brighter, healthier smile for you
            </div>
          </div>
          <div className="flex flex-row gap-16">
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
          </div>
          <div className="flex flex-row gap-16">
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
            <a href="/our-dentist/specific-dentist/">
              <div className="flex flex-col gap-1">
                <img src={profile_pic} alt="" />
                <div className="text-3xl text-ebony-clay font-bold pt-5">
                  CHARLIE PUTH
                </div>
                <div className="text-gray-500">General & Cosmetic Dentist</div>
              </div>
            </a>
          </div>
        </div>
        <Form />
        <Footer />
      </div>
    </>
  );
}
