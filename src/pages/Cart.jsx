// src/pages/CartPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (item, newQty) => {
    dispatch(updateQuantity({ 
      productId: item.productId, 
      variantId: item.variantId, 
      quantity: newQty 
    }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ item_id: item.item_id }));
  };

  if (loading) return <p className="text-center py-8">Loading cart...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!cart || cart.items.length === 0)
    return <p className="text-center py-8">Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid gap-4">
        {cart.items.map((item) => (
          <div
            key={item.item_id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p>Price: KSh {item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <label>Quantity:</label>
                <input
                  type="number"
                  min={1}
                  max={item.maxQuantity}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(item)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: KSh {cart.cart_total}</p>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
