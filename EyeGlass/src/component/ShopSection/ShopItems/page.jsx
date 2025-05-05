import React, { useState, useEffect } from "react";
import img from "../../../assets/glasses/1.svg";
import TryOnModal from "../../TryNow/Page";

const products = [
  { 
    id: 1, 
    name: "Ray-Ban Aviator Classic", 
    price: 179.99, 
    img: img,
    brand: "Ray-Ban",
    category: "Glasses",
    rating: 5,
    inStock: true
  },
  { 
    id: 2, 
    name: "Oakley Holbrook", 
    price: 149.99, 
    img: img,
    brand: "Oakley",
    category: "Glasses",
    rating: 4,
    inStock: true
  },
  { 
    id: 3, 
    name: "Gucci GG0010S", 
    price: 399.99, 
    img: img,
    brand: "Gucci",
    category: "Optical",
    rating: 5,
    inStock: true
  },
  { 
    id: 4, 
    name: "Prada Linea Rossa", 
    price: 299.99, 
    img: img,
    brand: "Prada",
    category: "Optical",
    rating: 4,
    inStock: false
  },
  { 
    id: 5, 
    name: "Tom Ford FT5401", 
    price: 349.99, 
    img: img,
    brand: "Tom Ford",
    category: "Bifocal",
    rating: 5,
    inStock: true
  },
  { 
    id: 6, 
    name: "Persol PO3019S", 
    price: 259.99, 
    img: img,
    brand: "Persol",
    category: "Contact",
    rating: 4,
    inStock: true
  },
  { 
    id: 7, 
    name: "Persol PO3019S", 
    price: 259.99, 
    img: img,
    brand: "Persol",
    category: "Contact",
    rating: 4,
    inStock: true
  },
  { 
    id: 8, 
    name: "Persol PO3019S", 
    price: 259.99, 
    img: img,
    brand: "Persol",
    category: "Contact",
    rating: 4,
    inStock: true
  },
  { 
    id: 9, 
    name: "Persol PO3019S", 
    price: 259.99, 
    img: img,
    brand: "Persol",
    category: "Contact",
    rating: 4,
    inStock: true
  },
];

const ShopItems = ({ filters }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Apply filters when they change
  useEffect(() => {
    if (!filters) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => {
      // Filter by brand
      if (filters.brands?.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) {
        return false;
      }

      // Filter by rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Filter by availability
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [filters]);

  return (
    <div className="p-6">
      {/* Products Grid */}
      <h1 className="text-4xl text-center text-customColor font-bold p-4 mb-4">Try Now This Exclusive Look</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className=" rounded-lg  overflow-hidden">
            <div className="relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="p-4">
              {/* <div className="text-sm text-gray-500 mb-1">{product.brand}</div> */}
              <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              <div className="flex items-center mb-2">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {/* <p className="text-lg font-semibold">${product.price}</p> */}
                <button
                  className="text-orange-600 font-semibold flex items-center hover:text-orange-700 transition-colors"
                  onClick={() => setModalOpen(true)}
                  disabled={!product.inStock}
                >
                  Try Now <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Try-On Modal */}
      <TryOnModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ShopItems;
