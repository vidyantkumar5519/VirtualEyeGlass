import React, { useState, useEffect } from "react";
import { Camera, Upload, Loader, Check, X, RefreshCw, Save, AlertTriangle } from "lucide-react";
import backgroundRemovalApi from "../../utils/api/backgroundRemoval";

const FrameUploadComponent = ({ 
  apiUrl = "http://71.138.22.131:8123",
  onSaveFrame,
  onError
}) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [frameData, setFrameData] = useState({
    frameName: "",
    brand: "",
    category: "Glasses",
    price: 0,
    rating: 5,
    inStock: true
  });
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showHelpTips, setShowHelpTips] = useState(true);
  
  // Check service health on component mount
  useEffect(() => {
    const checkServiceHealth = async () => {
      try {
        const health = await backgroundRemovalApi.checkHealth();
        setServiceStatus(health);
      } catch (error) {
        console.error("Health check failed:", error);
        setServiceStatus({ status: "unavailable" });
      }
    };
    
    checkServiceHealth();
    
    // Check if user has dismissed help tips before
    const hideHelpTips = localStorage.getItem('hideFrameUploadHelpTips');
    if (hideHelpTips) {
      setShowHelpTips(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (processedImage && processedImage.startsWith('blob:')) URL.revokeObjectURL(processedImage);
    };
  }, [preview, processedImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    try {
      if (!file.type.match("image.*")) throw new Error("Please select a valid image file");
      if (file.size > 10 * 1024 * 1024) throw new Error("File size too large (max 10MB)");

      setError(null);
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setProcessedImage(null);
      setSuccess(false);
      
      // Use filename as initial frame name
      const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setFrameData({
        ...frameData,
        frameName: fileName
      });
      
      // Clear form errors when uploading a new image
      setFormErrors({});
    } catch (err) {
      setError(err.message);
      if (onError) onError(err.message);
    }
  };

  const handleRemoveBackground = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }
    
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Use the processImage helper method with settings for glasses
      const resultImageUrl = await backgroundRemovalApi.processImage(image, {
        useSync: false,
        isGlasses: true, // Optimized for glasses frames
        alphaThreshold: 100,
        outputFormat: "png",
        onProgress: (progressValue) => {
          setProgress(progressValue);
        }
      });

      // Set the processed image
      setProcessedImage(resultImageUrl);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to remove background.");
      if (onError) onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!frameData.frameName.trim()) {
      errors.frameName = "Frame name is required";
    }

    if (!frameData.brand.trim()) {
      errors.brand = "Brand name is required";
    }
    
    if (frameData.price < 0) {
      errors.price = "Price cannot be negative";
    }
    
    if (frameData.rating < 1 || frameData.rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveFrame = () => {
    if (!processedImage) {
      setError("Please process the image first");
      return;
    }
    
    if (!validateForm()) {
      setError("Please fix the errors in the form");
      return;
    }

    // Prepare data to save to database
    const frameToSave = {
      name: frameData.frameName,
      brand: frameData.brand,
      category: frameData.category,
      price: parseFloat(frameData.price),
      img: processedImage, // The processed image URL or data
      rating: parseInt(frameData.rating),
      inStock: frameData.inStock
    };

    // Call the callback provided by parent component
    if (onSaveFrame) {
      onSaveFrame(frameToSave);
    }
  };

  const resetAll = () => {
    setImage(null);
    setPreview(null);
    setProcessedImage(null);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setFormErrors({});
    setFrameData({
      frameName: "",
      brand: "",
      category: "Glasses",
      price: 0,
      rating: 5,
      inStock: true
    });
  };

  // Form field handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFrameData({
      ...frameData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear individual error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const dismissHelpTips = () => {
    setShowHelpTips(false);
    localStorage.setItem('hideFrameUploadHelpTips', 'true');
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload New Frame</h1>
        
        {/* {serviceStatus && (
          <div className={`px-3 py-1 rounded-full text-sm flex items-center 
            ${serviceStatus.status === "healthy" ? "bg-green-100 text-green-800" : 
              serviceStatus.status === "unavailable" ? "bg-red-100 text-red-800" : 
              "bg-yellow-100 text-yellow-800"}`}>
            <div className={`w-2 h-2 rounded-full mr-2 
              ${serviceStatus.status === "healthy" ? "bg-green-500" : 
                serviceStatus.status === "unavailable" ? "bg-red-500" : 
                "bg-yellow-500"}`}></div>
            {serviceStatus.status === "healthy" ? "Background Removal Ready" : 
              serviceStatus.status === "unavailable" ? "Background Removal Offline" : 
              "Service Busy"}
          </div>
        )} */}
      </div>
      
      {/* Help tips card */}
      {showHelpTips && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
          <button 
            onClick={dismissHelpTips}
            className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
            aria-label="Dismiss tips"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-blue-800 mb-2">Tips for best results:</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
            <li>Use high-quality images with clear frames against contrasting backgrounds</li>
            <li>Ensure the entire frame is visible in the image</li>
            <li>Avoid images with shadows or reflections on the frames</li>
            <li>Front-facing images work best for automatic background removal</li>
          </ul>
        </div>
      )}

      {/* Offline warning */}
      {serviceStatus && serviceStatus.status === "unavailable" && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-red-700 text-sm">
            <p className="font-medium">Background removal service is currently offline</p>
            <p>You can still upload frames but background removal will not work. Please try again later or contact support if the issue persists.</p>
          </div>
        </div>
      )}

      {!preview && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById("file-input").click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex="0"
          aria-label="Upload frame image"
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">Drag & drop a frame image or click to upload</p>
          <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WEBP (Max 10MB)</p>
          <input 
            id="file-input" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
            aria-label="Upload frame image"
          />
        </div>
      )}

      {preview && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Original Image</h2>
              <div className="relative w-full h-64 border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img src={preview} alt="Original Preview" className="max-w-full max-h-full object-contain" />
              </div>
              <button 
                onClick={resetAll} 
                className="mt-4 text-blue-600 hover:text-blue-800 flex items-center px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                aria-label="Change image"
              >
                <RefreshCw className="w-4 h-4 mr-1" /> Change Image
              </button>
            </div>

            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {processedImage ? "Processed Frame" : "Result"}
              </h2>
              
              <div className="relative w-full h-64 border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin mb-2" aria-hidden="true" />
                    <div className="w-full max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Processing image... {progress}%</p>
                    </div>
                  </div>
                ) : processedImage ? (
                  <img 
                    src={processedImage} 
                    alt="Processed Frame" 
                    className="max-w-full max-h-full object-contain" 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Camera className="w-16 h-16 mb-2" aria-hidden="true" />
                    <p>Processed frame will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Process Button */}
          {!loading && !processedImage && (
            <div className="mt-6 flex justify-center">
              <button 
                onClick={handleRemoveBackground} 
                disabled={loading || !image || (serviceStatus && serviceStatus.status === "unavailable")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Remove background from image"
              >
                Remove Background
              </button>
            </div>
          )}

          {/* Frame Details Form */}
          {processedImage && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Frame Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="frameName" className="block text-sm font-medium text-gray-700 mb-1">
                    Frame Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="frameName"
                    name="frameName"
                    value={frameData.frameName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.frameName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                    aria-invalid={formErrors.frameName ? "true" : "false"}
                    aria-describedby={formErrors.frameName ? "frameName-error" : undefined}
                  />
                  {formErrors.frameName && (
                    <p id="frameName-error" className="mt-1 text-sm text-red-600">{formErrors.frameName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={frameData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.brand ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                    aria-invalid={formErrors.brand ? "true" : "false"}
                    aria-describedby={formErrors.brand ? "brand-error" : undefined}
                  />
                  {formErrors.brand && (
                    <p id="brand-error" className="mt-1 text-sm text-red-600">{formErrors.brand}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={frameData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Glasses">Glasses</option>
                    <option value="Optical">Optical</option>
                    <option value="Sunglasses">Sunglasses</option>
                    <option value="Bifocal">Bifocal</option>
                    <option value="Contact">Contact</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={frameData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    aria-invalid={formErrors.price ? "true" : "false"}
                    aria-describedby={formErrors.price ? "price-error" : undefined}
                  />
                  {formErrors.price && (
                    <p id="price-error" className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      id="rating"
                      name="rating"
                      value={frameData.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      step="1"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      aria-invalid={formErrors.rating ? "true" : "false"}
                      aria-describedby={formErrors.rating ? "rating-error" : undefined}
                    />
                    <span className="ml-2 min-w-[1.5rem] text-center">{frameData.rating}</span>
                  </div>
                  {formErrors.rating && (
                    <p id="rating-error" className="mt-1 text-sm text-red-600">{formErrors.rating}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={frameData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">In Stock</label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleSaveFrame}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center shadow-sm"
                  aria-label="Save frame to database"
                >
                  <Save className="w-5 h-5 mr-2" aria-hidden="true" /> Save Frame to Database
                </button>
              </div>
            </div>
          )}
          
          {success && processedImage && !error && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded flex items-center">
              <Check className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" /> 
              <span>Background removed successfully! Frame is ready to be saved.</span>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded flex items-center" role="alert">
              <X className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" /> 
              <span>{error}</span>
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>This tool automatically removes backgrounds from frame images and adds them to your shop.</p>
        <p>For best results, use images with clear frames against contrasting backgrounds.</p>
      </div>
    </div>
  );
};

export default FrameUploadComponent;