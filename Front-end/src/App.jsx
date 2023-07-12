import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Display } from './Pages'
import { Footer, Navbar } from "./Componenets";


function App() {

  return (
    <div className="bg-gray-500">
      <Router basename="/">
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Display" element={<Display />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
