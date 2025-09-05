import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartBackend, fetchCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const discountPercentage =
    product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) * 100
        )
      : 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addToCartBackend({ product_id: product.id, quantity: 1 })
      ).unwrap();
      dispatch(fetchCart()); // refresh cart after adding
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link
        to={`/products/${product.slug}`}
        className="relative flex-grow flex flex-col"
      >
        {/* Sale badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            -{discountPercentage}%
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-500 z-10"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Product image */}
        <div className="relative w-full bg-gray-100 flex items-center justify-center min-h-48">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          )}

          {imageError ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 w-full">
              <span className="text-xs mt-1">Image not available</span>
            </div>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.name}
              className={`w-full h-auto max-h-64 object-contain transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
              style={{ minHeight: "192px" }}
            />
          )}
        </div>

        {/* Product details */}
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="font-medium text-gray-800 mb-2 line-clamp-2 flex-grow"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price section */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {product.price.toLocaleString()} KShs
              </span>
              {product.original_price > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {product.original_price.toLocaleString()} KShs
                </span>
              )}
            </div>

            {/* Add to cart button */}
            <button
              className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors duration-200"
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
