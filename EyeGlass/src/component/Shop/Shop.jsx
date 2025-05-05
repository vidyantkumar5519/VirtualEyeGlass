import React, { useState } from 'react';
import Filter from '../Filter/Filter';

const Shop = () => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 1000],
    rating: 0
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to products
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Toggle */}
      <button 
        className="md:hidden w-full bg-white p-3 rounded-lg shadow mb-4 flex items-center justify-between"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span className="text-lg font-semibold">Filters</span>
        <svg 
          className={`w-6 h-6 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="block md:flex md:gap-8 relative">
        {/* Filter Section - Hidden on mobile by default, shown when toggled */}
        <aside className={`
          ${isFilterOpen ? 'block' : 'hidden'} 
          md:block 
          w-full md:w-64 
          md:flex-shrink-0 
          sticky 
          top-0
          z-20
          mb-6 md:mb-0
        `}>
          <Filter onFilterChange={handleFilterChange} />
        </aside>

        {/* Main Content - Products Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product cards will go here */}
            {/* This is just a placeholder, replace with actual product data */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-medium">Product Name</h3>
                <p className="text-gray-600">$199.99</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
