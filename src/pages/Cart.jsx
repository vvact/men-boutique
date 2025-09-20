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
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error, operationLoading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-navy-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-red-300 mb-2">Error</h2>
        <p className="text-red-200">{error}</p>
        <button 
          onClick={() => navigate("/products")}
          className="mt-4 flex items-center gap-2 text-gold-500 hover:text-gold-300"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>
    </div>
  );

  // Handle empty cart
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-24 h-24 bg-navy-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <ShoppingBag size={40} className="text-gold-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-lg 
                       hover:bg-gold-400 active:bg-gold-600 transition-colors shadow-md disabled:opacity-50 font-medium"
            disabled={operationLoading}
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-16">
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-gold-500 hover:text-gold-300 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Your Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-navy-800 rounded-lg shadow-lg overflow-hidden divide-y divide-navy-700">
              {cart.items.map((item) => (
                <div key={item.item_id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md border-2 border-gold-500 flex-shrink-0"
                    />
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.product_name}</h3>
                      <p className="text-gold-400 mb-2">KSh {item.unit_price.toLocaleString()}</p>
                      <p className="text-sm text-navy-300 mb-4">In stock (max {item.max_quantity})</p>
                      
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-navy-600 rounded-md overflow-hidden">
                          <button
                            className="p-2 bg-navy-700 text-gold-500 hover:bg-navy-600 disabled:opacity-30 transition-colors"
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
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 bg-navy-900 text-white min-w-[40px] text-center">{item.quantity}</span>
                          <button
                            className="p-2 bg-navy-700 text-gold-500 hover:bg-navy-600 disabled:opacity-30 transition-colors"
                            disabled={item.quantity >= item.max_quantity || operationLoading}
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
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="flex items-center gap-1 px-3 py-2 text-red-400 hover:bg-navy-700 rounded-md transition-colors disabled:opacity-50"
                          disabled={operationLoading}
                          onClick={() => {
                            dispatch(saveCartSnapshot());
                            dispatch(removeCartItemBackend({ itemId: item.item_id }));
                          }}
                        >
                          <Trash2 size={16} />
                          <span className="text-sm">{operationLoading ? "Removing..." : "Remove"}</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gold-400">KSh {(item.unit_price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="bg-navy-800 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-navy-300">Subtotal</span>
                  <span className="text-white">KSh {cart.cart_total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-300">Shipping</span>
                  <span className="text-white">KSh 0</span>
                </div>
                <div className="border-t border-navy-700 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-gold-400">KSh {cart.cart_total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-gold-500 text-navy-900 rounded-lg hover:bg-gold-400 active:bg-gold-600 transition-colors shadow-md disabled:opacity-50 font-medium"
                  disabled={operationLoading}
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => {
                    dispatch(saveCartSnapshot());
                    dispatch(clearCartBackend());
                  }}
                  className="w-full py-2.5 border border-navy-600 text-red-400 rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50"
                  disabled={operationLoading}
                >
                  {operationLoading ? "Clearing..." : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}