import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import dentist1 from "../images/dentist1.png";
import dentist2 from "../images/dentist2.png";
import dentist3 from "../images/dentist3.png";
import dentist4 from "../images/dentist4.png";
import dentist5 from "../images/dentist5.png";
import dentist6 from "../images/dentist6.png";
import Form from "../components/AppointmentForm";
import dentistService from "../features/dentist/dentistServices";
export default function OurDentists() {
  const [dentists, setDentists] = useState([]);
  const [dentistImage, setDentistImage] = useState([
    dentist1,
    dentist2,
    dentist3,
    dentist4,
    dentist5,
    dentist6,
  ]);
  console.log(dentistImage);
  useEffect(() => {
    dentistService.getAllDentist().then((res) => {
      setDentists(res);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10">
        <NavBar />
        <div className="flex flex-col justify-center items-center gap-12 w-10/12">
          <div className="text-6xl font-extrabold">OUR DENTISTS</div>
          <div>
            <div className="text-4xl font-extrabold">
              Welcome to Our Dentists!
            </div>
            <div className="text-2xl pt-4">
              Meet our dedicated dental professionals, each committed to
              delivering personalized care tailored to your unique needs. With a
              passion for dentistry, our team strives to make your visit
              comfortable and enjoyable, ensuring you leave with not just a
              healthier smile but a positive dental experience. We look forward
              to the privilege of enhancing your oral health journey and
              creating a brighter, healthier smile for you. Thank you for
              choosing us – your partner in achieving and maintaining a
              confident, glowing smile!
            </div>
          </div>
          <div className="flex flex-row  flex-wrap  gap-16 justify-center">
            {dentists.map((dentist, index) => (
              <div
                className="flex flex-col gap-1 basis-1/4 justify-center items-center"
                key={index}
              >
                <img
                  src={dentistImage[index]}
                  className="w-[430px] h-[370px]"
                  alt=""
                />
                <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                  {dentist.name}
                </div>
                <div className="text-gray-500">{dentist.introduction}</div>
              </div>
            ))}
            {/* <div className="flex flex-col gap-1 items-center">
              <img src={dentist1} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.ANH NGUYEN
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <img src={dentist2} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.NGUYEN LE
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <img src={dentist3} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.SOFYAN AMRABAT
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div>
          </div>
          <div className="flex flex-row gap-16">
            <div className="flex flex-col gap-1 items-center">
              <img src={dentist4} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.KHANH NGUYEN
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <img src={dentist5} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.ISABELLA FLETCHER
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <img src={dentist6} className="w-[430px] h-[370px]" alt="" />
              <div className="text-3xl text-ebony-clay font-bold pt-5  ">
                DR.MINH NGUYEN
              </div>
              <div className="text-gray-500">General & Cosmetic Dentist</div>
            </div> */}
          </div>
        </div>
        <Form />
        <Footer />
      </div>
    </>
  );
}
