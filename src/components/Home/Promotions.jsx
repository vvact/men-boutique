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
      className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[500px] flex items-center justify-center text-center text-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl group"
      aria-label="Special promotions"
    >
      {/* Background image with loading state */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Summer sale promotion - Up to 50% off on seasonal items"
          className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} group-hover:scale-105`}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Gradient overlay for better text readability using brand colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 to-gold-500/20"></div>
      </div>

      {/* Animated badge / countdown - Responsive positioning and size */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-navy-900 rounded-full shadow-lg animate-pulse">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Limited Time!
        </span>
      </div>

      {/* Content with responsive text and spacing */}
      <div className="relative z-10 px-4 sm:px-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl transform transition-all duration-700 group-hover:scale-105">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
          Summer Sale <span className="text-gold-400">— Up to 50% Off!</span>
        </h2>
        <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg lg:text-xl opacity-95 px-2 sm:px-0 text-navy-100">
          Grab your favorites before they're gone! Limited stock available.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-gold-500 text-navy-900 font-bold px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-navy-900 text-base sm:text-lg hover:bg-gold-400"
          aria-label="Shop our summer sale"
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
}