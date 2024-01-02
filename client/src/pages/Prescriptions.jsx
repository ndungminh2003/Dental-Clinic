import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import patientRecordService from "../features/patientRecord/patientRecordServices";
import prescribeMedicineService from "../features/prescribeMedicine/prescribeMedicineServices";
import serviceUseService from "../features/serviceUse/serviceUseServices";
import { useSelector } from "react-redux";
import formatDate from "../utils/formatDate";

export default function Prescriptions() {
  const location = useLocation();
  const recordId = location.pathname.split("/")[2];
  const [patientRecord, setPatientRecord] = useState([
    {
      date_time: "",
      diagnostic: "",
      dentistId: "",
      id: "",
      patientId: "",
      symptom: "",
    },
  ]);
  const { user } = useSelector((state) => state.auth);
  console.log(patientRecord);
  let [medicines, setMedicines] = useState([]);

  let [services, setServices] = useState([]);
  console.log(medicines, services);
  const totalMedicinePrice = medicines.reduce(
    (total, medicine) => total + medicine.price,
    0
  );

  const totalServicePrice = services.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalPrice = totalMedicinePrice + totalServicePrice;
  useEffect(() => {
    patientRecordService
      .getOnePatientRecord(recordId)
      .then((res) => setPatientRecord(res || []));
    prescribeMedicineService
      .getPrescribeMedicineByRecordId(recordId)
      .then((res) => setMedicines(res || []));
    serviceUseService
      .getServiceUseByRecordId(recordId)
      .then((res) => setServices(res || []));
  }, []);
  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8 p-8 bg-white shadow-xl text-center">
        <h2 className="text-4xl font-semibold mb-4 pb-7">
          Dental Prescription
        </h2>
        <div className="flex flex-col pl-20">
          <div className="flex flex-row gap-[130px] text-xl pb-2">
            <div className="font-bold">Patient's name: </div>
            <div className="">{user.name}</div>
          </div>
          <div className="flex flex-row gap-[162px] text-xl pb-2">
            <div className="font-bold">Patient's ID: </div>
            <div className="">{user.id}</div>
          </div>

          <div className="flex flex-row gap-[153px] text-xl pb-2">
            <div className="font-bold">Date of birth:</div>
            <div className="">{formatDate(user.birthday)}</div>
          </div>
          <div className="flex flex-row gap-[166px] text-xl pb-2">
            <div className="font-bold">Symptoms:</div>
            <div className="">{patientRecord[0].symptom}</div>
          </div>
          <div className="flex flex-row gap-[173px] text-xl pb-2">
            <div className="font-bold">Diagnosis:</div>
            <div className="">{patientRecord[0].diagnostic}</div>
          </div>
          <div className="flex flex-row gap-[160px] text-xl pb-2">
            <div className="font-bold">Dentist's ID: </div>
            <div className="">{patientRecord[0].dentistId}</div>
          </div>
          <div className="flex flex-row gap-[156px] text-xl pb-8">
            <div className="font-bold">Date of visit:</div>
            <div className="">{formatDate(patientRecord[0].date_time)}</div>
          </div>
        </div>

        <div className="w-full text-xl">
          <div className="bg-gray-200 flex flex-row justify-between px-4 py-2 font-bold">
            <div className="flex-1">Order</div>
            <div className="flex-1">Medicine</div>
            <div className="flex-1">Quantity</div>
            <div className="flex-1">Price</div>
          </div>

          {medicines.map((medicine, idx) => (
            <div key={idx} className="flex flex-row justify-between px-4 py-2">
              <div className="flex-1">{idx + 1}</div>
              <div className="flex-1">{medicine.medicineName}</div>
              <div className="flex-1">{medicine.quantity}</div>
              <div className="flex-1">${medicine.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto  p-8 bg-white shadow-xl text-center">
        <div className="w-full text-xl">
          <div className="bg-gray-200 flex flex-row justify-between px-4 py-2 font-bold">
            <div className="flex-1">Order</div>
            <div className="flex-1">Service</div>
            <div className="flex-1">Quantity</div>
            <div className="flex-1">Price</div>
          </div>

          {services.map((service, idx) => (
            <div key={idx} className="flex flex-row justify-between px-4 py-2">
              <div className="flex-1">{idx + 1}</div>
              <div className="flex-1">{service.serviceName}</div>
              <div className="flex-1">1</div>
              <div className="flex-1">${service.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center pt-5 pl-40">
        <div className="text-2xl font-semibold">Advice: </div>
        <div className="text-xl">
          {" "}
          Brush your teeth 3 times a day, avoid eating much sugary food
        </div>
      </div>

      <div className="container mx-auto my-8 p-8 bg-white shadow-xl flex flex-row justify-evenly gap-[822px]">
        <h2 className="text-3xl font-bold">TOTAL:</h2>
        <div className="text-2xl ">${totalPrice.toFixed(2)}</div>
      </div>

      <Footer />
    </>
  );
}
