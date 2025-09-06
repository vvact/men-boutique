// hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart, clearCart, fetchCart } from "../features/cart/cartSlice";
import { useEffect } from "react";

export default function useCart() {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    // fetch cart on mount
    dispatch(fetchCart());
  }, [dispatch]);

  return {
    cart,
    loading,
    error,
    addItem: (product_id, quantity = 1) =>
      dispatch(addToCart({ product_id, quantity })),
    updateItem: (item_id, quantity) =>
      dispatch(updateQuantity({ item_id, quantity })),
    removeItem: (item_id) => dispatch(removeFromCart(item_id)),
    clear: () => dispatch(clearCart()),
  };
}
