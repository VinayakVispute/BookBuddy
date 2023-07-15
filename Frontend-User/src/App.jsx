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
} from "./Pages";
import { Footer, Navbar, Temp } from "./Componenets";
import Book from "./Pages/Display/components/Book";
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
          <Route exact path="/Book" element={<Book />}></Route>
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
          <Route exact path="/Student/Profile" element={<Profile />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
