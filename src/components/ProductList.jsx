import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, listLoading, listError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (listLoading) return (
    <div className="min-h-screen bg-navy-900 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">Our Products</h2>
          <div className="h-1 w-24 bg-gold-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-navy-800 rounded-xl p-4 animate-pulse">
              <div className="bg-navy-700 h-48 rounded-lg mb-4"></div>
              <div className="bg-navy-700 h-4 rounded mb-2"></div>
              <div className="bg-navy-700 h-4 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="bg-navy-700 h-6 rounded w-1/3"></div>
                <div className="bg-navy-700 h-10 w-10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (listError) return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-md mx-auto bg-navy-800 rounded-xl p-8 shadow-lg">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Products</h2>
          <p className="text-navy-200 mb-6">Error: {listError}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">Our Products</h2>
          <div className="h-1 w-24 bg-gold-600 mx-auto"></div>
          <p className="text-navy-200 mt-4 max-w-2xl mx-auto">
            Discover our premium collection of products, carefully curated for quality and value.
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-navy-800 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-navy-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
            </svg>
            <h3 className="text-xl font-semibold text-navy-200 mb-2">No Products Available</h3>
            <p className="text-navy-400">Check back later for new products.</p>
          </div>
        )}
      </div>
    </div>
  );
}