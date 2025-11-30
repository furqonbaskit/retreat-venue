'use client';

import React from 'react';
import { useBooking } from '@/hooks/useBooking';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function BookingPage() {
  const { bookings, loading, error, refetch } = useBooking();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <button
          onClick={refetch}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-500">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Venue</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Company Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Attendee</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id} className="hover:bg-gray-900">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.venue.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.companyName}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.startDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.endDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{booking.attendeeCount}</td>
                  <td className="border border-gray-300 px-4 py-2">${booking.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}