import React from "react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gold-500">Manwell</h2>
            <p className="text-navy-200 mb-4 max-w-md">
              Quality men's products in Nairobi Eastleigh. We offer premium fashion and accessories for the modern man.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-navy-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Nairobi Eastleigh, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400 border-b border-gold-600 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-navy-200 hover:text-gold-400 transition-colors duration-300">Home</a></li>
              <li><a href="/categories" className="text-navy-200 hover:text-gold-400 transition-colors duration-300">Categories</a></li>
              <li><a href="/products" className="text-navy-200 hover:text-gold-400 transition-colors duration-300">Products</a></li>
              <li><a href="/about" className="text-navy-200 hover:text-gold-400 transition-colors duration-300">About Us</a></li>
              <li><a href="/contact" className="text-navy-200 hover:text-gold-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400 border-b border-gold-600 pb-2">Connect With Us</h3>
            <div className="mb-6">
              <h4 className="font-medium mb-2 text-navy-100">Customer Service</h4>
              <p className="text-navy-200">Email: info@manwell.com</p>
              <p className="text-navy-200">Phone: +254 700 123 456</p>
            </div>
            
            <h4 className="font-medium mb-2 text-navy-100">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-navy-800 p-2 rounded-full hover:bg-gold-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-navy-800 p-2 rounded-full hover:bg-gold-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-navy-800 p-2 rounded-full hover:bg-gold-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-10 pt-8 border-t border-navy-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gold-400 mb-2">Stay Updated</h3>
              <p className="text-navy-200">Subscribe to our newsletter for the latest products and offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-navy-800 border border-navy-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-white w-full"
              />
              <button className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-medium px-4 py-2 rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-navy-400 mt-10 pt-6 border-t border-navy-700">
          <p>&copy; {new Date().getFullYear()} Manwell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}