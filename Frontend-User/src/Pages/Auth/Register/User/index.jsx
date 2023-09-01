import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterSide from "../../../../assets/images/GirlCarryingBook.png";
import logo from "../../../../assets/images/BookBuddyIcon.png";
import avatar from "../../../../assets/icons/avatar.svg";
import { VisibilityOff, Visibility, PasswordSharp } from "@mui/icons-material";

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhotoChange = (event) => {
    const image = event.target.files[0];
    setProfileImage(image);
    console.log("imageSet");
    if (image) {
      const selectedPhotoURL = URL.createObjectURL(image);
      setSelectedPhoto(selectedPhotoURL);
      console.log("SelectedImage", selectedPhotoURL);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    setFirstNameError(firstName ? "" : "First name is required");
    setSecondNameError(secondName ? "" : "Second name is required");
    setStudentIdError(studentId ? "" : "Student ID is required");
    setEmailError(email ? "" : "Email is required");
    setPasswordError(password ? "" : "Password is required");
    setRepasswordError(
      repassword
        ? repassword === password
          ? ""
          : "Passwords do not match"
        : "Confirm password is required"
    );
    setPhoneNumberError(
      phoneNumber
        ? /^[6-9]\d{9}$/.test(phoneNumber)
          ? ""
          : "Invalid Indian phone number"
        : "Phone number is required"
    );

    // ... (validate other fields)
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setFirstNameError(value ? "" : "First name is required");
  };
  const handleStudentIdChange = (event) => {
    const value = event.target.value;
    setStudentId(value);
    setStudentIdError(value ? "" : "Student ID is required");
  };

  const handleSecondNameChange = (event) => {
    const value = event.target.value;
    setSecondName(value);
    setSecondNameError(value ? "" : "Second name is required");
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(value ? "" : "Email is required");
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(value ? "" : "Password is required");
  };
  const handleRePasswordChange = (event) => {
    const value = event.target.value;
    console.log(password, repassword);
    setRepassword(value);
    setRepasswordError(
      value
        ? value === password
          ? ""
          : "Passwords do not match"
        : "Confirm password is required"
    );
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const validatePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setPhoneNumberError(
      value
        ? /^[6-9]\d{9}$/.test(value)
          ? ""
          : "Invalid Indian phone number"
        : "Phone number is required"
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    setSubmitClicked(true);
    if (
      !emailError &&
      !passwordError &&
      !repasswordError &&
      !studentIdError &&
      !firstNameError &&
      !secondNameError &&
      !phoneNumberError &&
      repassword === password &&
      isValidEmail(email)
    ) {
      // Perform the form submission logic here
      console.log("Form submitted successfully!");
      try {
        const formData = new FormData();
        formData.append("studentID", studentId);
        formData.append("name", firstName + " " + secondName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("imageFile", profileImage);
        console.log(formData);
        const response = await axios.post(
          "http://localhost:3000/Register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { data } = response;
        console.log(data);

        if (data.success) {
          console.log("SuccessFully Done");
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          const errorMessage = error.response.data.message;
          console.log(errorMessage);
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      console.log("Form has errors, please correct them.");
      toast.error("Please fill in all required fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
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
                      {selectedPhoto ? (
                        <div className="mt-3">
                          <img
                            className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                            src={selectedPhoto}
                            alt="Selected Image"
                          />
                        </div>
                      ) : (
                        <img
                          className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                          src={avatar}
                          alt="Image Description"
                        />
                      )}

                      <div className="flex gap-x-2">
                        <div>
                          <label
                            htmlFor="photoInput"
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
                          </label>
                          <input
                            type="file"
                            id="photoInput"
                            accept="image/jpeg, image/png"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="fullName"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Full name
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="sm:flex">
                      <div>
                        <input
                          label="fullName"
                          id="firstname"
                          type="text"
                          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px rounded-l-lg	 text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder="Maria"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                        {submitClicked && firstNameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {firstNameError}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          label="fullName"
                          id="secondName"
                          type="text"
                          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px rounded-r-lg	  text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder="Boone"
                          value={secondName}
                          onChange={handleSecondNameChange}
                        />
                        {submitClicked && secondNameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {secondNameError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="studentId"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Student ID
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      id="studentId"
                      label="studentId"
                      type="text"
                      className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="2100120014"
                      value={studentId}
                      onChange={handleStudentIdChange}
                    />
                    {submitClicked && studentIdError && (
                      <p className="text-red-500 text-sm mt-1">
                        {studentIdError}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Email
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <input
                      id="email"
                      type="email"
                      className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="maria@site.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {submitClicked && emailError && (
                      <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Password
                    </label>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          id="password"
                          value={password}
                          type={showPassword ? "text" : "password"}
                          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder="Enter  password"
                          onChange={handlePasswordChange}
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
                      {submitClicked && passwordError && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordError}
                        </p>
                      )}
                      <input
                        type={showPassword ? "text" : "password"}
                        id="repassword"
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Confirm password"
                        value={repassword}
                        onChange={handleRePasswordChange}
                      />
                      {submitClicked && repasswordError && (
                        <p className="text-red-500 text-sm mt-1">
                          {repasswordError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="inline-block">
                      <label
                        htmlFor="phone"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Phone
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="sm:flex flex-col">
                      <input
                        id="phone"
                        type="text"
                        value={phoneNumber}
                        className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder="+x(xxx)xxx-xx-xx"
                        onChange={validatePhoneNumber}
                      />
                      {submitClicked && phoneNumberError && (
                        <p className="text-red-500 text-sm mt-1">
                          {phoneNumberError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end gap-x-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Register
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
