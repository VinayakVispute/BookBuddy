import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Display,
  Dashboard,
  Profile,
  Allocation,
  SubmitBook,
  DetailPage,
  UserRegister,
  AdminRegister,
} from "./Pages";
import { Footer, Navbar, Temp } from "./Componenets";
import Book from "./Pages/Display/components/Book";
import StudentSearch from "./Pages/StudentSearch/Display";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Router basename="/">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Search" element={<StudentSearch />} />
          <Route exact path="/Auth" element={<Login />} />
          <Route exact path="/Register" element={<UserRegister />} />
          <Route exact path="/Register/Admin" element={<AdminRegister />} />
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
          <Route
            exact
            path="/DetailPage/:Bookid"
            element={<DetailPage />}
          ></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
