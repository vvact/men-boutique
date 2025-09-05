import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1600x600?text=Mens+Boutique+Hero')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center px-4 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Elevate Your Style
        </h1>
        <p className="text-lg sm:text-xl mb-6 text-gray-300">
          Discover premium men’s fashion and accessories curated for the modern gentleman.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
        >
          Shop Collection
        </button>
      </div>
    </section>
  );
}
