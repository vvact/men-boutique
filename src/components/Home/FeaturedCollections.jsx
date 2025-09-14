import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categories/categorySlice";
import { useNavigate } from "react-router-dom";

export default function FeaturedCollections() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Function to handle horizontal scrolling with buttons
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gold-500 mb-3">Featured Collections</h2>
          <div className="h-1 w-16 bg-gold-600 mx-auto mb-3"></div>
          <p className="text-base text-navy-100 max-w-3xl mx-auto">
            Explore our curated categories to find exactly what you're looking for
          </p>
        </div>

        {/* Navigation buttons */}
        {!loading && !error && categories.length > 0 && (
          <div className="flex justify-end mb-4 space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-navy-700 text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-navy-700 text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex overflow-x-hidden gap-4 pb-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 bg-navy-800 rounded-lg shadow-sm overflow-hidden border border-navy-700 animate-pulse">
                <div className="h-32 bg-navy-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-navy-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 17.5l-1.5-4.5-1.5 4.5h-3l4.5-9 4.5 9h-3z"/>
                  </svg>
                </div>
                <div className="p-3">
                  <div className="h-3 bg-navy-700 rounded mb-2"></div>
                  <div className="h-2 bg-navy-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-base font-medium text-white mb-2">Unable to load collections</h3>
            <p className="text-navy-200 mb-4 text-sm">{error}</p>
            <button
              onClick={() => dispatch(fetchCategories())}
              className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-medium py-1.5 px-4 rounded-md transition duration-300 text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && categories.length === 0 && (
          <div className="bg-navy-800 border border-navy-700 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-navy-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-base font-medium text-white mb-1">No collections available</h3>
            <p className="text-navy-300 text-sm">Check back later for our featured collections.</p>
          </div>
        )}

        {/* Categories horizontal scroll */}
        {!loading && !error && categories.length > 0 && (
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-48 snap-start group relative h-40 cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up"
                  onClick={() => navigate(`/category/${category.slug}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-500 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 text-center">
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-gold-300 transition-colors">{category.name}</h3>
                    {category.product_count !== undefined && (
                      <span className="text-xs bg-gold-600 text-navy-900 px-2 py-0.5 rounded-full font-medium">
                        {category.product_count} {category.product_count === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}