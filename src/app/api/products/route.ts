export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as productService from "@/src/features/products/services/productService"

// GET all products
export async function GET() {
  try {
    console.log("🔥 PRODUCTS API LOADED");
    const products = await productService.getAllProducts();
    console.log(products);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Prisma GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST create product
export async function POST(req: Request) {
  try {
    const { name, price } = await req.json();
    const product = await productService.createProduct(name, price);
    return NextResponse.json(product);
  } catch (err) {
    console.error("Prisma POST error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT update product
export async function PUT(req: Request) {
  try {
    const { id, name, price } = await req.json();
    const product = await productService.updateProduct(id, name, price);
    return NextResponse.json(product);
  } catch (err) {
    console.error("Prisma PUT error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await productService.deleteProduct(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Prisma DELETE error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
