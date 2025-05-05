import React, { useState } from 'react';
import Crousel from "../../ShopSection/Crousel/page";
import ShopItems from "../../ShopSection/ShopItems/page";
import Filter from '../../Filter/Filter';
import OurAdvice from "../../ShopSection/OurAdvice/page"
import FramesCatalog from "../../FramesCatalog/FramesCatalog";
const Shop = () => {
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 1000],
    rating: 0
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <Crousel />
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

        <div className="block md:flex md:gap-6 relative">
          {/* Filter Section */}
          <aside className={`
            ${isFilterOpen ? 'block' : 'hidden'} 
            md:block 
            w-full md:w-64 
            md:flex-shrink-0 
            md:sticky 
            md:top-4
            z-20
            mb-6 md:mb-0
          `}>
            <Filter onFilterChange={handleFilterChange} />
          </aside>

          {/* Main Content - Shop Items */}
          <main className="flex-1">
          {/* <FramesCatalog /> */}

            <ShopItems filters={filters}/>
          </main>
        </div>
      </div>
      <OurAdvice/>

    </div>
  );
};

export default Shop;
