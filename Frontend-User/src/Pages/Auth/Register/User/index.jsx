import React, { useState } from "react";
import RegisterSide from "../../../../assets/images/GirlCarryingBook.png";
import logo from "../../../../assets/images/BookBuddyIcon.png";
import avatar from "../../../../assets/icons/avatar.svg";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [setsecondName, setSetsecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setprofileImage] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-full max-h-full bg-white dark:bg-gray-900">
      <div className="grid max-w-full  py-8  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 w-full">
          <>
            <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-full xl:p-16 dark:bg-gray-800 dark:border-gray-700 max-w-screen ">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                    Register for Student
                  </h2>
                </div>
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                  <div className="sm:col-span-3">
                    <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                      Profile photo
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="sm:col-span-9">
                    <div className="flex items-center gap-5">
                      <img
                        className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                        src={avatar}
                        alt="Image Description"
                      />
                      <div className="flex gap-x-2">
                        <div>
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                          >
                            <svg
                              className="w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                            </svg>
                            Upload photo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="af-account-full-name"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Full name
                    </label>
                    <div className="hs-tooltip inline-block">
                      <button type="button" className="hs-tooltip-toggle ml-1">
                        <svg
                          className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </button>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                        role="tooltip"
                      >
                        Displayed on public forums, such as Preline
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="sm:flex">
                      <input
                        id="af-account-full-name"
                        type="text"
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Maria"
                      />
                      <input
                        type="text"
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Boone"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="af-account-email"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Student ID
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      id="af-account-email"
                      type="text"
                      className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="2100120014"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="af-account-email"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Email
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      id="af-account-email"
                      type="email"
                      className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="maria@site.com"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="af-account-password"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          id="af-account-password"
                          type={showPassword ? "text" : "password"}
                          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder="Enter  password"
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                        >
                          {showPassword ? (
                            <VisibilityOff size={18} /> // Use the FaEyeSlash icon when the password is visible
                          ) : (
                            <Visibility size={18} /> // Use the FaEye icon when the password is hidden
                          )}
                        </button>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="inline-block">
                      <label
                        htmlFor="af-account-phone"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Phone
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="sm:flex">
                      <input
                        id="af-account-phone"
                        type="text"
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="+x(xxx)xxx-xx-xx"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end gap-x-2">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Login
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register
                  </a>
                </p>
              </div>
            </div>
          </>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex h-full flex justify-center items-center ">
          <img src={RegisterSide} className="h-[562px]" />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
