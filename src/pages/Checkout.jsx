import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../app/api";
import { fetchCart } from "../features/cart/cartSlice";

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
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 text-lg">
          Please <a href="/login" className="text-blue-600 underline">login</a> to continue to checkout.
        </p>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded-md space-y-4"
        >
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {loadingCart ? (
            <p>Loading cart...</p>
          ) : cart.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.items.map((item) => (
                <div
                  key={item.item_id}
                  className="flex justify-between mb-2 border-b pb-2"
                >
                  <span>{item.product_name || item.product} x {item.quantity}</span>
                  <span>KSh {item.line_total}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>KSh {cart.cart_total}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
