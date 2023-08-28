import { Link } from "react-router-dom";
import heroSectionBelow from "../../../assets/images/HeroSection.png";
function Hero() {
  return (
    <div className="w-screen">
      <div className="flex flex-row h-fit  bg-whiteSecondary pb-6 pt-12 ">
        <div className="flex flex-col w-[50%] justify-center items-start p-8 py-[3rem] h-fit">
          <div class="flex flex-col w-full  justify-center items-center text-center md:text-left">
            <h1 class="my-4 text-4xl font-bold leading-tight w-[100%] text-white">
              Welcome to BookBuddy Library Management System
            </h1>
            <p class="leading-normal text-xl mb-8 w-[100%] text-stale">
              Efficiently Manage, Organize, and Explore Your Literary Universe
              with BookBuddy. Revolutionize the Way You Experience Your Library.
              right!
            </p>
          </div>
        </div>
        <div className="flex-1 bg-hero-pattern bg-center bg-no-repeat bg-contain">
          {/* Content for the right div */}
        </div>
      </div>
      <div
        className="w-[103%] absolute left-0 right-0"
        style={{ height: "185px", position: "relative", top: "-82px" }}
      >
        <img
          src={heroSectionBelow}
          width="100%"
          className="w-full object-fill"
          alt="shape_razorpay"
        />
      </div>
    </div>
  );
}

export default Hero;
