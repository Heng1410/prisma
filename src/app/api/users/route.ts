export const runtime = "nodejs";

import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    console.error("❌ Prisma GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST create user
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const user = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error("❌ Prisma POST error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT update user
export async function PUT(req: Request) {
  try {
    const { id, name, email } = await req.json();
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.error("❌ Prisma PUT error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "User deleted" });
  } catch (err) {
    console.error("❌ Prisma DELETE error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
