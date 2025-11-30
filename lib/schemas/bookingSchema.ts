import { z } from 'zod';

export const bookingFormSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  endDate: z
    .string()
    .min(1, 'End date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid end date'),
  attendeeCount: z.coerce
    .number()
    .int('Attendee count must be a whole number')
    .min(1, 'At least 1 attendee is required')
    .max(10000, 'Attendee count cannot exceed 10,000'),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
