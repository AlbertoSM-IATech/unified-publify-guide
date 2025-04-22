
import { useState } from 'react';

interface PaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({ items, itemsPerPage = 50 }: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
  };
}
