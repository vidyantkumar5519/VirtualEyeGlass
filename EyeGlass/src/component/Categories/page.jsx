import { FaGlasses, FaStore, FaAward, FaTag, FaVrCardboard, FaRobot, FaEye } from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaGlasses size={40} />, 
    text: "Discover smart AR glasses that enhance your vision with real-time data overlays.",
  },
  {
    icon: <FaVrCardboard size={40} />, 
    text: "Try on eyewear virtually using our advanced VR fitting technology.",
  },
  {
    icon: <FaRobot size={40} />, 
    text: "Experience AI-powered vision enhancement for sharper, clearer sight.",
  },
  {
    icon: <FaEye size={40} />, 
    text: "Immerse yourself in a futuristic world with adaptive lenses for AR and VR.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="flex flex-col items-center md:flex-row justify-center gap-7 py-20 text-center text-gray-700">
      {FEATURES.map((feature, index) => (
        <div key={index} className="flex flex-col items-center max-w-xs">
          <div className="text-customColor mb-3">{feature.icon}</div>
          <p className="text-sm max-w-sm">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
