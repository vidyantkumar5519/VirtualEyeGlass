import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import './Lens1.css';

const EyewearTryOn = () => {
  // State
  const [activeScreen, setActiveScreen] = useState('start');
  const [connectionStatus, setConnectionStatus] = useState({
    state: 'disconnected',
    message: 'Not connected'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guidesEnabled, setGuidesEnabled] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputVideoRef = useRef(null);
  const socketRef = useRef(null);
  const clientIdRef = useRef(`client_${Math.random().toString(36).substring(2, 15)}`);
  
  // Processing state refs
  const isConnectedRef = useRef(false);
  const isProcessingRef = useRef(false);
  const lastFrameTimeRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);
  const pingIntervalRef = useRef(null);

  // Configuration
  const config = {
    websocketUrl: 'ws://71.138.22.131:8000/ws/',
    frameRate: 24,
    jpegQuality: 0.92,
    reconnectInterval: 3000,
    pingInterval: 30000
  };

  // Setup camera
  const setupCamera = useCallback(async () => {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      }
    };
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        return new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => {
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
            resolve();
          };
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Camera access denied. Please allow camera access and try again.');
      setConnectionStatus({
        state: 'disconnected',
        message: 'Camera error'
      });
      throw error;
    }
  }, []);

  // Connect to WebSocket server
  const connectWebSocket = useCallback(() => {
    setConnectionStatus({
      state: 'connecting',
      message: 'Connecting...'
    });
    
    socketRef.current = new WebSocket(`${config.websocketUrl}${clientIdRef.current}`);
    
    socketRef.current.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
      isConnectedRef.current = true;
      setConnectionStatus({
        state: 'connected',
        message: 'Connected'
      });
      
      setIsLoading(false);
      requestAnimationFrame(sendFrame);
      setupPingInterval();
    });
    
    socketRef.current.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      isConnectedRef.current = false;
      setConnectionStatus({
        state: 'disconnected',
        message: 'Disconnected'
      });
      
      clearInterval(pingIntervalRef.current);
      scheduleReconnect();
    });
    
    socketRef.current.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
      isConnectedRef.current = false;
      setConnectionStatus({
        state: 'disconnected',
        message: 'Connection error'
      });
      
      setError('Connection error. please check your network.');
    });
    
    socketRef.current.addEventListener('message', (event) => {
      handleServerMessage(event.data);
    });
  }, [config.websocketUrl]);

  // Disconnect from WebSocket server
  const disconnectWebSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    
    clearInterval(pingIntervalRef.current);
    clearTimeout(reconnectTimeoutRef.current);
  }, []);

  // Schedule reconnection
  const scheduleReconnect = useCallback(() => {
    clearTimeout(reconnectTimeoutRef.current);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log('Attempting to reconnect...');
      connectWebSocket();
    }, config.reconnectInterval);
  }, [connectWebSocket, config.reconnectInterval]);

  // Set up ping interval
  const setupPingInterval = useCallback(() => {
    clearInterval(pingIntervalRef.current);
    
    pingIntervalRef.current = setInterval(() => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send('ping');
      }
    }, config.pingInterval);
  }, [config.pingInterval]);

  // Send a frame
  const sendFrame = useCallback((timestamp) => {
    if (!isConnectedRef.current) return;
    
    if (timestamp - lastFrameTimeRef.current < (1000 / config.frameRate)) {
      requestAnimationFrame(sendFrame);
      return;
    }
    
    lastFrameTimeRef.current = timestamp;
    
    if (isProcessingRef.current) {
      requestAnimationFrame(sendFrame);
      return;
    }
    
    const canvasContext = canvasRef.current.getContext('2d');
    canvasContext.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const frameData = canvasRef.current.toDataURL('image/jpeg', config.jpegQuality);
    
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      isProcessingRef.current = true;
      socketRef.current.send(frameData);
    }
    
    requestAnimationFrame(sendFrame);
  }, [config.frameRate, config.jpegQuality]);

  // Handle server messages
  const handleServerMessage = useCallback((data) => {
    if (data === 'pong') return;
    
    if (typeof data === 'string' && data.startsWith('{')) {
      try {
        const message = JSON.parse(data);
        console.log('Received message:', message);
        return;
      } catch (e) {
        // Not JSON, continue as image
      }
    }
    
    if (typeof data === 'string' && data.startsWith('data:image/jpeg;base64,')) {
      if (outputVideoRef.current) {
        outputVideoRef.current.src = data;
      }
      isProcessingRef.current = false;
    }
  }, []);

  // Start try-on
  const startTryOn = useCallback(() => {
    setActiveScreen('tryOn');
    setIsLoading(true);
    setError(null);
    
    setupCamera()
      .then(() => {
        connectWebSocket();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        setError('Camera access denied. Please allow camera access and try again.');
      });
  }, [setupCamera, connectWebSocket]);

  // Stop try-on
 const stopTryOn = useCallback(() => {
  disconnectWebSocket();
  
  if (videoRef.current && videoRef.current.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => {
      track.stop();  // Stop each track
    });
    videoRef.current.srcObject = null;  // Remove the reference
  }
  
  setActiveScreen('start');
  isConnectedRef.current = false;
  isProcessingRef.current = false;
}, [disconnectWebSocket]);


  // Toggle guides
  const toggleGuides = useCallback(() => {
    const newGuidesState = !guidesEnabled;
    setGuidesEnabled(newGuidesState);
    
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const command = {
        action: 'toggle_guides',
        enabled: newGuidesState
      };
      socketRef.current.send(JSON.stringify(command));
    }
  }, [guidesEnabled]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      
      disconnectWebSocket();
      clearInterval(pingIntervalRef.current);
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [disconnectWebSocket]);

  return (
    <div className="relative min-h-[600px] ">
      {/* Start Screen */}
      {activeScreen === 'start' && (
        <div className="flex flex-col items-center justify-center min-h-[600px] p-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Virtual Eyewear Try-On</h1>
          <p className="text-gray-600 mb-8 max-w-md">Experience our eyewear collection with our virtual try-on tool</p>
          <button 
            className="bg-customColor text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
            onClick={startTryOn}
          >
            Start Try-On
          </button>
        </div>
      )}

      {/* Try-On Screen */}
      {activeScreen === 'tryOn' && (
        <div className="relative min-h-[600px]">
          <div className="  p-4 flex items-center justify-between">
            <button 
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              onClick={stopTryOn}
            >
              <IoArrowBack className="text-xl" />
              <span>Back</span>
            </button>
            
            <div className={`flex items-center gap-2 ${
              connectionStatus.state === 'connected' ? 'text-green-600' :
              connectionStatus.state === 'connecting' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus.state === 'connected' ? 'bg-green-600' :
                connectionStatus.state === 'connecting' ? 'bg-yellow-600' :
                'bg-red-600'
              }`}></div>
              <span className="text-sm">{connectionStatus.message}</span>
            </div>
            
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                guidesEnabled 
                  ? 'bg-customColor text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={toggleGuides}
            >
              {guidesEnabled ? 'Hide Guides' : 'Show Guides'}
            </button>
          </div>

          <div className="relative aspect-video min-h-[500px] w-full mx-auto mt-2">
            <video 
              ref={videoRef}
              className="hidden"
              autoPlay
              playsInline
            />
            
            <canvas 
              ref={canvasRef}
              className="hidden"
            />
            
            <img 
              ref={outputVideoRef}
              className="w-full h-full object-contain rounded-lg"
              alt="Virtual try-on output"
            />
          </div>
          
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black  bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="w-12 h-12 border-4 border-customColor border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-900">Connecting to camera...</p>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg text-center max-w-md mx-4">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  className="bg-customColor text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all"
                  onClick={startTryOn}
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EyewearTryOn;