import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../app/api";
import { fetchCart } from "../features/cart/cartSlice";
import { ArrowLeft, CreditCard, MapPin, Phone, User, Loader } from "lucide-react";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select user from Redux (assuming you store authentication state)
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart) ?? {
    items: [],
    cart_total: 0,
    item_count: 0,
  };
  const loadingCart = useSelector((state) => state.cart.loading);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // Redirect or show message if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-navy-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Authentication Required</h2>
          <p className="text-navy-300 mb-6">
            Please login to continue to checkout.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-gold-500 text-navy-900 rounded-lg hover:bg-gold-400 font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      setError("All fields are required.");
      return;
    }

    if ((cart.items?.length ?? 0) === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/orders/checkout/", {
        full_name: fullName,
        phone,
        address,
        payment_method: paymentMethod,
      });

      navigate(`/order/${response.data.id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gold-500 hover:text-gold-300 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-navy-800 shadow-lg p-6 rounded-lg space-y-6"
          >
            {error && (
              <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gold-400 font-medium mb-2 flex items-center gap-2">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-navy-700 border border-navy-600 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gold-400 font-medium mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone
              </label>
              <input
                type="text"
                className="w-full bg-navy-700 border border-navy-600 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gold-400 font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Address
              </label>
              <textarea
                className="w-full bg-navy-700 border border-navy-600 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-gold-400 font-medium mb-2 flex items-center gap-2">
                <CreditCard size={16} />
                Payment Method
              </label>
              <select
                className="w-full bg-navy-700 border border-navy-600 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="STK">STK Push (M-Pesa)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || cart.items.length === 0}
              className="w-full bg-gold-500 text-navy-900 py-3 px-4 rounded-lg hover:bg-gold-400 disabled:opacity-50 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </form>

          {/* Cart Summary */}
          <div className="bg-navy-800 shadow-lg p-6 rounded-lg h-fit sticky top-6">
            <h2 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-navy-700">Order Summary</h2>

            {loadingCart ? (
              <div className="flex justify-center py-8">
                <Loader size={24} className="animate-spin text-gold-500" />
              </div>
            ) : cart.items.length === 0 ? (
              <p className="text-navy-300 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div
                      key={item.item_id}
                      className="flex justify-between items-start pb-3 border-b border-navy-700"
                    >
                      <div className="flex-1">
                        <span className="text-white font-medium">{item.product_name || item.product}</span>
                        <p className="text-navy-300 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-gold-400 font-medium">KSh {item.line_total}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-navy-700">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-gold-500 text-xl">KSh {cart.cart_total}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}