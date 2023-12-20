import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import scheduleService from "../features/schedule/scheduleServices";
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";

const YourFormComponent = () => {
  const [dentists, setDentists] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState([]);
  const [appointmentWith, setAppointmentWith] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const { values, handleBlur, touched, errors, setFieldValue } =
    useFormikContext();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setAppointmentDate([]);
    setAppointmentTime([]);
    setAppointmentWith([]);
    setSchedules([]);
    setActiveButton(null); // Reset activeButton when radio options change
  };
  const handleDateChange = async (e) => {
    setFieldValue("date", e.target.value);
    if (!e.target.value) return;
    await scheduleService
      .getScheduleAvailableOnDay(e.target.value)
      .then((res) => {
        let times = [];
        res?.forEach((element) => {
          if (!times.includes(element.startTime)) {
            times.push(element.startTime);
          }
        });
        setAppointmentTime(times);
        setAppointmentWith([]);
        setSchedules(res);
      });
  };
  const handleDateChange2 = (e) => {
    setFieldValue("date", e.target.value);
    let times = [];
    schedules?.forEach((element) => {
      const date = formatDate(element.startTime);
      if (date === e.target.value) {
        times.push(element.startTime);
      }
    });
    setAppointmentTime(times);
  };

  const handleDentistChange = async (e) => {
    setFieldValue("dentistId", e.target.value);
    scheduleService.getDentistSchedule(e.target.value).then((res) => {
      let dates = [];
      res?.forEach((element) => {
        const date = formatDate(element.startTime);
        if (!dates.includes(date)) {
          dates.push(date);
        }
      });
      setAppointmentDate(dates);
      setAppointmentTime([]);
      setSchedules(res);
    });
  };

  const handleTimeChange = (e) => {
    setFieldValue("startTime", e.target.value);
    let dt = [];
    schedules?.forEach((element) => {
      const time = formatTime(element.startTime);
      if (time === formatTime(e.target.value)) {
        dt.push({ id: element.dentistId, name: element.name });
      }
    });
    setAppointmentWith(dt);
  };

  const handleButtonClick = (buttonNumber) => {
    if (activeButton === buttonNumber) {
      return;
    }
    setFieldValue("dentistId", appointmentWith[buttonNumber].id);
    setActiveButton(buttonNumber);
  };

  const handleButtonClick2 = (buttonNumber) => {
    if (activeButton === buttonNumber) {
      return;
    }

    setFieldValue("startTime", appointmentTime[buttonNumber]);
    setActiveButton(buttonNumber);
  };

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    scheduleService.getDentistHaveSchedule().then((res) => {
      setDentists(res || []);
    });

    const currentDate = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    const formattedCurrentDate = formatDate(currentDate);
    const formattedOneMonthLater = formatDate(oneMonthLater);

    setMinDate(formattedCurrentDate);
    setMaxDate(formattedOneMonthLater);
  }, []);

  return (
    <div className="flex flex-col justify-start items-start pl-20 pt-5">
      <label className="text-xl font-bold">
        <input
          type="radio"
          name="khamOption"
          value="chonNgay"
          checked={selectedOption === "chonNgay"}
          onChange={handleOptionChange}
        />
        Choose by Date & Hour
      </label>

      <label className="text-xl font-bold">
        <input
          type="radio"
          name="khamOption"
          value="chonBacsi"
          checked={selectedOption === "chonBacsi"}
          onChange={handleOptionChange}
        />
        Choose by Dentist
      </label>

      {selectedOption === "chonNgay" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-16 items-center justify-center pt-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">DATE</h3>
              <input
                type="date"
                id="date1"
                name="date1"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleDateChange}
                className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                min={minDate}
                max={maxDate}
              />
              {touched.date1 && errors.date1 && <div>{errors.date1}</div>}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">TIME</h3>
              <select
                id="time"
                name="time"
                value={values.startTime}
                onBlur={handleBlur}
                onChange={handleTimeChange}
                className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
              >
                <option value="" disabled selected hidden>
                  Choose time
                </option>
                {appointmentTime?.map((time, index) => (
                  <option key={index} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">DENTIST</h3>
            <div className="  text-2xl border-2 border-solid bg-white rounded-xl overflow-x-scroll ">
              <div className="flex flex-row max-w-[845px] h-20">
                {appointmentWith?.map((button, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`rounded-3xl w-[220px] flex-shrink-0  text-2xl border-2 border-solid border-blue-hosta bg-white ${
                      activeButton === index
                        ? "border-4 border-solid border-blue-hosta text-blue-hosta"
                        : "border-2 border-solid border-grullo"
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    {button.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOption === "chonBacsi" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-16 items-center justify-center pt-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">DENTIST</h3>
              <select
                id="dentistId"
                name="dentistId"
                value={values.dentistId}
                onBlur={handleBlur}
                onChange={handleDentistChange}
                className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
              >
                <option value="" disabled selected hidden>
                  Choose your dentist
                </option>
                {dentists?.map((dentist) => (
                  <option value={Number(dentist.id)}>Dr.{dentist.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">DATE</h3>
              <select
                id="date2"
                name="date2"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleDateChange2}
                className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
              >
                <option value="" disabled selected hidden>
                  Choose date
                </option>
                {appointmentDate?.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              {/* <input
                type="date"
                id="date2"
                name="date2"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleChange}
                className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                min={minDate}
                max={maxDate}
              /> */}
              {touched.date2 && errors.date2 && <div>{errors.date2}</div>}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">AVAILABLE TIME</h3>
            <div className="max-w-[845px] text-2xl border-2 border-solid bg-white rounded-xl overflow-x-scroll">
              <div className="flex flex-row">
                {appointmentTime?.map((button, index) => (
                  <button
                    type="button"
                    key={index}
                    value={button}
                    className={`rounded-3xl w-[220px] flex-shrink-0 h-[62px] text-2xl border-2 border-solid border-blue-hosta bg-white ${
                      activeButton === index
                        ? "border-4 border-solid border-blue-hosta text-blue-hosta"
                        : "border-2 border-solid border-grullo"
                    }`}
                    onClick={() => handleButtonClick2(index)}
                  >
                    {formatTime(button)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourFormComponent;
