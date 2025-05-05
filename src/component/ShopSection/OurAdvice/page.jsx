import React from "react";
import { FaArrowRight } from "react-icons/fa";
import img1 from "../../../assets/NewArrival/3.svg";
import img2 from "../../../assets/NewArrival/5.svg";

const newArrivals = [
  {
    id: 1,
    title: "AI-Powered Virtual Try-On Technology",
    description:
      "Experience the future of eyewear shopping with our advanced AI virtual try-on technology. Our sophisticated facial recognition system accurately maps your features to provide a realistic preview of how each frame will look on you. Try hundreds of styles from the comfort of your home and find your perfect match with confidence.",
    image: img1,
  },
  {
    id: 2,
    title: "Smart Frame Recommendations",
    description:
      "Let our AI-driven system analyze your face shape, style preferences, and lifestyle needs to recommend the perfect frames for you. Our technology considers factors like face symmetry, skin tone, and personal style to suggest frames that not only look great but also suit your daily activities and comfort requirements.",
    image: img2,
  },
];

const NewArrivalCard = ({ title, description, image, reverse }) => {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-6 `}>
      <img src={image} alt={title} className="w-full md:w-1/2 max-h-[35rem] object-cover" />
      <div className="w-full md:w-1/2 relative lg:bottom-16 space-y-5 lg:space-y-10 p-10">
        <h3 className="text-2xl md:text-lg lg:text-4xl font-semibold max-w-md">{title}</h3>
        <p className="text-gray-600 max-w-lg text-sm lg:text-lg mt-2">{description}</p>
        <button className="mt-4 text-red-500 flex items-center gap-2 px-5 py-2 rounded-md hover:text-teal-700 transition">
          Read More <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

const NewArrivals = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold text-center mb-10 text-teal-700">Our Advice</h2>
      <div className="space-y-10">
        {newArrivals.map((item, index) => (
          <NewArrivalCard key={item.id} {...item} reverse={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
