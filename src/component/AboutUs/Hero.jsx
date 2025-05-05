import React from 'react';
import AboutUsImage from "../../assets/banner/aboutus.svg";
import { FaRegEye } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-[#DAE2EC] flex items-center justify-center py-12 px-6 md:px-12 mt-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Text */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-customText font-semibold uppercase tracking-wide">
              Virtual Eyewear Try-On
            </p>
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-6xl max-w-2xl font-medium text-gray-900">
            Try On Your Perfect Eyewear Instantly
          </h1>
          <p className="text-gray-600">
            Discover the latest eyewear trends and find the perfect fit with our 
            Virtual Try-On. Experience stylish frames that complement your face shape 
            in just a few clicks.
          </p>
          <div className="flex gap-4 text-[12px] md:text-[0.9rem]">
            <button className="bg-teal-600 text-white px-6 py-4 rounded-full duration-200 hover:bg-teal-700 ease-in">
              Try Now for Women
            </button>
            <button className="bg-teal-600 text-white px-6 py-4 rounded-full hover:bg-teal-700 ease-in duration-200">
              Try Now for Men
            </button>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img 
            src={AboutUsImage}
            alt="Virtual Eyewear Try-On"
            className="rounded-lg shadow-lg w-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
