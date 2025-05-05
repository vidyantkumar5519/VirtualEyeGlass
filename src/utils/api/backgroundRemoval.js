const API_URL = "http://71.138.22.131:8123";

/**
 * API utility for background removal service
 */
const backgroundRemovalApi = {
  /**
   * Check the health status of the background removal service
   * @returns {Promise<Object>} Service health status and statistics
   */
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Health check error:", error.message);
      throw error;
    }
  },

  /**
   * Remove background from an image asynchronously
   * @param {File} imageFile - The image file to process
   * @param {Object} options - Optional parameters
   * @param {boolean} options.isGlasses - Whether the image contains eyeglasses
   * @param {number} options.alphaThreshold - Threshold for alpha channel transparency (0-255)
   * @param {string} options.outputFormat - Output format ("png" or "jpeg")
   * @returns {Promise<string>} Job ID for tracking the background removal process
   */
  removeBackground: async (imageFile, options = {}) => {
    if (!imageFile) throw new Error("No image provided");

    const { 
      isGlasses = true,
      alphaThreshold = 100,
      outputFormat = "png"
    } = options;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("is_glasses", isGlasses.toString());
    formData.append("alpha_threshold", alphaThreshold.toString());
    formData.append("output_format", outputFormat);

    try {
      const response = await fetch(`${API_URL}/remove-background`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Job ID:", data.job_id);
      return data.job_id;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  },

  /**
   * Check the status of a background removal job
   * @param {string} jobId - The job ID returned from removeBackground
   * @returns {Promise<Object>} Job status and result information
   */
  checkJobStatus: async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/job/${jobId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to get job status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  },

  /**
   * Remove background from an image synchronously (blocking)
   * @param {File} imageFile - The image file to process
   * @param {Object} options - Optional parameters
   * @param {boolean} options.isGlasses - Whether the image contains eyeglasses
   * @param {number} options.alphaThreshold - Threshold for alpha channel transparency (0-255)
   * @param {string} options.outputFormat - Output format ("png" or "jpeg")
   * @returns {Promise<string>} Base64 encoded image data with background removed
   */
  removeBackgroundSync: async (imageFile, options = {}) => {
    if (!imageFile) throw new Error("No image provided");

    const { 
      isGlasses = true,
      alphaThreshold = 100,
      outputFormat = "png"
    } = options;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("is_glasses", isGlasses.toString());
    formData.append("alpha_threshold", alphaThreshold.toString());
    formData.append("output_format", outputFormat);

    try {
      const response = await fetch(`${API_URL}/remove-background-sync`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      const data = await response.json();
      return data.image;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  },

  /**
   * Process an image and notify when done (helper method)
   * @param {File} imageFile - The image file to process
   * @param {Object} options - Configuration options
   * @param {boolean} options.useSync - Whether to use synchronous processing
   * @param {boolean} options.isGlasses - Whether the image contains eyeglasses
   * @param {number} options.alphaThreshold - Threshold for alpha channel transparency
   * @param {string} options.outputFormat - Output format ("png" or "jpeg")
   * @param {function} options.onProgress - Progress callback (0-100)
   * @returns {Promise<string>} URL or data URL of the processed image
   */
  processImage: async (imageFile, options = {}) => {
    const { 
      useSync = false,
      isGlasses = true,
      alphaThreshold = 100,
      outputFormat = "png",
      onProgress = () => {}
    } = options;

    try {
      // Check service health first
      const health = await backgroundRemovalApi.checkHealth();
      console.log("Service health:", health);
      
      // Use synchronous endpoint if requested
      if (useSync) {
        onProgress(10);
        const imageData = await backgroundRemovalApi.removeBackgroundSync(imageFile, {
          isGlasses,
          alphaThreshold,
          outputFormat
        });
        onProgress(100);
        return imageData; // Return the base64 data directly
      }
      
      // Otherwise use async flow with polling
      onProgress(10);
      const jobId = await backgroundRemovalApi.removeBackground(imageFile, {
        isGlasses,
        alphaThreshold,
        outputFormat
      });
      
      onProgress(20);
      
      // Poll for job status
      let resultImageUrl = null;
      for (let i = 0; i < 20; i++) { // Try more times (20 instead of 10)
        await new Promise(res => setTimeout(res, 2000)); // Reduced wait time to 2 sec
        
        // Update progress (20% to 90%)
        const progressValue = 20 + Math.min(70, i * 3.5);
        onProgress(Math.round(progressValue));
        
        const jobStatus = await backgroundRemovalApi.checkJobStatus(jobId);
        
        if (jobStatus.status === "completed" && (jobStatus.output_url || jobStatus.result)) {
          resultImageUrl = jobStatus.output_url || jobStatus.result;
          break;
        }
        
        if (jobStatus.status === "failed") {
          throw new Error(jobStatus.error || "Processing failed");
        }
      }
      
      if (!resultImageUrl) throw new Error("Processing timed out");
      
      onProgress(100);
      return resultImageUrl;
    } catch (error) {
      console.error("Processing error:", error);
      throw error;
    }
  }
};

export default backgroundRemovalApi;