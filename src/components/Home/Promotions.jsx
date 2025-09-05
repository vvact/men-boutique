import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Promotions() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading state for the image
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center text-center text-white rounded-lg md:rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      aria-label="Special promotions"
    >
      {/* Background image with loading state */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Summer sale promotion - Up to 50% off on seasonal items"
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      </div>

      {/* Animated badge / countdown - Responsive positioning and size */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-lg animate-pulse">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Limited Time!
        </span>
      </div>

      {/* Content with responsive text and spacing */}
      <div className="relative z-10 px-3 sm:px-4 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl transform transition-all duration-700 hover:scale-105">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
          Summer Sale <span className="text-yellow-300">— Up to 50% Off!</span>
        </h2>
        <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg lg:text-xl opacity-95 px-2 sm:px-0">
          Grab your favorites before they're gone! Limited stock available.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-white text-blue-600 font-bold px-5 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 text-sm sm:text-base"
          aria-label="Shop our summer sale"
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 inline-block ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
}