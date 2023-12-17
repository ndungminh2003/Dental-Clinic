import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return 'text-green-500';
    case 'Cancelled':
      return 'text-red-500';
    case 'Booked':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

export default function MyAppointment() {
  
  const appointment1 = {
    visitDate: '07/04/2023',
    dentist: 'Dr. Smith',
    status: 'Completed',
  };

  const appointment2 = {
    visitDate: '15/08/2023',
    dentist: 'Dr. Johnson',
    status: 'Cancelled',
  };

  const appointment3 = {
    visitDate: '15/09/2023',
    dentist: 'Dr. Johnson',
    status: 'Cancelled',
  };

  const appointment4 = {
    visitDate: '22/09/2023',
    dentist: 'Dr. Johnson',
    status: 'Booked',
  };

  const renderButtons = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <button className='hover:underline pl-14' onClick={() => handleViewDentalRecord()}>
            View details
          </button>
        );
      case 'Booked':
        return <button className='hover:underline'onClick={() => handleSeeMore()}>
          <Link to="/book-successful">See More</Link></button>;
      default:
        return null;
    }
  };

  const handleViewDentalRecord = () => {
    console.log("View details clicked");
  };

  const handleSeeMore = () => {
    console.log("See More clicked");
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center text-6xl font-extrabold pt-10 pb-10">MY APPOINTMENTS</h2>
        <h3 className=" text-4xl font-extrabold pr-[1020px] pb-4">Welcome to My Appointments</h3>
        <p className="pl-[150px] pr-[150px] text-xl pb-10">We understand the importance of your time and oral health. Here, you can effortlessly manage and track your appointments, ensuring a convenient and stress-free experience. Trust us to keep your smile healthy and schedule hassle-free. Your journey to optimal oral care starts here!</p>
        <div className="flex flex-row gap-40">
          <div className="pl-[0px]">
            <div className="text-xl font-bold ">
              My previous appointments
            </div>
            <div className="flex flex-col gap-10 h-96 overflow-y-scroll">
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>{appointment1.status}</div>
                </div>
                <div className="text-blue-hosta pl-72 text-[17px]">{renderButtons(appointment1.status)}</div>
              </div>
          
          
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]  pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold">
              My upcoming appointments
            </div>
            <div className="flex flex-col gap-10 overflow-y-scroll ">
            <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]  pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]   pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment2.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment2.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment2.status)}`}>{appointment2.status}</div>
                </div>
                <div>{renderButtons(appointment2.status)}</div>
              </div>
            <div className="border-2 border-solid border-black rounded-xl w-[500px]   pl-10 pt-5  pb-2 flex flex-col gap-4 justify-center">
              <div className="flex flex-row gap-2 text-xl">
                <div className="font-bold">Date of visit:</div>
                <div>{appointment4.visitDate}</div>
              </div>
              <div className="flex flex-row gap-2 text-xl">
                <div className="font-bold">Dentist:</div>
                <div>{appointment4.dentist}</div>
              </div>
              <div className="flex flex-row gap-2 text-xl">
                <div className="font-bold">Status:</div>
                <div className={`${getStatusStyle(appointment4.status)}`}>{appointment4.status}</div>
              </div>
              <div className="text-blue-hosta pl-[340px] text-[17px]">{renderButtons(appointment4.status)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
          <button className="bg-blue-hosta text-xl text-white font-bold w-72 h-12 rounded-xl">
            <Link to="/my-dental-record">Go to My Dental Record</Link>
          </button>
      </div>
            
    </div>

      <Footer />
    </>
  );
}
