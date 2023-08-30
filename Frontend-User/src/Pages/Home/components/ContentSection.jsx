import React from "react";

import contentSection from "../../../assets/images/Library-Management-System.png";
import computerIcon from "../../../assets/icons/computerIcons.svg";
import documentationIcon from "../../../assets/icons/documentationIcon.svg";
import reportIcon from "../../../assets/icons/reportIcon.svg";
import UserInterface from "../../../assets/icons/UserInterface.svg";

const ContentSection = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="mt-8">
            <img
              className="w-full rounded-lg"
              src=""
              alt="office content 1"
              src={contentSection}
            />
          </div>
          <div className="font-light text-gray-500 sm:text-lg  dark:text-gray-400">
            <div>
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Simplify Library Management with Our User-Friendly Software
              </h2>
              <p className="mb-4">
                Our affordable library management software handles fines, due
                dates, and effortlessly creates reports, all wrapped in an
                easy-to-use interface.
              </p>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col">
              <div className="flex gap-4">
                <img
                  src={computerIcon}
                  style={{ height: "30px" }}
                  alt="Computer Icon"
                />

                <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Cost-effective Software
                </h2>
              </div>
              <p className="mb-4 text-base">
                Affordable library management for efficient operations.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-4">
                <img
                  src={documentationIcon}
                  style={{ height: "30px" }}
                  alt="Documentation Icon"
                />

                <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Fine and Dues Calculation
                </h2>
              </div>
              <p className="mb-4 text-base">
                Hassle-free fines and due date calculations.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-4">
                <img
                  src={UserInterface}
                  style={{ height: "30px" }}
                  alt="UserInterface Icon"
                />

                <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  User Friendly interface
                </h2>
              </div>
              <p className="mb-4 text-base">
                Intuitive interface for easy navigation.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-4">
                <img
                  src={reportIcon}
                  style={{ height: "30px" }}
                  alt="report Icon"
                />
                <h2 className="mb-4 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  MIS Report Generation
                </h2>
              </div>
              <p className="mb-4 text-base">
                Generate MIS reports effortlessly for insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSection;
