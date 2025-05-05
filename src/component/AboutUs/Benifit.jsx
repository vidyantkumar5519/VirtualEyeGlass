import { FaLaptop, FaSync, FaGlasses, FaShoppingCart } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaLaptop className="text-3xl" />,
      text: "Try on eyewear virtually from the comfort of your home.",
    },
    {
      icon: <FaSync className="text-3xl" />,
      text: "Seamless real-time adjustments for the perfect fit.",
    },
    {
      icon: <FaGlasses className="text-3xl" />,
      text: "Choose from a wide range of frames with AI recommendations.",
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      text: "Shop instantly and get fast delivery to your doorstep.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center lg:text-left">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center lg:items-start space-y-5 p-2">
            {benefit.icon}
            <p className="text-sm">{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
