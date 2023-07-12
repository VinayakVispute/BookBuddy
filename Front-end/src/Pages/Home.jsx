import Navbar from "../Componenets/Navbar";
import Footer from "../Componenets/Footer";
import Login from "../Componenets/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../Componenets/Hero";

function Home() {
  return (
    <div className="bg-gray-500">
      <Router basename="/">
        <Navbar />
        <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/" element={<Hero />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default Home;
