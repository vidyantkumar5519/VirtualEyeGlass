import React, { useState } from 'react';
import ContactIcon from '../../assets/icons/4.svg';
import GlassesIcon from '../../assets/icons/3.svg';
import BifocalIcon from '../../assets/icons/2.svg';
import OpticalIcon from '../../assets/icons/1.svg';

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const brands = [
    'Ray-Ban',
    'Oakley',
    'Gucci',
    'Prada',
    'Tom Ford',
    'Persol'
  ];

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    updateFilters({ brands: updatedBrands });
  };

  const handlePriceChange = (e) => {
    const value = [...priceRange];
    value[e.target.dataset.index] = parseInt(e.target.value);
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };

  const updateFilters = (updates) => {
    const newFilters = {
      brands: selectedBrands,
      priceRange,
      rating: selectedRating,
      category: selectedCategory,
      inStockOnly, 
      ...updates
    };
    onFilterChange?.(newFilters);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    updateFilters({ rating });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    updateFilters({ category: category === selectedCategory ? null : category });
  };

  const handleInStockChange = (e) => {
    setInStockOnly(e.target.checked);
    updateFilters({ inStockOnly: e.target.checked });
  };

  return (
   <>
    <div className='relative  lg:right-16 lg:top-12 '>
      <h2 className="text-2xl text-left text-customColor font-semibold p-4 ">Filters</h2>
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="p-4">
   
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
  {[
    { name: 'Contact', icon: ContactIcon },
    { name: 'Glasses', icon: GlassesIcon },
    { name: 'Bifocal', icon: BifocalIcon },
    { name: 'Optical', icon: OpticalIcon }
  ].map(category => (
    <div
      key={category.name}
      onClick={() => handleCategoryChange(category.name)}
      className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
        selectedCategory === category.name
          ? 'bg-blue-50 border-blue-300'
          : 'hover:shadow-md'
      }`}
    >
      <img src={category.icon} alt={category.name} className="w-24 h-24 text-gray-600" />
      <span className="text-center font-medium text-gray-700">{category.name}</span>
    </div>
  ))}
</div>

      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleInStockChange}
              className="form-checkbox text-blue-600"
            />
            <span>Show Only In Stock Items</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              value={priceRange[0]}
              data-index="0"
              onChange={handlePriceChange}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              data-index="1"
              onChange={handlePriceChange}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange({ target: { value: e.target.value, dataset: { index: 1 } } })}
            className="w-full"
          />
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Brand</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="form-checkbox text-blue-600"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="form-radio text-blue-600"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500">({rating} stars)</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
   </>
  );
};

export default Filter;
