import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Profile, UserRegister, AdminRegister } from "./Pages";
import { Footer, Navbar } from "./Componenets";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/Auth" element={<Login />} />
        <Route exact path="/Register" element={<UserRegister />} />
        <Route exact path="/Register/Admin" element={<AdminRegister />} />
        <Route exact path="/Student" element={<Profile />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
