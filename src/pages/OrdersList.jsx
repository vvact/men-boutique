// src/pages/OrdersList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../app/api";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md p-6 rounded-md flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Order #{order.id}</strong> — {new Date(order.created_at).toLocaleString()}
              </p>
              <p>Status: {order.status}</p>
              <p>
                Payment: {order.payment?.method || "COD"} ({order.payment?.status || "PENDING"})
              </p>
              <p>Total: KSh {order.order_total}</p>
            </div>

            <Link
              to={`/order/${order.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
