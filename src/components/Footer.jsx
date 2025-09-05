import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Manwell</h2>
          <p className="text-gray-400">
            Quality men’s products in Nairobi Eastleigh.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-400 space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/categories" className="hover:text-white">Categories</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Manwell. All rights reserved.
      </div>
    </footer>
  );
}
