import React from "react";
import BookImage from "../../../assets/images/jrqemgrsexhah0saladb.jpg";
const BookAvailabilityCard = () => {
  return (
    <div>
      <div className="p-6 w-full flex justify-center items-center">
        <a
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full rounded-t-lg  md:w-48 md:rounded-none md:rounded-l-lg"
            src={BookImage}
            alt=""
          />
          <div className="flex flex-col gap-4 justify-between p-4 leading-normal">
            <div className="flex flex-row justify-start items-center">
              <p className="whitespace-nowrap font-semibold">Title :</p>
              <span className="overflow-wrap break-word">
                The Catcher in the Rye
              </span>
            </div>
            <div className="flex flex-row justify-start items-center">
              <p className="whitespace-nowrap font-semibold">Description :</p>
              <span className="overflow-wrap break-word">
                A coming-of-age novel about teenage angst and alienation
              </span>
            </div>
            <div className="flex gap-x-20">
              <div className="flex flex-row">
                <p className="whitespace-nowrap font-semibold">Author :</p>
                <span className="overflow-wrap break-word">J.D. Salinger</span>
              </div>
              <div className="flex flex-row">
                <p className="whitespace-nowrap font-semibold">Genre :</p>
                <span className="overflow-wrap break-word">Modern Classic</span>
              </div>
            </div>
            <div className="flex gap-x-20">
              <div className="flex flex-row">
                <p className="whitespace-nowrap font-semibold">Code :</p>
                <span className="overflow-wrap break-word">CATCHER001</span>
              </div>
              <div className="flex flex-row">
                <p className="whitespace-nowrap font-semibold">isAllocated </p>
                <span className="overflow-wrap break-word">No</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default BookAvailabilityCard;
