import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "../../../lib/prisma";
import { createBookingSchema } from "../../../lib/schemas/api/bookingApiSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = createBookingSchema.parse(body);

    const { venueId, companyName, email, startDate, endDate, attendeeCount } =
      validatedData;

    // Check venue exists
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
    });

    if (!venue) {
      return NextResponse.json({ error: "Venue not found" }, { status: 404 });
    }

    // Check capacity
    if (attendeeCount > venue.capacity) {
      return NextResponse.json(
        { error: "Attendee count exceeds venue capacity" },
        { status: 400 }
      );
    }

    // Check date availability in the requested date range
    const checkCurrentBookings = await prisma.booking.findMany({
      where: {
        venueId,
        startDate: {
          lte: new Date(endDate),
        },
        endDate: {
          gte: new Date(startDate),
        },
      },
    });

    if (checkCurrentBookings.length > 0) {
      return NextResponse.json(
        { error: "Venue is already booked for the selected dates" },
        { status: 400 }
      );
    }

    // Calculate total price
    const calculatedTotalPrice = async (
      venueId: string,
      startDate: string,
      endDate: string
    ) => {
      const venue = await prisma.venue.findUnique({
        where: { id: venueId },
      });
      if (!venue) throw new Error("Venue not found");

      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

      return venue.price * diffDays;
    };

    const totalPrice = await calculatedTotalPrice(venueId, startDate, endDate);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        venueId,
        companyName,
        email,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        attendeeCount,
        totalPrice,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        venue: true,
      },
    });
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
