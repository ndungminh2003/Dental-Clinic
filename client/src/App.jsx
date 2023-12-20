import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import UserLogin from "./pages/Login/UserLogin";
import SignUp from "./pages/SignUp";

import Dentist from "./pages/Dentist/Dentist";
import DentistLogin from "./pages/Login/DentistLogin";
import DAddAppointments from "./pages/Dentist/pages/AddAppointments";
import DAllAppointments from "./pages/Dentist/pages/AllAppointments";
import DAppointment from "./pages/Dentist/pages/Appointment";
import DProfile from "./pages/Dentist/pages/Profile";

import Staff from "./pages/Staff/Staff";
import StaffLogin from "./pages/Login/StaffLogin";
import SAddAppointments from "./pages/Staff/pages/AddAppointments";
import SAllAppointments from "./pages/Staff/pages/AllAppointments";
import SAppointment from "./pages/Staff/pages/Appointment";
import PatienRecords from "./pages/Staff/pages/PatienRecords";
import SProfile from "./pages/Staff/pages/Profile";

import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Login/AdminLogin";
import Medication from "./pages/Admin/pages/Medication";
import AddMedication from "./pages/Admin/pages/AddMedications";
import AllMedication from "./pages/Admin/pages/AllMedications";
import UserManagement from "./pages/Admin/pages/UserManagement";
import AddUser from "./pages/Admin/pages/AddUser";
import AllUsers from "./pages/Admin/pages/AllUsers";
import Service from "./pages/Admin/pages/Service";
import AllService from "./pages/Admin/pages/AllService";
import AddService from "./pages/Admin/pages/AddService";

import Profile from "./pages/Profile";
import BookAppointment from "./pages/BookAppointment";
import OurDentists from "./pages/OurDentists";
import SpecificDentists from "./pages/SpecificDentist";
import MyAppointment from "./pages/MyAppointments";
import BookSuccess from "./pages/BookSuccess";
import BookFailed from "./pages/BookFailed";
import DentalRecords from "./pages/DentalRecords";
import Services from "./pages/Services";
import Prescriptions from "./pages/Prescriptions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/contact-us" element={<ContactUs />}></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/dentist" element={<Dentist />}>
        <Route path="login" element={<DentistLogin />}></Route>
      </Route>

      <Route path="dentist/login" element={<DentistLogin />}></Route>
      <Route path="/dentist" element={<Dentist />}>
        <Route path="profile" element={<DProfile />}></Route>
        <Route path="appointment" element={<DAppointment />}>
          <Route path="add" element={<DAddAppointments />}></Route>
          <Route path="all" element={<DAllAppointments />}></Route>
        </Route>
      </Route>

      <Route path="staff/login" element={<StaffLogin />}></Route>
      <Route path="/staff" element={<Staff />}>
        <Route path="profile" element={<SProfile />}></Route>
        <Route path="appointment" element={<SAppointment />}>
          <Route path="add" element={<SAddAppointments />}></Route>
          <Route path="all" element={<SAllAppointments />}></Route>
        </Route>
        <Route path="record" element={<PatienRecords />}></Route>
      </Route>

      <Route path="admin/login" element={<AdminLogin />}></Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="service" element={<Service />}>
          <Route path="add" element={<AddService />}></Route>
          <Route path="all" element={<AllService />}></Route>
        </Route>
        <Route path="medication" element={<Medication />}>
          <Route path="add" element={<AddMedication />}></Route>
          <Route path="all" element={<AllMedication />}></Route>
        </Route>
        <Route path="user" element={<UserManagement />}>
          <Route path="add" element={<AddUser />}></Route>
          <Route path="all" element={<AllUsers />}></Route>
        </Route>
      </Route>

      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/book-appointment" element={<BookAppointment />}></Route>
      <Route path="/our-dentist" element={<OurDentists />}></Route>
      <Route
        path="/our-dentist/specific-dentist"
        element={<SpecificDentists />}
      ></Route>
      <Route path="/my-appointment" element={<MyAppointment />}></Route>
      <Route path="/my-dental-record" element={<DentalRecords />}></Route>
      <Route path="/book-successful" element={<BookSuccess />}></Route>
      <Route path="/book-failed" element={<BookFailed />}></Route>
      <Route path="/service" element={<Services />}></Route>
      <Route path="/prescriptions" element={<Prescriptions />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
