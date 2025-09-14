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
      className="relative flex items-center p-2 text-gold-500 hover:bg-navy-700 rounded-full transition-all duration-300 group"
      aria-label="View Cart"
    >
      {/* Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold-500 text-navy-900 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold shadow-md transform group-hover:scale-110 transition-transform duration-300">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}