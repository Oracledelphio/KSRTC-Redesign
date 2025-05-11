import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, busId, date, seatCount } = await request.json();

  try {
    // Check seat availability
    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    });

    if (!bus || bus.availableSeats < seatCount) {
      return NextResponse.json({ error: "Not enough available seats." }, { status: 400 });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        busId,
        date: new Date(date),
        seatCount,
      },
    });

    // Update available seats
    await prisma.bus.update({
      where: { id: busId },
      data: {
        availableSeats: bus.availableSeats - seatCount,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Booking failed." }, { status: 500 });
  }
}
