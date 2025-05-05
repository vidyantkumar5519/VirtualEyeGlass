import React from "react";
import image from "../../assets/banner/pm.svg";

const PromotionBanner = () => {
  return (
    <div className="py-12">
      <section className="bg-[#EAF0FA] p-8 lg:p-0 rounded-lg max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:p-10">
          <span className="text-[#D97706] uppercase font-semibold text-sm tracking-wider">
            Promotions
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Limited-Time Offer – Enjoy Exclusive Discounts on Premium Eyewear!
          </h2>
          <p className="text-gray-600 mb-6">
            Eget nam congue neque nunc vel viverra lorem massa urna. Magna proin
            pellentesque cras amet et.
          </p>
          <button className="bg-customColor text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm font-medium">
            Try Now!
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt="Promotion"
            className="w-full h-auto object-cover "
          />
        </div>
      </section>
    </div>
  );
};

export default PromotionBanner;
