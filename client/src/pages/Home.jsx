import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Form from "../components/AppointmentForm";
import bg_home1 from "../images/home1.png";
import bg_home2 from "../images/home2.png";
import bg_home3 from "../images/home3.png";
import bg_home4 from "../images/home4.png";
import bg_home5 from "../images/home5.png";
import fb_pic from "../images/facebook.png";
import { Link } from "react-router-dom";
import serviceService from "../features/service/serviceServices";
import "aos/dist/aos.css";
import AOS from "aos";

const homePageService = [
  "Tẩy trắng răng",
  "Chẩn đoán nha khoa",
  "Tháo lắp răng",
  "Làm răng sứ",
];

const serviceImgURLS = [
  "https://nhakhoadalat.com/wp-content/uploads/2020/05/quy-trinh-kham-rang-mieng-tong-quat.png",
  "https://nhakhoacheese.vn/wp-content/uploads/2022/08/tay-trang-rang_taimuihongsg.jpeg",
  "https://nhakhoaquoctevietsing.com.vn/wp-content/uploads/2019/08/nhung-truong-hop-chi-dinh-va-chong-chi-dinh-nho-rang-trong-nha-khoa.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQ9fB1qM46-u6BvMOwEO-_m6sgoGIyhkm-6l8Oop5tXzVfu-kJ58gYqYOd3Ln6oev1QA&usqp=CAU",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [services, setService] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const images = [bg_home1, bg_home2, bg_home3, bg_home4, bg_home5];
  const totalImages = images.length;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    serviceService.getAllService().then((res) => {
      let rs = res.filter((sv) => {
        if (homePageService.includes(sv.name)) return sv;
      });
      rs.forEach((element, index) => {
        element.image = serviceImgURLS[index];
      });
      setService(rs);
    });
  }, []);
  console.log(services);
  useEffect(() => {
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      setDirection(1); // Set direction to right
    };

    const intervalId = setInterval(nextImage, 6000);

    return () => clearInterval(intervalId);
  }, [totalImages]);

  const changeImage = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex(index);
    setDirection(newDirection);
  };

  const contentPhrases = [
    [
      "Our dental practice is convenient for all our surrounding communities.",
      "Your comfort and well being are our top priority.",
    ],
    ["We have a team of experienced dentists that you can totally rely on."],
    [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur velit esse cillum dolore.",
    ],
    [
      "Excepteur sint occaecat cupidatat non proident,",
      "sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    ["Contact us now for your loving smile!"],
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <NavBar />
      <div className="flex flex-row " data-aos="fade-up">
        <div className="flex flex-row h-full items-center relative">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative ${
                currentIndex === index ? "block" : "hidden"
              }`}
            >
              <img
                src={image}
                alt={`Slider ${index + 1}`}
                className={`w-[2400px] h-[1000px] object-cover bg-no-repeat bg-center transition-transform duration-1000 transform translate-x-${
                  direction === 1 ? "-full" : "full"
                }`}
                style={{ filter: "brightness(60%)" }}
              />

              {/* Left Arrow Button */}
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-4xl flex justify-center items-center text-white bg-blue-hosta p-2 cursor-pointer rounded-full"
                onClick={() =>
                  changeImage((currentIndex - 1 + totalImages) % totalImages)
                }
              >
                &#8249;
              </button>

              {/* Right Arrow Button */}
              <button
                className="absolute top-1/2 right-0 transform  -translate-y-1/2 text-4xl flex justify-center items-center text-white bg-blue-hosta p-2 cursor-pointer rounded-full"
                onClick={() => changeImage((currentIndex + 1) % totalImages)}
              >
                &#8250;
              </button>

              {/* Dots representing images */}
              <div className="absolute bottom-6 right-[860px] transform -translate-x-1/2 flex gap-2">
                {images.map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`h-3 w-3 rounded-full ${
                      currentIndex === dotIndex
                        ? "bg-blue-hosta"
                        : "bg-gray-300"
                    } cursor-pointer`}
                    onClick={() => changeImage(dotIndex)}
                  />
                ))}
              </div>

              <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-center text-white ">
                {contentPhrases[index].map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={`${
                      lineIndex === 0
                        ? "text-5xl font-montserrat"
                        : "text-3xl font-sans-mono"
                    } text-white w-[1600px]`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {index === 0 && (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="text-3xl text-white font-bold bg-cyan-blue-azure rounded-lg hover:bg-ebony-clay w-96 ">
                    <Link to="/book-appointment">Book an appointment</Link>
                  </button>
                </div>
              )}

              {index === 1 && (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="text-3xl text-white font-bold bg-cyan-blue-azure rounded-lg hover:bg-ebony-clay w-96 h-16">
                    <Link to="/see-more">Find out more</Link>
                  </button>
                </div>
              )}
              {index === 4 && (
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="text-3xl text-white font-bold bg-cyan-blue-azure rounded-lg hover:bg-ebony-clay w-96 h-16">
                    <Link to="/see-more">Contact us now</Link>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/*Start Service*/}
      <div
        className="my-16 flex flex-col justify-center items-center gap-16"
        data-aos="fade-up"
      >
        <div className="ml-10 flex flex-row w-9/12 gap-16">
          <div>
            <div className=" flex flex-col gap-5 w-auto">
              <span className="text-xl font-bold ">Services</span>
              <h2 className="text-5xl font-bold ">
                Feel amazing about your oral health
              </h2>
            </div>
          </div>
          <div className="w-10/12">
            <p className="text-grullo py-14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              dapibus, nunc et porttitor tincidunt, ipsum, onsectetur adipiscing
              elit. Mauris dapibus, nunc et porttitor tincidunt
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-16">
          {/* 4 khung service*/}
          <div className="flex flex-row justify-center items-center gap-20">
            {services.map((sv) => (
              <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-2 border-solid border-black rounded-3xl pt-10">
                <div className="border-2 border-solid border-black rounded-3xl w-40 h-64 flex justify-center items-center">
                  <img
                    src={sv.image}
                    alt="Facebook"
                    className=" w-full h-full rounded-3xl"
                  />
                </div>
                <h3 className="text-xl font-bold">{sv.name}</h3>
                <p className="text-center text-gr">{sv.description}</p>
              </div>
            ))}
            {/* <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-2 border-solid border-black rounded-3xl pt-10">
              <div className="border-2 border-solid border-black rounded-3xl w-40 h-64 flex justify-center items-center">
                <img src={fb_pic} alt="Facebook" className=" w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold">Dentures</h3>
              <p className="text-center text-gr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-2 border-solid border-black rounded-3xl pt-10">
              <div className="border-2 border-solid border-black rounded-3xl w-40 h-64 flex justify-center items-center">
                <img src={fb_pic} alt="Facebook" className=" w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold ">Implants</h3>
              <p className="text-center text-gr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-2 border-solid border-black rounded-3xl pt-10">
              <div className="border-2 border-solid border-black rounded-3xl w-40 h-64 flex justify-center items-center">
                <img src={fb_pic} alt="Facebook" className=" w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold ">Root Canal</h3>
              <p className="text-center text-gr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-[260px] h-80 gap-4 border-2 border-solid border-black rounded-3xl pt-10">
              <div className="border-2 border-solid border-black rounded-3xl w-40 h-64 flex justify-center items-center">
                <img src={fb_pic} alt="Facebook" className=" w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold ">Teeth Whitening</h3>
              <p className="text-center text-gr">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div> */}
          </div>
          {/* 4 khung service*/}
          <Link
            to="/service"
            className="flex items-center justify-center text-xl text-white font-bold hover:bg-ebony-clay border-2 border-solid bg-blue-hosta rounded-2xl w-60 h-14"
          >
            View all service list
          </Link>
        </div>
        {/*End Services*/}
        {/*Testimonial*/}
        <div className="ml-10 flex flex-col gap-20 w-[1740px] h-[600px] pt-14 bg-blue-hosta rounded-3xl">
          <div className="flex flex-row " data-aos="fade-up">
            <div className="flex flex-col gap-5 pl-48">
              <span className="text-xl font-bold">Testimonial</span>
              <h2 className="text-5xl font-bold pr-[1100px]">
                What people have said about us
              </h2>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-20">
            <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-black rounded-3xl bg-white relative">
              <img
                src={fb_pic}
                alt="Facebook"
                className=" w-20 h-20 absolute top-[-15%]"
              />
              <h3 className="text-2xl font-bold hover:text-blue-hosta">
                Adam Levine
              </h3>
              <p className="text-center text-xl text-grullo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                sit amet.
              </p>
              <div></div>
            </div>
            <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-black rounded-3xl bg-white   relative">
              <img
                src={fb_pic}
                alt="Facebook"
                className=" w-20 h-20 absolute top-[-15%]"
              />
              <h3 className="text-2xl font-bold hover:text-blue-hosta">
                Kylian Mbappe
              </h3>
              <p className="text-center text-xl text-grullo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                sit amet.
              </p>
            </div>
            <div className="flex flex-col pt-20 items-center w-[400px] h-[290px] gap-5 border-4 border-solid border-black rounded-3xl bg-white  relative">
              <img
                src={fb_pic}
                alt="Facebook"
                className=" w-20 h-20 absolute top-[-15%]"
              />
              <h3 className="text-2xl font-bold hover:text-blue-hosta">
                Trấn Thành
              </h3>
              <p className="text-center text-xl text-grullo">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                sit amet.
              </p>
            </div>
          </div>
        </div>
        {/*Testimonial*/}
        {/*Book appointment*/}
        <div className="ml-10 flex flex-row w-9/12 pt-20 " data-aos="fade-up">
          <div className="w-[416px]">
            <div className="flex flex-col gap-5">
              <span className="text-xl font-bold text-blue-hosta">
                Book Appointment
              </span>
            </div>
          </div>
        </div>
        <Form />
        {/*Book appointment*/}
      </div>

      <Footer />
    </div>
  );
}
