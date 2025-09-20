// src/pages/OrdersList.jsx
// src/pages/OrdersList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../app/api";
import { ArrowLeft, ShoppingBag, Calendar, CreditCard, Loader, AlertCircle } from "lucide-react";

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

  if (loading) return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-navy-800 p-6 rounded-lg shadow-lg text-center">
        <AlertCircle className="mx-auto text-red-400 mb-4" size={40} />
        <h2 className="text-xl font-semibold text-white mb-2">Error Loading Orders</h2>
        <p className="text-navy-300 mb-4">{error}</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-navy-900 rounded hover:bg-gold-400 font-medium"
        >
          <ArrowLeft size={16} />
          Return to Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header with button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Orders</h1>
            <p className="text-navy-300 mt-1">View your order history and track current orders</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 text-navy-900 rounded-lg hover:bg-gold-400 font-medium transition-colors"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-navy-800 rounded-lg shadow-lg p-8 text-center">
            <ShoppingBag className="mx-auto text-gold-500 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-white mb-2">No Orders Yet</h2>
            <p className="text-navy-300 mb-6">You haven't placed any orders yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 rounded-lg hover:bg-gold-400 font-medium"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-navy-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.01]"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          Order #{order.id}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-900/30 text-green-300' 
                            : order.status === 'cancelled'
                            ? 'bg-red-900/30 text-red-300'
                            : 'bg-blue-900/30 text-blue-300'
                        }`}>
                          {order.status?.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-navy-300">
                          <Calendar size={14} />
                          <span>{new Date(order.created_at).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-navy-300">
                          <CreditCard size={14} />
                          <span>
                            {order.payment?.method || "COD"} • 
                            <span className={`ml-1 ${
                              order.payment?.status === 'completed' 
                                ? 'text-green-400' 
                                : order.payment?.status === 'failed'
                                ? 'text-red-400'
                                : 'text-yellow-400'
                            }`}>
                              {order.payment?.status || "PENDING"}
                            </span>
                          </span>
                        </div>
                        
                        <p className="text-gold-400 font-medium">
                          Total: KSh {order.order_total?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/order/${order.id}`}
                      className="px-4 py-2 bg-navy-700 text-gold-500 rounded-lg hover:bg-gold-500 hover:text-navy-900 transition-colors font-medium text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}