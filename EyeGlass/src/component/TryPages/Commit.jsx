import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommitmentSection = ({ imageSrc }) => {
  const details = [
    {
      id: 1,
      title: "Crystal-Clear Vision",
      sub: "Experience precision-crafted lenses that enhance clarity and reduce glare, ensuring the best vision for every moment.",
    },
    {
      id: 2,
      title: "Virtual Try-On Experience",
      sub: "Easily try on frames from the comfort of your home using our advanced Virtual Try-On technology.",
    },
    {
      id: 3,
      title: "Premium Quality & Durability",
      sub: "Designed with high-quality materials to offer long-lasting durability without compromising on comfort and style.",
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center gap-12 px-4 lg:px-16 py-16 max-w-7xl mx-auto">
      {/* Left Side - Image with Overlay */}
      <div className="relative w-full lg:w-1/2">
        <img
          src={imageSrc}
          alt="Eyewear New Collection"
          className="w-full h-auto max-h-[600px] object-cover rounded-lg"
        />
        <div className="absolute bottom-8 left-8 text-white max-w-[300px]">
          <h3 className="text-2xl font-semibold mb-3">Try Before You Buy</h3>
          <p className="text-sm mb-4 opacity-90 leading-relaxed">
          Experience your perfect look in real-time with our innovative Virtual Try-On feature.          </p>
          <Link to="/Shop">
          <button className="bg-customColor text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 text-sm font-medium">
            Try Now!
          </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full lg:w-1/2 lg:pl-12">
        <div className="flex items-center gap-2 mb-4">
          <FaEye className="text-customText text-[20px]" />
          <span className="text-customText uppercase font-semibold tracking-wider text-sm">ABOUT US</span>
        </div>

        <h2 className="text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight mb-6">
        Elevate Your Eyewear Experience with Virtual Try-On
        </h2>

        <p className="text-gray-600 mb-10 leading-relaxed">
        Finding the perfect frames has never been easier. Our Virtual Try-On 
          lets you see how different styles look on you before making a purchase, 
          ensuring the perfect fit and look for your unique style.
        </p>

        <div className="space-y-8">
          {details.map((item) => (
            <CommitmentItem key={item.id} title={item.title} description={item.sub} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CommitmentItem = ({ title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1.5">
        <FaCheckCircle className="text-2xl"/>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CommitmentSection;
