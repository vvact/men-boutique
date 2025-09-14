import { Link, useLocation } from "react-router-dom";
import CartButton from "../../components/CartButton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/loginSlice";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLink = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-navy-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gold-500">Manwell</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isActiveLink("/") ? "text-gold-500 bg-navy-800" : "text-navy-100 hover:text-gold-400 hover:bg-navy-800"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isActiveLink("/products") ? "text-gold-500 bg-navy-800" : "text-navy-100 hover:text-gold-400 hover:bg-navy-800"
              }`}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isActiveLink("/categories") ? "text-gold-500 bg-navy-800" : "text-navy-100 hover:text-gold-400 hover:bg-navy-800"
              }`}
            >
              Categories
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <CartButton />

            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span>Hello, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 rounded-md text-sm font-medium bg-gold-600 text-navy-900 hover:bg-gold-500 transition-colors duration-300"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-navy-100 hover:text-gold-500 hover:bg-navy-800 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-800 border-t border-navy-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActiveLink("/") ? "text-gold-500 bg-navy-700" : "text-navy-100 hover:text-gold-400 hover:bg-navy-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActiveLink("/products") ? "text-gold-500 bg-navy-700" : "text-navy-100 hover:text-gold-400 hover:bg-navy-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActiveLink("/categories") ? "text-gold-500 bg-navy-700" : "text-navy-100 hover:text-gold-400 hover:bg-navy-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gold-600 text-navy-900 hover:bg-gold-500 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
