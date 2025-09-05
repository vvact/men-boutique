// src/components/CartButton.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  // Total items in the cart
  const itemCount = cart?.item_count || 0;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative flex items-center p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      aria-label="View Cart"
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2a1 1 0 001 1.2h12.6a1 1 0 001-1.2L17 13M7 13V7h10v6"
        />
      </svg>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
