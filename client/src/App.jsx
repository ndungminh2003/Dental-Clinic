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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />}></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
