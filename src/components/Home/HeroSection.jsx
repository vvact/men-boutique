import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Public folder images with fallbacks
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  // Fallback images in case the specified ones don't load
  const fallbackImages = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload images
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(images.map(src => loadImage(src).catch(() => loadImage(fallbackImages[images.indexOf(src)]))))
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // Even if images fail, show something
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            index === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-110"
          }`}
          style={{ 
            backgroundImage: `url(${img})`,
            filter: index === currentIndex ? 'brightness(0.7)' : 'brightness(0.5)'
          }}
        >
          {/* Fallback if image doesn't load */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center">
              <div className="animate-pulse text-gold-500 text-lg">Loading...</div>
            </div>
          )}
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/30 z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 to-transparent z-25"></div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-2xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 text-gold-400 drop-shadow-md">
          Manwell
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-6 text-gold-200 italic font-light drop-shadow">
          Where Street Meets Sleek
        </p>
        <p className="text-lg mb-8 text-navy-100 max-w-md mx-auto">
          Discover premium men's fashion that blends urban style with sophisticated elegance.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/products")}
            className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Collection
          </button>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gold-500 scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
}