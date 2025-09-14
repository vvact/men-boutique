// src/components/GlobalLoader.jsx
import React from "react";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gold-500 rounded-full animate-spin"></div>
    </div>
  );
}
