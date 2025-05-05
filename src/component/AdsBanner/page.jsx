import React from "react";
import m6 from "../../assets/model/m6.svg";
import { Link } from "react-router-dom";
const page = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between  bg-[#EEEEEE]">
        <div>
          <img src={m6} alt="model" />
        </div>
        <div>
          <div className="px-10 max-w-3xl py-10 space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold text-customColor"> Virtual Eyewear Try-On</h1>
            <div >
              <p className="text-sm md:text-xl">
              Experience the future of eyewear shopping with our advanced Virtual Try-On. 
          Instantly see how different frames look on you with just one click—no need to visit a store!  
          Try various styles and find your perfect match effortlessly.
              </p>
            </div>
            <div>
            <Link to ="/Shop">
            <button className="bg-customColor px-10 py-2 text-white rounded-md">Try Now</button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
