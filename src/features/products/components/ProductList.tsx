import { Product } from "@/src/types/product";
import { ProductCard } from "./ProductCard";


interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
