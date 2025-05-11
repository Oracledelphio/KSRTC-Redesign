import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, busNumber, seatNumber } = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId,
        busNumber,
        seatNumber,
      },
    });

    return NextResponse.json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId) },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
