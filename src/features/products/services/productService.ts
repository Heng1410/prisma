import { prisma } from "@/src/lib/prisma";
import { Product } from "@/src/types/product";


const mapProduct = (p: any): Product => ({
  id: p.id,
  name: p.name,
  price: p.price,
  createdAt: p.createdAt.toISOString(),
  updatedAt: p.updatedAt.toISOString(),
});
console.log(mapProduct);

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products.map(mapProduct);
};

export const createProduct = async (name: string, price: number): Promise<Product> => {
  const product = await prisma.product.create({
    data: { name, price },
  });
  return mapProduct(product);
};

export const updateProduct = async (
  id: number,
  name?: string,
  price?: number
): Promise<Product> => {
  const product = await prisma.product.update({
    where: { id },
    data: { name, price },
  });
  return mapProduct(product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await prisma.product.delete({
    where: { id },
  });
};
