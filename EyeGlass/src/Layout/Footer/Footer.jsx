import React from 'react';
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoCall } from "react-icons/io5";

const Footer = () => {
  const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/Shop" },
    { name: "About Us", path: "/About" },
    { name: "Contact", path: "/contact" },
  ];
  const SERVICES_LINKS = [
    { name: "Sun Glasses", path: "/services/sunglasses" },
    { name: "Virtual Try-On", path: "/Shop" },
    { name: "Lens Fitting", path: "/services/lens-fitting" },
    { name: "Lens Upgrades", path: "/services/lens-upgrades" },
  ];  
  const CONTACT_INFO = {
    address: "123 Main St, Faisal Town, Punjab, India",
    phone: "+91 793 7407 940",
  };
  const SOCIAL_LINKS = [
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaYoutube, url: "https://youtube.com" },
  ];
  const FOOTER_LINKS = [
    { name: "Terms of Use", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
  ];  

  return (
    <footer className="bg-customColor text-white py-20">
      <div className="container mx-auto px-6 md:px-16 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-bold">Eye Glasses</h2>
            <p className="mt-3 text-gray-300">
              Eye Glasses has the perfect pair of glasses to complete your ensemble.
            </p>
            {/* Subscribe Section */}
            <h3 className="mt-5 text-lg font-semibold">Subscribe Us</h3>
            <div className="flex items-center mt-3 border w-72">
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 text-black w-52"
              />
              <button className=" text-white px-4 py-2 text-sm">
                Subscribe
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-3 mt-4">
              {SOCIAL_LINKS.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                  <social.icon className="text-4xl p-2 bg-white text-teal-800 rounded-full hover:bg-gray-300" />
                </a>
              ))}
            </div>
          </div>
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              {NAV_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="hover:text-white">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              {SERVICES_LINKS.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className="hover:text-white">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-3 text-gray-300">
              Our Support and Sales team is available 24/7 to answer your queries.
            </p>
            <div className="flex items-center mt-3 text-gray-300">
              <IoLocationSharp className="text-4xl text-white mr-2" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center mt-3 text-gray-300">
              <IoCall className="text-lg text-white mr-2" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-500 mt-6 pt-4 flex flex-col md:flex-row justify-between text-gray-300 text-sm">
          <p>Copyright © 2025 | Design by CodesAndMarketing</p>
          <div className="flex space-x-4">
            {FOOTER_LINKS.map((link, index) => (
              <a key={index} href={link.path} className="hover:text-white">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;