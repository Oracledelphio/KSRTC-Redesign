// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Create the user in the database (no password hashing)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
