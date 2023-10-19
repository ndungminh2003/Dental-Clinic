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

import Staff from "./pages/Staff/Staff";
import StaffLogin from "./pages/Login/StaffLogin";

import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Login/AdminLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/dentist" element={<Dentist />}>
        <Route path="login" element={<DentistLogin />}></Route>
      </Route>
      <Route path="/staff" element={<Staff />}>
        <Route path="login" element={<StaffLogin />}></Route>
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
