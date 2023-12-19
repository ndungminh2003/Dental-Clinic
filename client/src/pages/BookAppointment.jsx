import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Form from "../components/AppointmentForm";
import { useSelector } from "react-redux";

export default function BookAppointment() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12">
        <NavBar />
        <Form />
        <Footer />
      </div>
    </>
  );
}
