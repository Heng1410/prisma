"use client";

import { useProducts } from "@/src/features/products/hooks/useProducts";
import { ProductList } from "@/src/features/products/components/ProductList";
import ProductForm from "@/src/features/products/components/ProductForm";

export default function ProductsPage() {
  const { products, loading, error, refresh } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <button
        onClick={refresh}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Refresh
      </button>
      <ProductForm onSuccess={refresh}></ProductForm>
      <ProductList products={products} />
    </div>
  );
}
