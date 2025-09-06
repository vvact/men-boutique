// src/pages/CartPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  saveCartSnapshot,
  updateCartItemBackend,
  removeCartItemBackend,
  clearCartBackend,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error, operationLoading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading cart...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  // ✅ Fix: handle empty cart gracefully
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 hover:scale-105 active:scale-95 
                     transition transform shadow-md disabled:opacity-50"
          disabled={operationLoading}
        >
          <ShoppingBag size={20} />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.item_id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Left section: product info */}
            <div className="flex items-center gap-4">
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                <p className="text-gray-500">KSh {item.unit_price}</p>
                <p className="text-sm text-gray-400">In stock (max {item.max_quantity})</p>
              </div>
            </div>

            {/* Right section: actions */}
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={item.quantity <= 1 || operationLoading}
                onClick={() => {
                  dispatch(saveCartSnapshot());
                  dispatch(
                    updateCartItemBackend({
                      itemId: item.item_id,
                      quantity: item.quantity - 1,
                    })
                  );
                }}
              >
                −
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                disabled={operationLoading}
                onClick={() => {
                  dispatch(saveCartSnapshot());
                  dispatch(
                    updateCartItemBackend({
                      itemId: item.item_id,
                      quantity: item.quantity + 1,
                    })
                  );
                }}
              >
                +
              </button>

              <button
                className="ml-4 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                disabled={operationLoading}
                onClick={() => {
                  dispatch(saveCartSnapshot());
                  dispatch(removeCartItemBackend({ itemId: item.item_id }));
                }}
              >
                {operationLoading ? "..." : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Total: KSh {cart.cart_total}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={() => {
              dispatch(saveCartSnapshot());
              dispatch(clearCartBackend());
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            disabled={operationLoading}
          >
            {operationLoading ? "Clearing..." : "Clear Cart"}
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md disabled:opacity-50"
            disabled={operationLoading}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
