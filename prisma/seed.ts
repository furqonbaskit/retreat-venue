import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.VenueCreateInput[] = [
  {
    name: "Grand Hall",
    location: "New York",
    address: "123 Main St, New York, NY",
    capacity: 500,
    price: 10000,
    photos: ["https://picsum.photos/id/20/200/300"],
  },
  {
    name: "Ocean View Resort",
    location: "Miami",
    address: "456 Ocean Dr, Miami, FL",
    capacity: 300,
    price: 8000,
    photos: ["https://picsum.photos/id/13/200/300"],
  },
  {
    name: "Mountain Retreat",
    location: "Denver",
    address: "789 Hilltop Rd, Denver, CO",
    capacity: 200,
    price: 6000,
    photos: ["https://picsum.photos/id/29/200/300"],
  },
  {
    name: "City Conference Center",
    location: "Chicago",
    address: "101 State St, Chicago, IL",
    capacity: 400,
    price: 9000,
    photos: ["https://picsum.photos/id/22/200/300"],
  },
  {
    name: "Lakeside Pavilion",
    location: "Seattle",
    address: "202 Lakeview Ave, Seattle, WA",
    capacity: 350,
    price: 7500,
    photos: ["https://picsum.photos/id/16/200/300"],
  },
  {
    name: "Desert Oasis",
    location: "Phoenix",
    address: "303 Desert Rd, Phoenix, AZ",
    capacity: 250,
    price: 6500,
    photos: ["https://picsum.photos/id/46/200/300"],
  },
  {
    name: "Historic Mansion",
    location: "Boston",
    address: "404 Heritage St, Boston, MA",
    capacity: 150,
    price: 5500,
    photos: ["https://picsum.photos/id/57/200/300"],
  },
  {
    name: "Beachfront Villa",
    location: "Los Angeles",
    address: "505 Sunset Blvd, Los Angeles, CA",
    capacity: 450,
    price: 11000,
    photos: ["https://picsum.photos/id/90/200/300"],
  },
  {
    name: "Countryside Barn",
    location: "Nashville",
    address: "606 Country Ln, Nashville, TN",
    capacity: 300,
    price: 7000,
    photos: ["https://picsum.photos/id/85/200/300"],
  },
  {
    name: "Skyline Rooftop",
    location: "San Francisco",
    address: "707 Market St, San Francisco, CA",
    capacity: 200,
    price: 8500,
    photos: ["https://picsum.photos/id/88/200/300"],
  },
  {
    name: "Garden Terrace",
    location: "Portland",
    address: "808 Blossom St, Portland, OR",
    capacity: 180,
    price: 5200,
    photos: ["https://picsum.photos/id/89/200/300"],
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.venue.create({ data: u });
  }
}

main();