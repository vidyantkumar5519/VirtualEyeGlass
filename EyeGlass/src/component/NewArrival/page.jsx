import React from "react";
import img1 from "../../assets/NewArrival/1.svg";
import img2 from "../../assets/NewArrival/2.svg";
import { Link } from "react-router-dom";
const newArrivals = [
  {
    id: 1,
    title: "Virtual Try-On: Ultra-Light Sleek Rimless Frames",
    description:
      "Experience the perfect blend of minimalism and elegance with our ultra-light rimless glasses. Designed for a weightless feel and modern sophistication, these frames offer a seamless look that suits any occasion. Try them on virtually and discover effortless style!",
    image: img1,
  },
  {
    id: 2,
    title: "Virtual Try-On: Timeless Aviators with a Contemporary Edge",
    description:
      "Aviators redefined! These classic frames now feature enhanced comfort, lightweight materials, and a sleek, modern finish. Whether you're going for a bold statement or everyday versatility, our virtual try-on lets you see how they complement your unique style instantly.",
    image: img2,
  },
];

const NewArrivalCard = ({ title, description, image, reverse }) => {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 p-4  lg:p-16 rounded-lg`}>
      <img src={image} alt={title} className="w-full md:w-1/2 h-full object-cover rounded-lg" />
      <div className="w-full md:w-1/2 relative  lg:bottom-16 space-y-5 lg:space-y-10">
        <h3 className="text-2xl md:text-lg lg:text-4xl font-semibold max-w-md">{title}</h3>
        <p className="text-gray-600 max-w-lg text-sm lg:text-lg  mt-2">{description}</p>
        <Link to="/Shop">
        <button className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition">
         Try Now
        </button>
        </Link>
      </div>
    </div>
  );
};

const NewArrivals = () => {
  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-center mb-2 text-teal-700">New Arrivals, Same Stunning Virtual Try-On</h2>
      <div className="space-y-10">
        {newArrivals.map((item, index) => (
          <NewArrivalCard key={item.id} {...item} reverse={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
