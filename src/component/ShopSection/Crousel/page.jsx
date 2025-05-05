import React from "react";
import img from "../../../assets/banner/sh.svg";
import { Link } from "react-router-dom";
const AIBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#F5EDE6] mt-[4.5rem] min-h-[200px]">
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 lg:text-left space-y-7 p-10 text-center">
      <h2 className="text-3xl md:text-7xl font-bold text-gray-800">
      AI-Powered Smart Frames
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          Experience the future of eyewear with our intelligent AI-driven frames.
          Adaptive lenses, real-time enhancements, and ultimate style.
        </p>
        <div>
        <Link to="/TryPages">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-md text-lg hover:bg-teal-700 transition">
          Explore Now
        </button>
        </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-end">
        <img src={img} alt="AI Smart Glasses" className="w-full  max-h-[46rem] lg:ml-32 " />
      </div>
    </div>
  );
};

export default AIBanner;
