// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Remove the password before sending the response
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
