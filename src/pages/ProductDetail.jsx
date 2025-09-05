import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "../features/products/productsSlice";
import { addToCartBackend, fetchCart } from "../features/cart/cartSlice";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, detailLoading, detailError } = useSelector((state) => state.products);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [dispatch, slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    await dispatch(
      addToCartBackend({
        productId: product.id,
        variantId: null,
        quantity: 1,
      })
    );

    // Refresh cart after adding
    dispatch(fetchCart());
  };

  if (detailLoading) return <p className="text-center py-8">Loading product...</p>;
  if (detailError) return <p className="text-center py-8 text-red-500">Error: {detailError}</p>;
  if (!product) return null;

  return (
    <section className="container mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.images?.[0]?.image || ""}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-blue-600">
              KSh {product.price || product.final_price}
            </span>
            {product.base_price && product.base_price !== product.price && (
              <span className="text-gray-400 line-through">KSh {product.base_price}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
}
