import React from "react";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import img1 from "../../assets/glassType/1.svg";
import img2 from "../../assets/glassType/2.svg";
import img3 from "../../assets/glassType/3.svg";
import img4 from "../../assets/glassType/4.svg";
import img5 from "../../assets/glassType/5.svg";
import img6 from "../../assets/glassType/6.svg";
const glassesData = [
  {
    id: 1,
    title: "Classic Rimless",
    description:
      "Experience a lightweight and elegant look with our virtual try-on for rimless eyewear.",
    image: img1,
  },
  {
    id: 2,
    title: "Aviator Style",
    description:
      "Try on the timeless aviator frames virtually and find your perfect match.",
    image: img2,
  },
  {
    id: 3,
    title: "Virtual Sunglasses",
    description:
      "See how different sunglasses fit your face instantly with our digital try-on.",
    image: img3,
  },
  {
    id: 4,
    title: "Sports Eyewear",
    description:
      "Test out sports glasses virtually and choose the best fit for active lifestyles.",
    image: img4,
  },
  {
    id: 5,
    title: "Reading Glasses",
    description:
      "Find the perfect reading glasses by trying them on from the comfort of your home.",
    image: img5,
  },
  {
    id: 6,
    title: "Computer Glasses",
    description:
      "Protect your eyes from screen glare by trying on blue light filtering eyewear.",
    image: img6,
  },
];

const GlassesCard = ({ title, description, image }) => {
  return (
    <div className=" overflow-hidden ">
      <img
        src={image}
        alt={title}
        className="w-full h-52 rounded-2xl object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-xl  font-semibold">{title}</h3>
          <div className="flex justify-end text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="flex justify-between items-center mt-3">
          <a
            href="#"
            className="text-customColor text-sm font-semibold flex items-center  gap-1"
          >
            Explore More <BsArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

const GlassesList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-10">
      <h2 className="text-4xl font-bold text-center text-customColor mb-20">
      Revolutionizing Eyewear with Virtual Try-On
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {glassesData.map((glasses) => (
          <GlassesCard key={glasses.id} {...glasses} />
        ))}
      </div>
    </div>
  );
};

export default GlassesList;
