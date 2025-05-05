import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Filter, Search } from "lucide-react";

const FramesCatalog = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: "all",
    brand: "all",
    inStock: false,
    priceRange: [0, 1000],
    searchQuery: ""
  });
  
  // Load frames from localStorage
  useEffect(() => {
    const loadFrames = () => {
      setLoading(true);
      try {
        // Get frames from localStorage
        const savedFrames = JSON.parse(localStorage.getItem('frames') || '[]');
        setFrames(savedFrames);
        console.log("Loaded frames for frontend:", savedFrames);
      } catch (error) {
        console.error("Error loading frames:", error);
        setError("Failed to load frames. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadFrames();
    
    // Add event listener for localStorage changes (for when admin adds new frames)
    window.addEventListener('storage', loadFrames);
    
    return () => {
      window.removeEventListener('storage', loadFrames);
    };
  }, []);
  
  // Get unique categories and brands for filter dropdowns
  const categories = ["all", ...new Set(frames.map(frame => frame.category))];
  const brands = ["all", ...new Set(frames.map(frame => frame.brand))];
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter({
      ...filter,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  // Apply filters to frames
  const filteredFrames = frames.filter(frame => {
    // Category filter
    if (filter.category !== "all" && frame.category !== filter.category) return false;
    
    // Brand filter
    if (filter.brand !== "all" && frame.brand !== filter.brand) return false;
    
    // In stock filter
    if (filter.inStock && !frame.inStock) return false;
    
    // Price range filter
    if (frame.price < filter.priceRange[0] || frame.price > filter.priceRange[1]) return false;
    
    // Search query
    if (filter.searchQuery && !frame.name.toLowerCase().includes(filter.searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  // Add frame to cart (example function)
  const addToCart = (frame) => {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if frame is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === frame.id);
    
    if (existingItemIndex >= 0) {
      // Increase quantity if already in cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.push({
        ...frame,
        quantity: 1
      });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation (you could replace with a proper notification system)
    alert(`${frame.name} added to cart!`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Eyewear Collection</h1>
      
      {/* Search and Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">Search Frames</label>
            <div className="relative">
              <input
                type="text"
                id="searchQuery"
                name="searchQuery"
                value={filter.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search by name..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category === "all" ? "All Categories" : category}</option>
              ))}
            </select>
          </div>
          
          {/* Brand Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              id="brand"
              name="brand"
              value={filter.brand}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand === "all" ? "All Brands" : brand}</option>
              ))}
            </select>
          </div>
          
          {/* In Stock Filter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={filter.inStock}
              onChange={handleFilterChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">In Stock Only</label>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredFrames.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Filter className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No frames found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {frames.length === 0 
              ? "There are no frames in the catalog yet."
              : "Try adjusting your filters to find what you're looking for."}
          </p>
        </div>
      ) : (
        /* Frames Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFrames.map(frame => (
            <div key={frame.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img 
                  src={frame.img} 
                  alt={frame.name} 
                  className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-300" 
                />
                {!frame.inStock && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{frame.name}</h3>
                <p className="text-sm text-gray-500">{frame.brand} - {frame.category}</p>
                <div className="mt-2 flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < frame.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({frame.rating}/5)</span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-lg font-bold">${frame.price.toFixed(2)}</p>
                  <button 
                    onClick={() => addToCart(frame)} 
                    disabled={!frame.inStock}
                    className={`flex items-center p-2 rounded-full ${
                      frame.inStock 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Frame Count */}
      {!loading && frames.length > 0 && (
        <p className="mt-6 text-sm text-gray-600 text-right">
          Showing {filteredFrames.length} of {frames.length} frames
        </p>
      )}
    </div>
  );
};

export default FramesCatalog;