import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../app/api";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Map backend payment method codes to readable text
  const getPaymentMethodText = (method) => {
    if (!method) return "Cash on Delivery"; // default for COD orders
    if (method === "POD" || method === "COD") return "Cash on Delivery";
    if (method === "MPESA" || method === "STK") return "M-Pesa";
    return "Unknown";
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}/`);
        setOrder(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>

      {/* Order Info */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6">
        <p><strong>Full Name:</strong> {order.full_name}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Method:</strong> {getPaymentMethodText(order.payment?.method)}</p>
        <p><strong>Payment Status:</strong> {order.payment?.status || "PENDING"}</p>
        <p><strong>Total:</strong> KSh {order.order_total}</p>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        {order.items.length === 0 ? (
          <p>No items in this order.</p>
        ) : (
          order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-2 border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.product_name || item.product}</p>
                <p className="text-sm text-gray-600">
                  Unit Price: KSh {item.price} | Quantity: {item.quantity}
                </p>
              </div>
              <span className="font-semibold">KSh {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* COD Info */}
      {["POD", "COD", null, undefined].includes(order.payment?.method) && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          <p className="font-medium text-yellow-800">
            Payment will be collected on delivery.
          </p>
        </div>
      )}
    </div>
  );
}
