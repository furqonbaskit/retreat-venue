import { useState, useCallback } from "react";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
}

export function useFetch<T = unknown>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (customOptions?: FetchOptions) => {
      setLoading(true);
      setError(null);

      try {
        const mergedOptions = {
          ...options,
          ...customOptions,
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
            ...customOptions?.headers,
          },
        };

        const response = await fetch(url, {
          method: mergedOptions.method || "GET",
          headers: mergedOptions.headers,
          body: mergedOptions.body ? JSON.stringify(mergedOptions.body) : undefined,
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result?.error || `Failed to fetch: ${response.statusText}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        
        setData(result);
        return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const errorMessage = err?.message || "An error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
}