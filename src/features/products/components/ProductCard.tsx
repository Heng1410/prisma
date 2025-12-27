import { Product } from "@/src/types/product";


interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="border p-4 rounded shadow">
      <p>
        <strong>{product.name}</strong>
      </p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">
        Created: {new Date(product.createdAt).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Updated: {new Date(product.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};
