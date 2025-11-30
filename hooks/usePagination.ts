import { useState, useCallback } from "react";

interface UsePaginationProps {
  page?: number;
  limit?: number;
}

export function usePagination({ page = 1, limit = 3 }: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((pageNum: number) => {
    setCurrentPage(Math.max(1, Math.min(pageNum, totalPages)));
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    setTotalPages,
    setCurrentPage,
    nextPage,
    prevPage,
    goToPage,
    resetPagination,
    limit,
  };
}
