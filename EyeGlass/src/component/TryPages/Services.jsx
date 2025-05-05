import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoEyeOutline, IoGlassesOutline } from 'react-icons/io5';
import { BsCameraReels } from 'react-icons/bs';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';

const services = [
  {
    id: 1,
    icon: <IoEyeOutline className="text-3xl" />,
    title: 'Eye Exams',
    description: 'Vestibulum facilisis velit amet lacus.',
  },
  {
    id: 2,
    icon: <IoGlassesOutline className="text-3xl" />,
    title: 'Lens Fitting',
    description: 'Vestibulum facilisis velit amet lacus.',
  },
  {
    id: 3,
    icon: <BsCameraReels className="text-3xl" />,
    title: 'Lens Upgrades',
    description: 'Vestibulum facilisis velit amet lacus.',
  },
  {
    id: 4,
    icon: <HiOutlineComputerDesktop className="text-3xl" />,
    title: 'Virtual Try-On',
    description: 'Vestibulum facilisis velit amet lacus.',
  },
];

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="w-12 h-12 bg-[#355561] rounded-lg flex items-center justify-center text-white mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="text-customColor font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300">
      Learn more <FaArrowRight className="text-sm" />
    </button>
  </div>
);

const Services = () => {
  return (
   <div className=''>
     <section className="py-16 bg-[#F4E1CE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900">Our Services</h2>
          <button className="text-customColor font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300">
            See All Services <FaArrowRight className="text-sm" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
   </div>
  );
};

export default Services;
