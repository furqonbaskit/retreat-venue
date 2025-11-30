import { useState, useEffect } from 'react';

interface BookingData {
  id: string;
  venueId: string;
  venue: {
    id: string;
    name: string;
    price: number;
    capacity: number;
  };
  companyName: string;
  email: string;
  startDate: string;
  endDate: string;
  attendeeCount: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface UseBookingReturn {
  bookings: BookingData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBooking(): UseBookingReturn {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/booking', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      const formattedBookings = data.bookings.map((booking: BookingData) => ({
        ...booking,
        startDate: new Date(booking.startDate).toISOString().split('T')[0],
        endDate: new Date(booking.endDate).toISOString().split('T')[0],
      }));
      setBookings(formattedBookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
}
