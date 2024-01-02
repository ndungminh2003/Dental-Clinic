import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";

export default function BookFailed() {
  const sendAppointment = JSON.parse(localStorage.getItem("appointment")) || "";

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-16">
        <NavBar />
        <div className=" bg-mercury rounded-[60px] w-[1000px] h-[620px] ">
          <div className="flex flex-col items-center gap-5">
            <div className="pt-10 text-5xl font-bold ">
              Booking Appointment Failed
            </div>
            <div className="text-red-500 font-bold text-2xl">
              Sorry, the time you booked is not available anymore
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-10">
            <div className="flex flex-row gap-36">
              <div className="text-xl font-bold pl-[280px]">Name:</div>
              <div className="text-xl">{sendAppointment.name}</div>
            </div>
            <div className="flex flex-row gap-20">
              <div className="text-xl font-bold pl-[280px]">Date of birth:</div>
              <div className="text-xl">
                {formatDate(sendAppointment.birthday)}
              </div>
            </div>
            <div className="flex flex-row gap-[126px]">
              <div className="text-xl font-bold pl-[280px]">Address:</div>
              <div className="text-xl">{sendAppointment.address}</div>
            </div>
            <div className="flex flex-row gap-[62px] ">
              <div className="text-xl font-bold pl-[280px]">Phone number:</div>
              <div className="text-xl">{sendAppointment.phone}</div>
            </div>
            <div className="flex flex-row gap-[133px] ">
              <div className="text-xl font-bold pl-[280px]">Gender:</div>
              <div className="text-xl">{sendAppointment.gender}</div>
            </div>
            <div className="flex flex-row gap-[133px] ">
              <div className="text-xl font-bold pl-[280px]">Dentist:</div>
              <div className="text-xl">Dr. Anh Nguyen</div>
            </div>
            <div className="flex flex-row gap-[88px] ">
              <div className="text-xl font-bold pl-[280px]">Date of visit:</div>
              <div className="text-xl">
                {formatDate(sendAppointment.startTime)}
              </div>
            </div>
            <div className="flex flex-row gap-[156px] ">
              <div className="text-xl font-bold pl-[280px]">Time:</div>
              <div className="text-xl">
                {formatTime(sendAppointment.startTime)}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center pl-20 pt-10">
            <div className="flex flex-row gap-8 pr-16">
              <Link to="/book-appointment">
                <button className="text-xl bg-red-400 text-white font-bold w-36 h-12 hover:bg-red-500">
                  Book again
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
