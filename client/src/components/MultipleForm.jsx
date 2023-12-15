import React, { useState, useEffect } from "react";

const YourFormComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setActiveButton(null); // Reset activeButton when radio options change
  };

  const buttonsContent1 = [
    { time: '9:00AM'},
    { time: '10:00AM'},
    { time: '3:00PM'},
    { time: '4:00PM'},
  ];

  const buttonsContent2 = [
    { dentist: 'Dr. Anh Nguyen'},
    { dentist: 'Dr. Khanh Nguyen'},
    { dentist: 'Dr. Minh Nguyen'},
    { dentist: 'Dr. Nguyen Le'},
    { dentist: 'Dr. Unknown'},
    { dentist: 'Dr. NoName'},
  ];

  const handleButtonClick = (buttonNumber) => {
    // If the button is already active, do nothing
    if (activeButton === buttonNumber) {
      return;
    }

    // Set the state for the selected button
    setActiveButton(buttonNumber);
  };

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    // Format the date as YYYY-MM-DD
    const formattedCurrentDate = formatDate(currentDate);
    const formattedOneMonthLater = formatDate(oneMonthLater);

    setMinDate(formattedCurrentDate);
    setMaxDate(formattedOneMonthLater);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className='flex flex-col justify-start items-start pl-20 pt-5'>
      <label className='text-xl font-bold'>
        <input
          type="radio"
          name="khamOption"
          value="chonNgay"
          checked={selectedOption === "chonNgay"}
          onChange={handleOptionChange}
        />
        Choose by Date & Hour
      </label>

      <label className='text-xl font-bold'>
        <input
          type="radio"
          name="khamOption"
          value="chonBacsi"
          checked={selectedOption === "chonBacsi"}
          onChange={handleOptionChange}
        />
        Choose by Dentist
      </label>

      {selectedOption === "chonBacsi" && (
        <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-16 items-center justify-center pt-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">DATE</h3>
            <input
                  type="date"
                  className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                  min={minDate}
                  max={maxDate}
                />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">DENTIST</h3>
            <select name="" className='rounded-xl w-[390px] h-[48px] text-2xl text-center'>
              <option>Dr.Anh Nguyen</option>
              <option>Dr.Khanh Nguyen</option>
              <option>Dr.Minh Nguyen</option>
              <option>Dr.Nguyen Le</option>
              <option>Dr.Unknown</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
  <h3 className="font-bold text-2xl">AVAILABLE TIME</h3>
  <div className="max-w-[845px] text-2xl border-2 border-solid bg-white rounded-xl overflow-x-scroll">
    <div className="flex flex-row">
      {buttonsContent1.map((button, index) => (
        <button
          key={index}
          className={`rounded-3xl w-[220px] flex-shrink-0 h-[62px] text-2xl border-2 border-solid border-blue-hosta bg-white ${
            activeButton === index
              ? 'border-4 border-solid border-blue-hosta text-blue-hosta'
              : 'border-2 border-solid border-grullo'
          }`}
          onClick={() => handleButtonClick(index)}
        >
          {button.time}
        </button>
      ))}
    </div>
  </div>
</div>
      </div>
      )}

      {selectedOption === "chonNgay" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-16 items-center justify-center pt-4">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">DATE</h3>
              <input
                  type="date"
                  className="rounded-xl w-[390px] h-[48px] text-2xl text-center"
                  min={minDate}
                  max={maxDate}
                />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl">TIME</h3>
              <input type="time" className="rounded-xl w-[390px] h-[48px] text-2xl pl-12 text-center" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">DENTIST</h3>
            <div className="  text-2xl border-2 border-solid bg-white rounded-xl overflow-x-scroll ">
              <div className='flex flex-row max-w-[845px] h-20'>
                {buttonsContent2.map((button, index) => (
                  <button
                    key={index}
                    className={`rounded-3xl w-[220px] flex-shrink-0  text-2xl border-2 border-solid border-blue-hosta bg-white ${
                      activeButton === index ? 'border-4 border-solid border-blue-hosta text-blue-hosta font-bold' : 'border-2 border-solid border-grullo'
                    }`}
                    onClick={() => handleButtonClick(index)}
                  >
                    {button.dentist}
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


