import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";
import appointmentService from "../features/appointment/appointmentServices";
import { cancelAppointment } from "../features/appointment/appointmentSlice";

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    case "Booked":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export default function MyAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const { id } = useSelector((state) => state.auth?.user);
  useEffect(() => {
    appointmentService.getCustomerAppointment(id).then((res) => {
      setAppointments(res);
    });
  }, []);
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const appointment1 = {
    visitDate: "07/04/2023",
    dentist: "Dr. Smith",
    status: "Completed",
  };

  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  };

  const renderButtons = (status, startTime, dentistId, recordId) => {
    switch (status) {
      case "Completed":
        return (
          <button
            className="hover:underline pl-80 text-blue-hosta text-[17px]"
            onClick={() => handleViewDentalRecord(recordId)}
          >
            Views record
          </button>
        );
      case "Waiting":
        return (
          <button
            className="hover:underline pl-80 text-[17px]"
            onClick={() => handleCancelAppointment(startTime, dentistId)}
          >
            Cancel
          </button>
        );
      default:
        return null;
    }
  };

  const handleViewDentalRecord = (recordId) => {
    navigate(`/prescriptions/${recordId}`);
  };

  const handleCancelAppointment = (startTime, dentistId) => {
    dispatch(cancelAppointment({ startTime, dentistId }));
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center text-6xl font-extrabold pt-10 pb-10">
          MY APPOINTMENTS
        </h2>
        <h3 className=" text-4xl font-extrabold pr-[1020px] pb-4">
          Welcome to My Appointments
        </h3>
        <p className="pl-[150px] pr-[150px] text-xl pb-10">
          We understand the importance of your time and oral health. Here, you
          can effortlessly manage and track your appointments, ensuring a
          convenient and stress-free experience. Trust us to keep your smile
          healthy and schedule hassle-free. Your journey to optimal oral care
          starts here!
        </p>
        <div className="flex flex-row gap-40 ">
          <div className="pl-[0px]">
            <div className="text-xl font-bold w-[500px]">
              My previous appointments
            </div>
            <div className="flex flex-col gap-10 h-[820px] overflow-y-scroll">
              {appointments?.map((a) => {
                if (compareDates(a.startTime, currentDate) <= 0) {
                  return (
                    <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Date of visit:</div>
                        <div>{formatDate(a.startTime)}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Time:</div>
                        <div>
                          {formatTime(a.startTime)} - {formatTime(a.endTime)}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl">
                        <div className="font-bold">Dentist:</div>
                        <div>{a.name}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Status:</div>
                        <div className={`${getStatusStyle(a.status)}`}>
                          {a.status}
                        </div>
                      </div>
                      <div>
                        {renderButtons(
                          a.status,
                          a.startTime,
                          a.dentistId,
                          a?.recordId
                        )}
                      </div>
                    </div>
                  );
                } else return null;
              })}
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
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>

              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]  pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold w-[500px]">
              My upcoming appointments
            </div>
            <div className="flex flex-col gap-10 h-[820px] overflow-y-scroll ">
              {appointments?.map((a) => {
                if (compareDates(a.startTime, currentDate) > 0) {
                  return (
                    <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Date of visit:</div>
                        <div>{formatDate(a.startTime)}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Time:</div>
                        <div>
                          {formatTime(a.startTime)} - {formatTime(a.endTime)}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl">
                        <div className="font-bold">Dentist:</div>
                        <div>{a.name}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-xl ">
                        <div className="font-bold">Status:</div>
                        <div className={`${getStatusStyle(a.status)}`}>
                          {a.status}
                        </div>
                      </div>
                      <div>
                        {renderButtons(
                          a.status,
                          a.startTime,
                          a.dentistId,
                          a?.recordId
                        )}
                      </div>
                    </div>
                  );
                } else return null;
              })}
              <div className="border-2 border-solid border-black rounded-xl w-[500px] pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]  pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]   pl-10 pt-5 pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl ">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div>{renderButtons(appointment1.status)}</div>
              </div>
              <div className="border-2 border-solid border-black rounded-xl w-[500px]   pl-10 pt-5  pb-2 flex flex-col gap-4 justify-center">
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Date of visit:</div>
                  <div>{appointment1.visitDate}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Dentist:</div>
                  <div>{appointment1.dentist}</div>
                </div>
                <div className="flex flex-row gap-2 text-xl">
                  <div className="font-bold">Status:</div>
                  <div className={`${getStatusStyle(appointment1.status)}`}>
                    {appointment1.status}
                  </div>
                </div>
                <div className="text-blue-hosta pl-[340px] text-[17px]">
                  {renderButtons(appointment1.status)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 pb-10">
          <button className="bg-blue-hosta text-xl text-white font-bold w-72 h-12 rounded-xl">
            <Link to="/my-dental-record">Go to My Dental Record</Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
