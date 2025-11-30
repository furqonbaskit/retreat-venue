import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import {
  createVenueSchema,
  getVenuesQuerySchema,
} from "../../../lib/schemas/api/venueApiSchema";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createVenueSchema.parse(body);
    const { name, location, capacity, address, price } = validatedData;

    const venue = await prisma.venue.create({
      data: {
        name,
        location,
        capacity,
        address,
        price,
      },
    });

    return NextResponse.json(venue, { status: 201 });
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
      { error: "Failed to create venue" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validatedParams = getVenuesQuerySchema.parse(queryParams);

    const { page, limit, location, capacity, budget } = validatedParams;
    const skip = (page - 1) * limit || 0;

    const where: Prisma.VenueWhereInput = {};
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }
    if (capacity) {
      where.capacity = { gte: capacity };
    }
    if (budget) {
      where.price = { lte: budget };
    }

    const venues = await prisma.venue.findMany({
      skip,
      take: limit,
      where,
    });

    const total = await prisma.venue.count({
      where,
    });

    return NextResponse.json({ venues, total, page, limit });
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
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}
