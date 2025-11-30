import z from "zod";
import { bookingFormSchema } from "../bookingSchema";

export const createBookingSchema = bookingFormSchema.safeExtend({
  venueId: z
    .string()
    .min(1, 'Venue ID is required')
    .cuid('Invalid venue ID format'),
});

export type CreateBookingData = z.infer<typeof createBookingSchema>;