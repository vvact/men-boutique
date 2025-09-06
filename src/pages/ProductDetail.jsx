// src/pages/ProductDetailPage.jsx
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

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`products/${slug}/`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0]?.image || null);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Handle option selection
  const handleOptionChange = (optionName, value) => {
    const updatedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(updatedOptions);

    // Find matching variant
    if (product?.variants?.length) {
      const variant = product.variants.find((v) =>
        Object.entries(v.attributes).every(
          ([key, val]) => updatedOptions[key] === val
        )
      );
      setSelectedVariant(variant || null);

      // Swap main image if variant has one
      if (variant?.image?.image) {
        setMainImage(variant.image.image);
      } else if (product.images?.length) {
        setMainImage(product.images[0].image);
      }
    }
  };

  if (loading) return <p className="text-center py-10">Loading product...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  if (!product) return null;

  // Determine display price & stock
  const displayPrice = product.has_variants
    ? selectedVariant?.price || `${product.min_price} - ${product.max_price}`
    : product.final_price;

  const availableStock = product.has_variants
    ? selectedVariant?.stock || 0
    : product.stock;

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (product.has_variants && !selectedVariant) {
      alert("Please select product options first");
      return;
    }
    setAdding(true);
    dispatch(saveCartSnapshot());
    await dispatch(
      addToCartBackend({
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
      })
    );
    setAdding(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              No image available
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.image}
                alt={img.alt_text || product.name}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImage === img.image ? "border-blue-600" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700">KSh {displayPrice}</p>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-400">Stock: {availableStock}</p>

          {/* Variant Options */}
          {product.has_variants && product.options?.length > 0 && (
            <div className="flex flex-col gap-4">
              {product.options.map((option) => (
                <div key={option.id}>
                  <h3 className="font-semibold">{option.name}</h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {option.values.map((val) => (
                      <button
                        key={val.id}
                        className={`px-3 py-1 border rounded ${
                          selectedOptions[option.name] === val.name
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300"
                        }`}
                        onClick={() => handleOptionChange(option.name, val.name)}
                      >
                        {val.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

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

          {/* Add to Cart */}
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
