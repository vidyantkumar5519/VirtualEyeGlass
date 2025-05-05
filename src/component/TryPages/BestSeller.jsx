import React from "react";
import { FaEye } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const BestSellers = ({ title, subtitle, products, viewAllLink }) => {
  return (
    <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-[#8D3500] text-sm font-semibold uppercase mb-4">
        <FaEye className="text-[18px]" />
        <span>{title}</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-[40px] font-bold text-gray-900">
          {subtitle}
        </h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-customColor text-sm font-medium">
            View All →
          </a>
        )}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 relative hover:shadow-md transition-all duration-300"
          >
            <div className="p-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm">{product.color}</p>
              <button className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full hover:bg-gray-100">
                <HiOutlineHeart className="text-gray-500 text-xl" />
              </button>
            </div>
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="mt-4 text-start">
              <p className="text-gray-900 font-bold mt-2">{product.price}</p>
              <button className="relative text-right bottom-8 text-customColor w-full py-2 rounded-md text-md font-medium underline">
                Try Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
