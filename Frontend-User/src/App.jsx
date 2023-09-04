import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  Login,
  Profile,
  UserRegister,
  AdminRegister,
  Dashboard,
} from "./Pages";
import { Footer, Navbar } from "./Componenets";
import DashboardNavBar from "./Pages/Dashboard/components/DashboardNavBar";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="/Auth" element={<Login />} />
          <Route path="/Register" element={<UserRegister />} />
        </Route>
        <Route
          path="/Dashboard"
          element={
            <>
              <DashboardNavBar />
            </>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="Auth" element={<Login />} />

          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
{
  /* <Route exact path="/Register" element={<UserRegister />} />
        <Route exact path="/Register/Admin" element={<AdminRegister />} />
        <Route exact path="/Student" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </div> */
}
