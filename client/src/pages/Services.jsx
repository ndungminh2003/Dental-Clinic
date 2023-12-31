import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import serviceService from "../features/service/serviceServices";
export default function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    serviceService.getAllService().then((res) => setServices(res));
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center pl-[100px] pr-[100px] items-center gap-6">
        <div className="w-full flex items-center">
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-center text-6xl pt-10 font-extrabold pb-7">
              SERVICES
            </h2>
          </div>
        </div>
        <i className="text-2xl pb-10 ">
          Our operations team is on hand to support you through each step of
          your journey, from finding the right appointment time to coordinating
          with specialists. We’re excited to take care of your teeth, but you’re
          not just your smile. You’re a whole person, and we provide
          whole-person service. Here are some of the ways we can take care of
          you:
        </i>
        <div className="flex flex-col gap-8 pb-6 flex-wrap">
          <div className="flex flex-row gap-6 flex-wrap">
            {services.map((sv) => (
              <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
                <div className="text-3xl font-bold">{sv.name}</div>
                <div>{sv.description}</div>
              </div>
            ))}
            {/* <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-3xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
            <div className="w-80 h-36 border-2 border-black border-solid bg-mercury flex flex-col justify-center text-center rounded-2xl">
              <div className="text-2xl font-bold">IMPLANTS</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing lorem
                interdum sagittis.{" "}
              </div>
            </div>
          </div> */}
          </div>
        </div>
        <p className="text-xl">
          Book an appointment with just a few clicks. Or, give us a ring to
          learn more about our offerings
        </p>
        <div>
          <button className="bg-cyan-blue-azure text-white text-xl font-bold h-16 w-72 rounded-xl hover:bg-blue-800">
            <Link to="/book-appointment">Book an appointment</Link>
          </button>
        </div>
        <div className="flex flex-row gap-1 text-xl pb-10">
          <p>Give us a call at: </p>
          <button className="text-blue-hosta font-bold hover:underline ">
            0989 123 456{" "}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
