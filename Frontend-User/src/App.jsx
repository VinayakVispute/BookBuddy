import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register, Display } from "./Pages";
import { Footer, Navbar } from "./Componenets";

function App() {
  return (
    <div>
      <Router basename="/">
        <Navbar />
        <Routes>
          <Route exact path="/Auth" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Display" element={<Display />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
