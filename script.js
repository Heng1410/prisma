import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: "Laptop",
      price: 1200.5,
    },
  });

  console.log(product);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
