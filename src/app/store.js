import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import featuredProductsReducer from "../features/products/featuredProductsSlice";
import newArrivalsReducer from "../features/products/newArrivalsSlice";
import categoriesReducer from "../features/categories/categorySlice";
import momentReducer from "../features/products/momentSlice";
import cartReducer from "../features/cart/cartSlice";
import  loginSlice from '../features/auth/loginSlice';
import registerSlice from '../features/auth/registerSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    featured: featuredProductsReducer,
    newArrivals: newArrivalsReducer,
    categories: categoriesReducer,
    moments: momentReducer,
    cart: cartReducer,
    auth: loginSlice,
    register: registerSlice,
    // You can add more slices here later, e.g., categories, cart, auth
  },
});
