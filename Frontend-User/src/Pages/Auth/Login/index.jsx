import React, { useState, useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginSide from "../../../assets/images/LoginSide.svg";
import logo from "../../../assets/images/BookBuddyIcon.png";
import Cookies from "universal-cookie";
import { AuthContext } from "../AuthContext";
const LoginPage = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    getWithExpiry("myapp-email");
    getWithExpiry("myapp-password");
  }, []);
  const storedEmail = localStorage.getItem("myapp-email");
  const parsedEmail = storedEmail ? JSON.parse(storedEmail).value : "";
  const [email, setEmail] = useState(parsedEmail);
  const storedPassword = localStorage.getItem("myapp-password");
  const parsedPassword = storedPassword ? JSON.parse(storedPassword).value : "";
  const [password, setPassword] = useState(parsedPassword);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { login } = useContext(AuthContext);
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  const rememberCheck = useRef(null);
  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  function remember() {
    if (rememberCheck.current.checked) {
      const expirationTime = 60 * 1000; // 60 seconds in milliseconds

      setWithExpiry("myapp-email", email, expirationTime);
      setWithExpiry("myapp-password", password, expirationTime);
    } else {
      localStorage.removeItem("myapp-email");
      localStorage.removeItem("myapp-password");
    }
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          "http://localhost:3000/",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        const { data } = response;
        console.log("if success", data.success);
        if (data.success) {
          login(data?.token, data?.user);
          cookies.set("TOKEN", response.data.token, {
            withCredentials: true,
            httpOnly: false,
            path: "/",
          });
          console.log(cookies.get("TOKEN"));
          const successMessage = data.message;
          console.log(successMessage);
          toast.success(successMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(data);
          console.log("success");
          remember();
          setTimeout(() => {
            if (data.user.role === "student") {
              // Redirect to the student route
              navigate("/Search", { state: { user: data.user } });
            }
          }, 1000);
        } else {
          const errorMessage = data?.message || "An error occurred.";
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
        }
      } catch (error) {
        console.log(error);
        const errorMessage = "Something Went Wrong. Please try again.";
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
      }
    } else {
      setEmailError(email ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");
    }
  };

  return (
    <div className="max-w-full max-h-full bg-white dark:bg-gray-900">
      <div className="grid max-w-full py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 w-full">
          <section className="bg-gray-50 dark:bg-gray-900 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <img className="h-16 mr-3" src={logo} alt="logo" />
              </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login Account
                  </h1>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                        onChange={handleEmailChange}
                        value={email}
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {passwordError && (
                        <p className="text-red-500 text-xs mt-1">
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          ref={rememberCheck}
                          onChange={remember}
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="terms"
                            className="font-light text-gray-500 dark:text-gray-300"
                          >
                            <p className="font-medium text-primary-600 dark:text-primary-500">
                              Remember Me
                            </p>
                          </label>
                        </div>
                      </div>

                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Login
                    </button>
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
              </div>
            </div>
          </section>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex">
          <img src={LoginSide} alt="login side" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
