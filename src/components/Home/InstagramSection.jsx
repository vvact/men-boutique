import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoments } from "../../features/products/momentSlice";

export default function InstagramSection() {
  const dispatch = useDispatch();
  const { moments, loading, error } = useSelector((state) => state.moments);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    dispatch(fetchMoments());
  }, [dispatch, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // Only use moments that are featured
  const featuredMoments = moments.filter((m) => m.is_featured);
  
  // Ensure we have exactly 6 items for the grid (or less with graceful fallback)
  const displayMoments = featuredMoments.slice(0, 6);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-navy-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gold-400">Follow Us on Instagram</h2>
          <p className="text-base text-navy-100 max-w-2xl mx-auto">
            Stay updated with our latest products and collections. Tag us with <span className="text-gold-500 font-medium">#OurBrand</span> for a chance to be featured!
          </p>
        </div>

        {loading ? (
          <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-48 bg-navy-800 rounded-lg animate-pulse overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-navy-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 17.5l-1.5-4.5-1.5 4.5h-3l4.5-9 4.5 9h-3z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-8 text-center mb-8 max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">Unable to load Instagram content</h3>
            <p className="text-navy-200 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Try Again
            </button>
          </div>
        ) : displayMoments.length === 0 ? (
          <div className="bg-navy-800 border border-navy-700 rounded-xl p-10 text-center mb-8 max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-navy-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-2">No Instagram posts yet</h3>
            <p className="text-navy-300">Check back later for updates or follow us on Instagram!</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-6 snap-x snap-mandatory mb-8">
            {displayMoments.map((moment, index) => (
              <a
                key={moment.id}
                href={moment.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0 w-48 h-48 snap-start transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`View Instagram post: ${moment.caption || ''}`}
              >
                <img
                  src={moment.image_url}
                  alt={moment.caption || "Instagram moment"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEzMkE0QiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNEOEIzNjUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
                  }}
                />
                {/* Hover overlay with Instagram icon */}
                <div className="absolute inset-0 bg-navy-900 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-500 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href="https://www.instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gold-600 text-navy-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-gold-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @yourusername
          </a>
        </div>
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