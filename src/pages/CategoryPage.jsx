import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetail, clearCategoryDetail } from "../features/categories/categorySlice";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams(); // get category slug from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryDetail, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoryDetail(slug));

    // Clear previous category detail on unmount
    return () => dispatch(clearCategoryDetail());
  }, [dispatch, slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gold-300 text-xl">Loading products...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="text-center p-8 bg-navy-800 rounded-lg shadow-lg max-w-md">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <p className="text-red-300 text-xl mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
  
  if (!categoryDetail) return null;

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Header with brand colors */}
      <header className="bg-navy-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gold-500">Our Store</h1>
          <button
            onClick={() => navigate("/")}
            className="text-gold-400 hover:text-gold-300 transition duration-300"
          >
            Home
          </button>
        </div>
      </header>

      <section className="container mx-auto py-8 px-4">
        {/* Category header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gold-500 hover:text-gold-400 transition duration-300 mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gold-400">{categoryDetail.name}</h1>
            {categoryDetail.description && (
              <p className="mt-2 text-navy-100 max-w-3xl">{categoryDetail.description}</p>
            )}
          </div>
          <div className="hidden md:block">
            <span className="bg-gold-600 text-navy-900 py-1 px-3 rounded-full text-sm font-semibold">
              {categoryDetail.products ? categoryDetail.products.length : 0} products
            </span>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryDetail.products && categoryDetail.products.length > 0 ? (
            categoryDetail.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-navy-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-navy-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
              </svg>
              <p className="text-xl text-navy-300">No products found in this category.</p>
              <button 
                onClick={() => navigate("/")}
                className="mt-4 bg-gold-600 hover:bg-gold-500 text-navy-900 font-bold py-2 px-6 rounded-md transition duration-300"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}