import { useState, useCallback } from "react";
import { Venue } from "@prisma/client";

interface FetchVenuesParams {
  page?: number;
  limit?: number;
  location?: string;
  capacity?: string;
  budget?: string;
}

interface FetchVenuesResponse {
  venues: Venue[];
  total: number;
  page: number;
  limit: number;
}

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVenues = useCallback(
    async (params: FetchVenuesParams): Promise<FetchVenuesResponse> => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: String(params.page ?? 1),
          limit: String(params.limit ?? 3),
          ...(params.location && { location: params.location }),
          ...(params.capacity && { capacity: params.capacity }),
          ...(params.budget && { budget: params.budget }),
        }).toString();

        const response = await fetch(`/api/venue?${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }
        const data: FetchVenuesResponse = await response.json();

        setVenues(data.venues);
        return data;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    venues,
    loading,
    fetchVenues,
  };
}
