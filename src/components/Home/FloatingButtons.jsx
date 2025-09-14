import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingButtons() {
  const navigate = useNavigate();
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show back-to-top button after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 bg-navy-800 text-gold-500 p-4 rounded-full shadow-lg hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 z-50 group border border-gold-500/20"
          aria-label="Back to top"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Tooltip */}
            <div className={`absolute -top-10 -left-10 bg-navy-900 text-white text-xs px-2 py-1 rounded-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              Back to top
            </div>
          </div>
        </button>
      )}

      {/* Floating Shop Now Button */}
      <button
        onClick={() => navigate("/products")}
        className="fixed bottom-5 right-5 bg-gold-600 text-navy-900 font-bold px-5 py-3 rounded-full shadow-lg hover:bg-gold-500 transition-all duration-300 z-50 flex items-center group border-2 border-gold-500"
        aria-label="Shop Now"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Shop Now
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    </>
  );
}