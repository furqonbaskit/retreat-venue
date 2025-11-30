import { z } from 'zod';

export const createVenueSchema = z.object({
  name: z
    .string()
    .min(1, 'Venue name is required')
    .min(2, 'Venue name must be at least 2 characters')
    .max(100, 'Venue name must be less than 100 characters'),
  location: z
    .string()
    .min(1, 'Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),
  address: z
    .string()
    .min(1, 'Address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address must be less than 255 characters'),
  capacity: z
    .number()
    .int('Capacity must be a whole number')
    .min(1, 'Capacity must be at least 1')
    .max(100000, 'Capacity cannot exceed 100,000'),
  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(1000000, 'Price cannot exceed 1,000,000'),
});

export type CreateVenueData = z.infer<typeof createVenueSchema>;

export const getVenuesQuerySchema = z.object({
  page: z
    .string()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'Page must be a positive number'),
  limit: z
    .string()
    .default('3')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'Limit must be a positive number')
    .refine((val) => val <= 100, 'Limit cannot exceed 100'),
  location: z
    .string()
    .max(100, 'Location filter must be less than 100 characters')
    .optional()
    .nullable(),
  capacity: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val > 0), 'Capacity must be a positive number'),
  budget: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val > 0), 'Budget must be a positive number'),
});

export type GetVenuesQueryParams = z.infer<typeof getVenuesQuerySchema>;

// Schema for venue ID validation
export const venueIdSchema = z.object({
  id: z
    .string()
    .min(1, 'Venue ID is required')
    .cuid('Invalid venue ID format'),
});

export type VenueIdParams = z.infer<typeof venueIdSchema>;
