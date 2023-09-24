import { AuthContext } from "../Pages/Auth/AuthContext";
import { useContext } from "react";
import DashboardNavBar from "./DashboardNavBar";
import Navbar from "./Navbar";
import React from "react";

const NaviagationBar = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <DashboardNavBar />
          <main className="md:ml-60">{props.children}</main>
        </>
      ) : (
        <>
          <Navbar />
          <main>{props.children}</main>
        </>
      )}
    </div>
  );
};

export default NaviagationBar;
