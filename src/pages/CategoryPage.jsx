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

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  if (!categoryDetail) return null;

  return (
    <section className="container mx-auto py-8">
      {/* Category header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{categoryDetail.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          Back
        </button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryDetail.products && categoryDetail.products.length > 0 ? (
          categoryDetail.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-8 text-gray-600">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
