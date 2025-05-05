import React, { useState, useEffect } from "react";
import FrameUploadComponent from "../../component/BgRemove/BgRemove";

// Mock database service - replace with your actual database service
const frameDbService = {
  saveFrame: async (frameData) => {
    // This is where you would call your API to save the frame to your database
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        console.log("Frame saved to database:", frameData);
        // Generate a new ID for the frame
        const newFrame = {
          ...frameData,
          id: Date.now() // Simple way to generate a unique ID
        };
        resolve(newFrame);
      }, 1000);
    });
  },
  
  getFrames: async () => {
    // This is where you would call your API to fetch frames from your database
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        // Return the frames from your database
        resolve([]);
      }, 1000);
    });
  }
};

const FrameAdminPage = () => {
  const [savedFrames, setSavedFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load frames from database on component mount
  useEffect(() => {
    const loadFrames = async () => {
      setIsLoading(true);
      try {
        const frames = await frameDbService.getFrames();
        setSavedFrames(frames);
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to load frames from database"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFrames();
  }, []);

  const handleSaveFrame = async (frameData) => {
    setIsLoading(true);
    setNotification(null);
    
    try {
      const savedFrame = await frameDbService.saveFrame(frameData);
      
      // Add the new frame to the list
      setSavedFrames([savedFrame, ...savedFrames]);
      
      setNotification({
        type: "success",
        message: `Frame "${savedFrame.name}" has been saved successfully!`
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to save frame to database"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (errorMessage) => {
    setNotification({
      type: "error",
      message: errorMessage
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Frames Administration</h1>
      
      {notification && (
        <div className={`mb-6 p-4 rounded-md ${
          notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {notification.message}
        </div>
      )}
      
      {/* Frame Upload Component */}
      <FrameUploadComponent 
        onSaveFrame={handleSaveFrame}
        onError={handleError}
      />
      
      {/* Display saved frames */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Saved Frames</h2>
        
        {isLoading ? (
          <p className="text-center py-4">Loading frames...</p>
        ) : savedFrames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedFrames.map(frame => (
              <div key={frame.id} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={frame.img} 
                    alt={frame.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{frame.name}</h3>
                  <p className="text-sm text-gray-500">{frame.brand} - {frame.category}</p>
                  <p className="mt-1">${frame.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center">
                    {Array.from({ length: frame.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-1 text-sm">
                    {frame.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">No frames have been saved yet. Upload your first frame!</p>
        )}
      </div>
    </div>
  );
};

export default FrameAdminPage;