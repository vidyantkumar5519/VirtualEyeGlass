import React from "react";
import { FaEye } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    title: "Seamless Virtual Try-On",
    description: "Experience the future of eyewear shopping with our cutting-edge virtual try-on technology, ensuring the perfect fit before you buy.",
    highlight: false,
  },
  {
    id: 2,
    title: "Crystal Clear Vision",
    description: "Our lenses are crafted with precision to provide exceptional clarity and comfort, giving you the best possible vision experience.",
    highlight: true,
  },
  {
    id: 3,
    title: "Trendsetting Eyewear",
    description: "Stay ahead in style with our diverse collection of modern and classic frames designed to complement every personality.",
    highlight: false,
  },
  {
    id: 4,
    title: "Unmatched Quality & Durability",
    description: "Every pair of glasses is crafted with top-tier materials, ensuring long-lasting performance and reliability.",
    highlight: false,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-2 text-[#8D3500] text-sm font-semibold uppercase mb-4">
        <FaEye className="text-[18px]" />
        <span>Why Choose Us</span>
      </div>
      
      {/* Main Title & Description */}
      <div className="flex flex-col lg:flex-row justify-between mb-12">
        <h2 className="text-3xl lg:text-[40px] font-bold text-gray-900 max-w-xl">
        See the Future with Our Virtual Try-On
        </h2>
        <p className="text-gray-600 max-w-lg mt-4 lg:mt-0">
        Discover the easiest way to find your perfect pair of glasses. Our virtual try-on technology lets you preview styles in real time, ensuring a flawless fit from the comfort of your home.
        </p>
      </div>
      
      {/* Benefits List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="relative">
            <p className="text-gray-400 text-sm font-medium mb-2">{String(benefit.id).padStart(2, '0')}</p>
            <h3 className={`text-lg font-semibold ${benefit.highlight ? "text-gray-900" : "text-gray-700"}`}>
              {benefit.title}
            </h3>
            <p className="text-gray-600 mt-1 text-sm">{benefit.description}</p>
            {benefit.highlight && <div className="w-80 border-t-2 border-customColor mt-2"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
