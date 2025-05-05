import React from "react";
import img from "../../assets/banner/trynow.svg";
import { Link } from "react-router-dom";

const AIBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#F5EDE6] mt-[4.5rem] min-h-[200px]">
      {/* Left Section - Text Content */}
      <div className="md:w-1/2 lg:text-left space-y-4 p-10 text-center">
        <h2 className="text-3xl md:text-7xl font-bold text-gray-800">
        Online Glasses Virtual Try On
        </h2>
        <p className="text-lg md:text-lg font-sm text-black/75">
        Integrate precise virtual try on technology and accurate PD measurement into your website or e-commerce platform, allowing customers to virtual try on sunglasses and glasses online. Enhance the shopping experience and helps boost conversions and sales.
        </p>
        <Link to="/Shop">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-md text-lg hover:bg-teal-700 mt-5 transition">
          Try Now
        </button>
        </Link>
      </div> 

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-end">
        <img src={img} alt="AI Smart Glasses" className="w-full max-h-[40rem]  lg:ml-32 " />
      </div>
    </div>
  );
};

export default AIBanner;
