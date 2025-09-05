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

  if (listLoading) return <p>Loading products...</p>;
  if (listError) return <p>Error: {listError}</p>;

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
