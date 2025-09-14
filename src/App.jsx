import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { fetchCart } from "./features/cart/cartSlice";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPages";

function AppWrapper() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  // 👇 fetch cart globally for both guests and logged-in users
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
