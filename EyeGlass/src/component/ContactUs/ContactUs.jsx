import React from 'react';
import { FaXTwitter,FaFacebookF,FaInstagram,FaPhone  } from "react-icons/fa6";
import { MdOutlineLocalPhone ,MdOutlineEmail,MdOutlineLocationOn  } from "react-icons/md";
const ContactForm = () => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6 mt-10">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold p-2">Contact Us</h2>
        <p className="text-sm text-gray-500">Any question or remarks? Just write us a message!</p>
      </div>
      
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left side - Contact Information */}
        <div className="bg-teal-800 text-white p-8 relative md:w-1/3">
          <h3 className="text-xl font-medium mb-6">Contact Information</h3>
          <p className="text-sm text-gray-300 mb-8">Say something to start a live chat!</p>
          
          <div className="space-y-6">
            <div className="flex items-center"> 
              <div className="w-6 h-6 flex text-2xl items-center justify-center mr-4">
              <MdOutlineLocalPhone />
              </div>
              <span>+91 8786564566</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center  text-2xl justify-center mr-4">
              <MdOutlineEmail />
              </div>
              <span>demo@gmail.com</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center text-2xl justify-center mr-4">
              <MdOutlineLocationOn />
              </div>
              <span className="text-sm">132 Dartmouth Street Boston, Massachusetts 02156 United States</span>
            </div>
          </div>
          
          {/* Social icons */}
          <div className="absolute bottom-2 lg:bottom-4 left-40 lg:left-8 flex space-x-4 ">
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
            <FaXTwitter />
            </div>
            
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
            <FaFacebookF />
            </div>
            
            <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
            <FaInstagram />
            </div>
          </div>
          
          {/* Circle overlaps */}
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-teal-700 opacity-30 rounded-full -mr-16 -mb-16"></div>
          <div className="absolute right-12 bottom-12 w-24 h-24 bg-teal-700 opacity-30 rounded-full"></div>
        </div>
        
        {/* Right side - Form */}
        <div className="bg-white p-8 md:w-2/3">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs text-gray-500 mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-1"
                  placeholder=""
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-1"
                  placeholder=""
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-1"
                  placeholder=""
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-1"
                  placeholder="+91 012 3456 789"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-xs text-gray-500 mb-3">Select Subject?</label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <input type="radio" id="general" name="subject" className="mr-2" />
                  <label htmlFor="general" className="text-sm">General Inquiry</label>
                </div>
                
                <div className="flex items-center">
                  <input type="radio" id="service" name="subject" className="mr-2" />
                  <label htmlFor="service" className="text-sm">Service Inquiry</label>
                </div>
                
                <div className="flex items-center">
                  <input type="radio" id="product" name="subject" className="mr-2" />
                  <label htmlFor="product" className="text-sm">Product Inquiry</label>
                </div>
                
                <div className="flex items-center">
                  <input type="radio" id="partnership" name="subject" className="mr-2" />
                  <label htmlFor="partnership" className="text-sm">Partnership</label>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-xs text-gray-500 mb-1">Message</label>
              <textarea 
                className="w-full border-b border-gray-300 focus:border-teal-500 outline-none py-1"
                placeholder="Write your message..."
                rows={3}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="bg-teal-800 text-white px-6 py-3 rounded-md float-right hover:bg-teal-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;