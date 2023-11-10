import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UserLogin from "./pages/Login/UserLogin";
import SignUp from "./pages/SignUp";

import Dentist from "./pages/Dentist/Dentist";
import DentistLogin from "./pages/Login/DentistLogin";
import DAddAppointments from "./pages/Dentist/pages/AddAppointments";
import DAllAppointments from "./pages/Dentist/pages/AllAppointments";
import DAppointment from "./pages/Dentist/pages/Appointment";
import DRecord from "./pages/Dentist/pages/Record";
import DAddRecord from "./pages/Dentist/pages/AddRecord";
import DAllRecord from "./pages/Dentist/pages/AllRecord";

import Staff from "./pages/Staff/Staff";
import StaffLogin from "./pages/Login/StaffLogin";
import SAddAppointments from "./pages/Staff/pages/AddAppointments";
import SAllAppointments from "./pages/Staff/pages/AllAppointments";
import SAppointment from "./pages/Staff/pages/Appointment";
import SRecord from "./pages/Staff/pages/Record";
import SAllRecord from "./pages/Staff/pages/AllRecord";


import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Login/AdminLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>

      <Route path="dentist/login" element={<DentistLogin />}></Route>
      <Route path="/dentist" element={<Dentist />}>
        <Route path ="appointment" element ={<DAppointment/>}>
          <Route path="add" element ={<DAddAppointments/>}></Route>
          <Route path="all" element ={<DAllAppointments/>}></Route>
        </Route>
        <Route path ="record" element ={<DRecord/>}>
          <Route path="add" element ={<DAddRecord/>}></Route>
          <Route path="all" element ={<DAllRecord/>}></Route>
        </Route>
      </Route> 

      <Route path="staff/login" element={<StaffLogin />}></Route>
      <Route path="/staff" element={<Staff />}>
      <Route path ="appointment" element ={<SAppointment/>}>
        <Route path="add" element ={<SAddAppointments/>}></Route>
          <Route path="all" element ={<SAllAppointments/>}></Route>
        </Route>
        <Route path ="record" element ={<SRecord/>}>
          <Route path="all" element ={<SAllRecord/>}></Route>
        </Route>
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="login" element={<AdminLogin />}></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
