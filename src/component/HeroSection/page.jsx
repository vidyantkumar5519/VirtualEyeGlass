import { motion } from "framer-motion";
import React from "react";
import banner from "../../assets/banner/hb.svg";
import playbtn from "../../assets/banner/play.svg";
import { Link } from "react-router-dom";


const TEXT = {
  title: "AI-Powered Eye Wear, Next-Gen Style",
  subtitle:
    "Experience the future of eyewear with AI-enhanced precision and futuristic design. Smart vision meets ultimate confidence with cutting-edge lenses and frames.",
  buttons: {
    quote: "Get Smart Glasses",
    learnMore: "Explore AI Vision",
  },
};

const HeroSection = () => {
  return (
    <div className="mt-16">
      <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col md:flex-row items-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-44 py-10"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Play Button (Responsive for Mobile) */}
      <img
        src={playbtn}
        alt="play"
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 sm:bottom-40 sm:left-auto sm:translate-x-0"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row w-full justify-start items-start md:bottom-32 md:right-20 top-10 md:top-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center md:text-left"
        >
          <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold leading-tight text-customButton">
            {TEXT.title}
          </h1>
          <p className="mt-4 text-xl sm:text-base md:text-lg text-white md:text-black">
            {TEXT.subtitle}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/TryPages">
            <button
              className="bg-teal-600 hover:bg-customColor text-white px-6 py-3 rounded-lg w-full sm:w-auto transition duration-200 ease-in"
              aria-label="Get a quote now"
            >
              {TEXT.buttons.quote}
            </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Play Button (For Larger Screens) */}
        <img
          src={playbtn}
          alt="play"
          className="hidden md:block absolute -top-20 -translate-x"
        />
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
