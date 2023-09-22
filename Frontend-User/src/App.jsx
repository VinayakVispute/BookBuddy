import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Login, Profile, UserRegister, Dashboard } from "./Pages";
import { Footer, Navbar } from "./Componenets";
import NavigationBar from "./Componenets/NaviagationBar";
import DashboardNavBar from "./Componenets/DashboardNavBar";
import Home from "./Pages/Home";
import { Temp } from "./Componenets";
import BookSearch from "./Pages/BookSearch/BookSearch";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Router basename="/">
        <Routes>
          {/* Load Navbar for these routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/auth/*" element={<AuthRoutes />} />
          {/* Load DashboardRoutes for /dashboard/* */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          {/* Load Navbar or DashboardNavBar based on the user's login status */}
          <Route
            path="/Temp"
            element={
              <NavigationBar>
                <BookSearch />
              </NavigationBar>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

const AuthRoutes = () => {
  return (
    <div>
      {/* Your Auth-related routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminRegister />} /> */}
      </Routes>
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <div>
      <DashboardNavBar />
      {/* DashboardNavBar for /dashboard and /dashboard/profile routes */}
      {/* Your Dashboard-related routes */}
      <main className="md:ml-60 h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
