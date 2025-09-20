import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/dist/InnerImageZoom/styles.css';

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

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const mainSlider = useRef();
  const thumbSlider = useRef();

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

  // Main slider settings
  const mainSettings = {
    asNavFor: nav2,
    ref: mainSlider,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Thumbnail slider settings
  const thumbSettings = {
    asNavFor: nav1,
    ref: thumbSlider,
    slidesToShow: Math.min(product.images?.length || 3, 5),
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    infinite: false,
    arrows: true,
    centerMode: false,
    variableWidth: true,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery with Thumbnails */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {product.images?.length > 0 ? (
            <>
              <Slider {...mainSettings} className="mb-2" afterChange={() => setNav2(thumbSlider.current)}>
                {product.images.map((img, idx) => (
                  <div key={idx} className="p-2">
                    <InnerImageZoom
                      src={img.image}
                      zoomSrc={img.image}
                      zoomType="hover"
                      zoomPreload={true}
                      alt={img.alt_text || product.name}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>

              <Slider {...thumbSettings} className="mt-2" afterChange={() => setNav1(mainSlider.current)}>
                {product.images.map((img, idx) => (
                  <div key={idx} className="px-1 cursor-pointer">
                    <img
                      src={img.image}
                      alt={img.alt_text || product.name}
                      className="w-20 h-20 object-cover rounded border border-gray-300 hover:border-blue-500"
                    />
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700">
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
