import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Form from "../components/AppointmentForm";

export default function BookAppointment() {
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
