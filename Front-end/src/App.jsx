import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  AdminLogin,
  Register
} from './Pages'
import { Footer, Navbar } from "./Componenets";


function App() {

  return (
    <div >
      <Router basename="/">
        <Navbar />
        <Routes>
          <Route exact path="/Auth" element={<Login />} />
          <Route exact path="/Auth/Administration" element={<AdminLogin />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
      <Footer/>
    </div >
  )
}

export default App
