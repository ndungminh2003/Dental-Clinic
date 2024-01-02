import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import serviceService from "../features/service/serviceServices";
import dental_pic1 from "../images/dental-vector-free-icon-set-02.png";
export default function Services() {
  const customStyle = {
    lineHeight: "1.75", // Adjust the value based on your preference
  };
  const [services, setServices] = useState([]);
  useEffect(() => {
    serviceService.getAllService().then((res) => setServices(res));
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex flex-row gap-40 justify-center items-center pl-60 pr-40 py-36">
        <div className="flex flex-col gap-10 w-[840px]">
          <div className="text-8xl">Cosmetic Dentistry</div>
          <div className="text-xl pt-10 font-thin" style={customStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 flex-wrap">
              {services.map((sv) => (
                <div className="w-fit p-5 h-10 bg-gray-100 text-center pt-2 hover:bg-blue-500 hover:text-white transition duration-200 rounded-xl">
                  {sv.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <img
          src={dental_pic1}
          alt=""
          className="flex justify-end items-end w-[440px] h-[440px] "
        />
      </div>

      <Footer />
    </>
  );
}
