import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Display,
  Dashboard,
  Profile,
  Allocation,
  SubmitBook,
  DetailPage
} from "./Pages";
import { Footer, Navbar, Temp } from "./Componenets";
function App() {
  return (
    <div>
      <Router basename="/">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Auth" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Display" element={<Display />}></Route>
          <Route exact path="/Temp" element={<Temp />}></Route>
          <Route exact path="/Admin/Dashboard" element={<Dashboard />}></Route>
          <Route
            exact
            path="/Admin/SubmitBook"
            element={<SubmitBook />}
          ></Route> 
          <Route
            exact
            path="/Student/Allocation"
            element={<Allocation />}
          ></Route>
          <Route exact path="/Student" element={<Profile />}></Route>
          <Route exact path="/DetailPage" element={<DetailPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
