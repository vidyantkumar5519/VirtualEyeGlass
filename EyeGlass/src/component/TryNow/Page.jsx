import React, { useState, useCallback } from "react";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import img from "../../assets/banner/Tb.svg";
import BgRemove from "../BgRemove/BgRemove"; 

const TryOn = React.lazy(() => import("../TryLenses/Lens1/Lens1"));

const TryOnModal = ({ isOpen, onClose }) => {
  const [activeMode, setActiveMode] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleClose = useCallback(() => {
    setActiveMode(null);
    setUploadedImage(null);
    onClose();
  }, [onClose]);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    setActiveMode("upload"); // Ensure it stays in upload mode
  };

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-50 p-4 md:p-0"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl md:rounded-3xl p-4 md:p-6 w-full max-w-[650px] relative shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-[80vh]"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 rounded-2xl md:rounded-3xl"
          style={{ backgroundImage: `url(${img})` }}
        />

        <button
          className="absolute top-2 right-2 md:top-4 md:right-4 p-2 text-red-600 hover:text-red-500 z-10 bg-white/30 backdrop-blur-sm rounded-full"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <AiOutlineClose size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="relative z-10">
          {activeMode === "live" ? (
            <React.Suspense 
              fallback={
                <div className="flex flex-col items-center justify-center h-[300px] md:h-[400px]">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-customColor border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 text-customColor font-light text-sm md:text-base">Initializing camera interface...</p>
                </div>
              }
            >
              <TryOn onClose={() => setActiveMode(null)} />
            </React.Suspense>
          ) : activeMode === "upload" ? (
            <BgRemove uploadedImage={uploadedImage} onImageProcessed={handleImageUpload} />
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-center mt-6 md:mt-8 mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-customColor">
                Virtual Eyewear Experience
              </h2>

              <div className="space-y-4 md:space-y-6 max-w-md mx-auto px-2 md:px-0">
                <button
                  onClick={() => setActiveMode("live")}
                  className="w-full flex items-center justify-center gap-2 md:gap-3 py-2.5 md:py-3 px-3 md:px-4 
                    bg-customColor rounded-lg md:rounded-xl font-medium text-white text-sm md:text-base
                    hover:opacity-90 transition-all duration-300
                    shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <AiOutlineCamera size={20} className="md:w-6 md:h-6" />
                  <span>Live Try-On</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <button
                    onClick={() => setActiveMode("model")}
                    className="flex items-center justify-center gap-2 py-2.5 md:py-3 px-3 md:px-4
                      bg-white/70 backdrop-blur-sm border border-customColor rounded-lg md:rounded-xl font-medium text-customColor
                      text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <FaUserAlt size={16} className="md:w-5 md:h-5" />
                    <span>Choose Model</span>
                  </button>

                  <button
                    onClick={() => setActiveMode("upload")}
                    className="flex items-center justify-center gap-2 py-2.5 md:py-3 px-3 md:px-4
                      bg-white/70 backdrop-blur-sm border border-customColor rounded-lg md:rounded-xl font-medium text-customColor
                      text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <MdFileUpload size={20} className="md:w-6 md:h-6" />
                    <span>Upload Photo</span>
                  </button>
                </div>
              </div>

              <p className="text-customColor text-center mt-4 md:mt-6 max-w-md mx-auto font-light text-xs md:text-sm lg:text-base px-2 md:px-0">
                Experience the future of eyewear with our advanced virtual try-on technology. See how frames complement your style before purchasing.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;
