"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingFormModal from "../../components/modal/BookingFormModal";
import { useVenues } from "../../hooks/useVenues";
import { Venue } from "@prisma/client";
import { usePagination } from "../../hooks/usePagination";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ServiceCard from "../../components/ui/ServiceCard";

export default function VenuePage() {
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [budget, setBudget] = useState("");

  // Debounced filter values
  const debouncedLocation = useDebounce(location, 500);
  const debouncedCapacity = useDebounce(capacity, 500);
  const debouncedBudget = useDebounce(budget, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const {
    currentPage,
    totalPages,
    setTotalPages,
    setCurrentPage,
    nextPage,
    prevPage,
    limit,
  } = usePagination({ page: 1, limit: 3 });

  const { venues, loading, fetchVenues } = useVenues();

  const {
    loading: bookingLoading,
    error: bookingError,
    refetch: submitBooking,
  } = useFetch("/api/booking", {
    method: "POST",
  });

  // Handle filter changes - reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedLocation, debouncedCapacity, debouncedBudget, setCurrentPage]);

  // Handle page and venue fetching
  useEffect(() => {
    const loadVenues = async () => {
      const data = await fetchVenues({
        page: currentPage,
        limit,
        location: debouncedLocation,
        capacity: debouncedCapacity,
        budget: debouncedBudget,
      });
      setTotalPages(Math.ceil(data.total / data.limit));
    };

    loadVenues();
  }, [
    currentPage,
    debouncedLocation,
    debouncedCapacity,
    debouncedBudget,
    limit,
    fetchVenues,
    setTotalPages,
  ]);

  useEffect(() => {
    if (bookingError) {
      toast.error(bookingError);
    }
  }, [bookingError]);

  const handleVenueClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: {
    companyName: string;
    email: string;
    startDate: string;
    endDate: string;
    attendeeCount: number;
  }) => {
    await submitBooking({
      body: {
        venueId: selectedVenue?.id,
        ...formData,
      },
    }).then(() => {
      toast.success("Booking created successfully!");
      setIsModalOpen(false);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-zinc-50">
          Venues
        </h1>

        {/* Filters */}
        <div className="mb-8 w-full flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          />
          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {venues.map((venue: Venue) => (
                <ServiceCard
                  key={venue.id}
                  imageSrc={venue.photos && venue.photos.length > 0 ? venue.photos[0] : undefined}
                  title={venue.name}
                  location={venue.location}
                  address={venue.address}
                  capacity={venue.capacity}
                  price={venue.price}
                  onBookClick={() => handleVenueClick(venue)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-black dark:text-zinc-50 font-semibold">
                Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      <BookingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        venueName={selectedVenue?.name || ""}
        isLoading={bookingLoading}
      />
      <ToastContainer />
    </div>
  );
}