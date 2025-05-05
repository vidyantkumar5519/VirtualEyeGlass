import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo.svg";

const NAV_LINKS = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/Shop" },
  { name: "About Us", link: "/About" },
  { name: "Contact", link: "/Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Track current route

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold">Eye Glasses</h1>
        </div>

        {/* Middle: Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6 text-customColor">
          {NAV_LINKS.map(({ name, link }) => (
            <Link
              key={link}
              to={link}
              className={`pb-1 border-b-2 transition-all ${
                location.pathname === link
                  ? "border-customColor font-semibold"
                  : "border-transparent hover:border-customColor"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Right: Search Bar & Profile Icon (Hidden in Mobile) */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EBEBEB] text-gray-700 rounded-full px-5 py-2 w-48 md:w-60 font-thin text-sm"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-500 text-md" />
          </div>

          <div className="relative">
            <img src={logo} alt="User Profile" className="w-10 h-10 rounded-full" />
            <span className="absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-xl text-gray-700">
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 flex flex-col space-y-6 z-[60]"
      >
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="self-end text-xl">
          <FaTimes />
        </button>

        {/* Navigation Links (Mobile) */}
        {NAV_LINKS.map(({ name, link }) => (
          <Link
            key={link}
            to={link}
            onClick={() => setIsOpen(false)} // Close menu on click
            className={`text-lg font-semibold ${
              location.pathname === link ? "text-customColor underline" : "text-gray-700"
            }`}
          >
            {name}
          </Link>
        ))}

        {/* Search Bar (Mobile) */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="bg-[#EBEBEB] text-gray-700 rounded-full px-5 py-2 w-full font-thin text-sm"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500 text-md" />
        </div>

        {/* Profile Icon */}
        <div className="flex items-center space-x-4 mt-4">
          <img src={logo} alt="User Profile" className="w-10 h-10 rounded-full" />
          <span className="bg-green-500 w-3 h-3 rounded-full border-2 right-6 bottom-3 border-white relative"></span>
        </div>
      </motion.div>

      {/* Overlay (Click to Close Sidebar) */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>}
    </nav>
  );
};

export default Navbar;
