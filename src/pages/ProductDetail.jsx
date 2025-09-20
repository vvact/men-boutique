import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import api from "../app/api";
import { addToCartBackend, saveCartSnapshot } from "../features/cart/cartSlice";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`products/${slug}/`);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  if (!product) return null;

  const availableStock = product.has_variants
    ? product.variants?.[0]?.stock || 0
    : product.stock;

  const handleAddToCart = async () => {
    setAdding(true);
    dispatch(saveCartSnapshot());
    await dispatch(
      addToCartBackend({
        productId: product.id,
        quantity,
      })
    );
    setAdding(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          {product.images?.[0]?.image ? (
            <img
              src={product.images[0].image}
              alt={product.images[0].alt_text || product.name}
              className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-200 flex items-center justify-center rounded-lg">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg sm:text-xl font-semibold text-gray-700">
            KSh {product.final_price}
          </p>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-400">Stock: {availableStock}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              disabled={quantity >= availableStock}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            disabled={availableStock === 0 || adding}
            onClick={handleAddToCart}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
