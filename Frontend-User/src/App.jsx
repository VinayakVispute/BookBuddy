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
import DashboardNavBar from "./Componenets/DashboardNavBar";
import Home from "./Pages/Home";
import { Temp } from "./Componenets";

const App = () => {
  return (
    <Router basename="/">
      {/* Render Navbar if DashboardNavBar is not present */}
      {!isDashboardRoute() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route
          path="/dashboard/*"
          element={
            <main className="md:ml-60  h-screen bg-white dark:bg-gray-900">
              <DashboardRoutes />
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

const isDashboardRoute = () => {
  // Determine if the current route is a Dashboard route
  const currentPath = window.location.pathname;
  return currentPath.startsWith("/dashboard");
};

const AuthRoutes = () => {
  return (
    <div>
      {/* Your Auth-related routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminRegister />} />
      </Routes>
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <div>
      <DashboardNavBar />{" "}
      {/* DashboardNavBar for /dashboard and /dashboard/profile routes */}
      {/* Your Dashboard-related routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
