import React, { useState } from "react";
import { ZodError } from "zod";
import { BookingFormData, bookingFormSchema } from "../../lib/schemas/bookingSchema";


interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  venueName: string;
  isLoading: boolean;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  venueName,
  isLoading,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = bookingFormSchema.parse({
        companyName,
        email,
        startDate,
        endDate,
        attendeeCount: Number(attendeeCount),
      });

      onSubmit(validatedData);
      // Reset form
      setCompanyName("");
      setEmail("");
      setStartDate("");
      setEndDate("");
      setAttendeeCount("");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as string;
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
          Book Venue: {venueName}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={`w-full px-4 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 border-gray-300 dark:border-zinc-600 ${
                errors.companyName ? 'border-red-500' : ''
              }`}
              required
              disabled={isLoading}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 border-gray-300 dark:border-zinc-600 ${
                errors.email ? 'border-red-500' : ''
              }`}
              required
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full px-4 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 border-gray-300 dark:border-zinc-600 ${
                errors.startDate ? 'border-red-500' : ''
              }`}
              required
              disabled={isLoading}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full px-4 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 border-gray-300 dark:border-zinc-600 ${
                errors.endDate ? 'border-red-500' : ''
              }`}
              required
              disabled={isLoading}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Attendee Count"
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(e.target.value)}
              className={`w-full px-4 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 border-gray-300 dark:border-zinc-600 ${
                errors.attendeeCount ? 'border-red-500' : ''
              }`}
              required
              disabled={isLoading}
            />
            {errors.attendeeCount && (
              <p className="text-red-500 text-sm mt-1">{errors.attendeeCount}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded hover:bg-gray-400 dark:hover:bg-zinc-600 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;