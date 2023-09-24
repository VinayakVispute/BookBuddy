import React from "react";
import BookAvailability from "./components/BookAvailability";
import TableComponent from "./components/TableComponent";

const Dashboard = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 ">
      <div className="pt-16">
        <BookAvailability />
        <div className="flex flex-col ">
          <TableComponent />
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
