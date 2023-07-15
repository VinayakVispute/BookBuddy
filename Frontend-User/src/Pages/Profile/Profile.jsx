import React from "react";
import {  useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
import StudentProfile from "./components/Student_profile";
import AllocationLog from "./components/Allocation_log";

function Profile() {
  const location = useLocation();
  const user = location?.state?.user;
  const isAuthenticated = Boolean(location?.state?.user);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return redirect("/login");
  }

  const [activeTab, setActiveTab] = React.useState("profile");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="bg-gray-900">
        <button
          className={`${
            activeTab === "profile" ? "bg-blue-500" : "bg-gray-300"
          } py-2 px-4`}
          onClick={() => handleTabChange("profile")}
        >
          Profile
        </button>
        <button
          className={`${
            activeTab === "allocation" ? "bg-blue-500" : "bg-gray-300"
          } py-2 px-4`}
          onClick={() => handleTabChange("allocation")}
        >
          Book Alloacted
        </button>
      </div>

      {activeTab === "profile" && <StudentProfile user={user} />}
      {activeTab === "allocation" && <AllocationLog user={user} />}
    </div>
  );
}

export default Profile;
