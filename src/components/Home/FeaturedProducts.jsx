import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../../features/products/featuredProductsSlice";
import ProductCard from "../../components/ProductCard";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const { products, loading, error } = useSelector(
    (state) => state.featured
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
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
          <div className="inline-flex items-center justify-center px-3 py-1 bg-gold-500 text-navy-900 rounded-full text-sm font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Customer Favorites
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gold-400 mb-3">Featured Products</h2>
          <p className="text-base text-navy-100 max-w-3xl mx-auto">
            Discover our most popular and trending items. Carefully selected for their quality and customer satisfaction.
          </p>
        </div>

        {/* Navigation buttons */}
        {!loading && !error && products.length > 0 && (
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
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64 bg-navy-800 rounded-xl shadow-sm overflow-hidden border border-navy-700 animate-pulse">
                <div className="h-48 bg-navy-700 flex items-center justify-center">
                  <svg className="w-12 h-12 text-navy-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 17.5l-1.5-4.5-1.5 4.5h-3l4.5-9 4.5 9h-3z"/>
                  </svg>
                </div>
                <div className="p-4">
                  <div className="h-4 bg-navy-700 rounded mb-3"></div>
                  <div className="h-3 bg-navy-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-navy-700 rounded w-1/3"></div>
                    <div className="h-8 w-8 bg-navy-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">Unable to load featured products</h3>
            <p className="text-navy-200 mb-6">{error}</p>
            <button
              onClick={() => dispatch(fetchFeaturedProducts())}
              className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-10 text-center max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-navy-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No featured products available</h3>
            <p className="text-navy-300">Check back later for our featured selections.</p>
          </div>
        )}

        {/* Products horizontal scroll */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="relative">
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-6 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0 w-64 snap-start animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* View all products CTA */}
            <div className="text-center mt-12">
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-900 bg-gold-600 hover:bg-gold-500 transition-colors duration-300"
              >
                View All Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </>
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
};

export default FeaturedProducts;