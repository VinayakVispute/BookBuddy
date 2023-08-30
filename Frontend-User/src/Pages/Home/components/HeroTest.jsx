import { Link } from "react-router-dom";
import heroSectionBelow from "../../../assets/images/HeroSection.png";

function Hero() {
  return (
    <div
      className="w-screen relative bg-whiteSecondary"
      style={{ zIndex: -2, height: "420px" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 h-fit pb-6 pt-12 "
        style={{ zIndex: -2 }}
      ></div>

      {/* Hero Section Content */}
      <div className="flex flex-row h-fit  relative z-9999">
        <div className="flex flex-col w-[50%] justify-center items-start p-8 py-[3rem] h-fit relative z-1">
          <div className="flex flex-col w-full justify-center items-center text-center md:text-left">
            <h1 className="my-4 text-4xl font-bold leading-tight w-[100%] text-white">
              Welcome to BookBuddy Library Management System
            </h1>
            <p className="leading-normal text-xl mb-8 w-[100%] text-stale">
              Efficiently Manage, Organize, and Explore Your Literary Universe
              with BookBuddy. Revolutionize the Way You Experience Your Library.
              right!
            </p>
          </div>
        </div>
        <div className="flex-1 bg-hero-pattern bg-center bg-no-repeat bg-contain relative z-1">
          {/* Content for the right div */}
        </div>
      </div>

      {/* Hero Section Image */}
      <div
        className="absolute left-0 right-0"
        style={{ height: "185px", top: "213px", zIndex: -1 }}
      >
        <img
          src={heroSectionBelow}
          width="100%"
          className="w-full object-fill"
          alt="shape_razorpay"
        />
        3
      </div>

      {/* Other images and text */}
      {/* ... */}
    </div>
  );
}

export default Hero;
