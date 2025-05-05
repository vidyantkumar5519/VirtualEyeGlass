import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import m1 from "../../assets/model/m1.svg";
import m2 from "../../assets/model/m2.svg";
import m3 from "../../assets/model/m3.svg";
import m4 from "../../assets/model/m4.svg";
import m5 from "../../assets/model/m5.svg";
import play from "../../assets/banner/play.svg"
const IMAGES = [
  { id: 1, image: m1 },
  { id: 2, image: m2 },
  { id: 3, image: m3 },
  { id: 4, image: m4 },
  { id: 5, image: m5 },
];

const TrendingGlasses = () => {
  return (
    <div className="relative flex flex-col items-center py-20">
      <h2 className="text-teal-800 text-3xl font-semibold mb-20">Frame Your Look with AR Try-On</h2>
      <img src={play} alt="play" className="absolute top-0 left-10  h-20 object-cover hidden lg:block"/>
      <div className="relative flex items-center justify-center">
        <button className="absolute left-0 text-teal-700 text-3xl p-2">
          {/* <FaChevronLeft /> */}
        </button>
        
        <div className="flex gap-6 md:gap-16">
          {IMAGES.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[50px] overflow-hidden shadow-lg w-24 h-[20rem] sm:w-32 sm:h-52 md:w-40 md:h-[35rem]"
              style={{ 
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow:"5px 5px 5px 2px #025162",
                transform: `scale(${1 + (index % 2 === 0 ? -0.1 : 0.1)})`
              }}
            />
          ))}
        </div>
        <button className="absolute right-0 text-teal-700 text-3xl p-2">
          {/* <FaChevronRight /> */}
          
        </button>
        <img src={play} alt="play" className="absolute bottom-0 -right-32  h-20 object-cover hidden lg:block"/>
      </div>
    </div>
  );
};

export default TrendingGlasses;