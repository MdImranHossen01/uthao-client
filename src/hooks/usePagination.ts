import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 10; // You can adjust this value

export function usePagination<T>(data: T[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
}