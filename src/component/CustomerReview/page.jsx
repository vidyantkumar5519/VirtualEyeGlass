import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import img1 from "../../assets/reviews/1.svg"; // Example image

const reviewsData = [
  {
    id: 1,
    name: "Muhammad Umer",
    role: "Customer",
    rating: 5,
    review:
      "I recently purchased a pair of glasses from this website and I am extremely disappointed with the quality. The glasses feel cheap and flimsy, and they also arrived with a scratch on the lens. I will not be buying from this site again.",
    image: img1,
    score: 4.8,
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Verified Buyer",
    rating: 4,
    review:
      "The glasses are stylish and lightweight, but the packaging could have been better. Overall, a decent purchase for the price.",
    image: img1,
    score: 4.2,
  },
  {
    id: 3,
    name: "John Doe",
    role: "Customer",
    rating: 5,
    review:
      "Fantastic quality! The frame is sturdy, and the lenses are crystal clear. Definitely worth the purchase.",
    image: img1,
    score: 4.9,
  },
];

const CustomerReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Auto change review every 2000ms (2s)
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentReview]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) =>
      prev === 0 ? reviewsData.length - 1 : prev - 1
    );
  };

  const { name, role, rating, review, image, score } = reviewsData[currentReview];

  return (
    <div className="relative">
      {/* Background Styling */}
      <h2 className="text-4xl font-bold text-center text-teal-900 mb-6">
        Customer Reviews
      </h2>
      <div className="absolute inset-0 h-1/2"></div>
      <div className="absolute inset-0 top-1/2 h-1/2 bg-customColor"></div>

      {/* Review Card */}
      <div className="relative max-w-7xl mx-auto bg-white shadow-lg rounded-xl px-10 py-6 mt-10 min-h-[350px] flex items-center transition-all duration-500 ease-in-out">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          {/* Left Arrow */}
          <FaChevronLeft
            className="cursor-pointer hover:text-teal-600 text-2xl hidden lg:block"
            onClick={prevReview}
          />

          {/* Left Section - Customer Review */}
          <div className="flex flex-col items-center text-center w-full md:w-2/3">
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md"
            />
            <div className="flex text-yellow-500 my-2">
              {[...Array(rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
            <p className="text-gray-600 mt-4 px-4 md:px-8 max-h-[100px] overflow-hidden transition-all duration-500">
              {review}
            </p>

            {/* Indicator Dots */}
            <div className="flex gap-2 mt-4">
              {reviewsData.map((_, index) => (
                <span
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-500 ${
                    index === currentReview ? "bg-teal-600" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>

          {/* Right Section - Review Score */}
          <div className="flex flex-col w-full md:w-1/3 items-center">
            <div className="flex items-center text-3xl font-bold text-gray-700">
              {score} <FaStar className="text-yellow-500 ml-2" />
            </div>
            <div className="w-full mt-4">
              {[5, 4, 3, 2, 1].map((r, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600 text-sm mb-1"
                >
                  <span>{r}</span>
                  <div className="w-32 bg-gray-300 rounded-full h-2 relative">
                    {r === rating && (
                      <div className="absolute top-0 left-0 bg-yellow-500 h-2 w-[50%] rounded-full"></div>
                    )}
                  </div>
                  <span>{r === rating ? `${score}%` : "0.0%"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <FaChevronRight
            className="cursor-pointer hover:text-teal-600 text-2xl hidden lg:block"
            onClick={nextReview}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
