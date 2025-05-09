
import { useState, useMemo, useEffect, useCallback } from "react";
import { Book } from "../types/bookTypes";
import { filterObjectsBySearchQuery, sortObjectsByProperty } from "@/utils/dataUtils";

interface UseBookFiltersProps {
  books: Book[];
  itemsPerPage?: number;
}

export const useBookFilters = ({ books, itemsPerPage = 12 }: UseBookFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterContent, setFilterContent] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    // First apply text search filter
    let result = books;
    
    if (searchQuery) {
      // Use the utility function for text searching across multiple properties
      result = filterObjectsBySearchQuery(
        result, 
        searchQuery, 
        ['titulo', 'subtitulo', 'autor']
      );
    }
    
    // Then apply state filter if set
    if (filterState) {
      result = result.filter(libro => libro.estado.toLowerCase() === filterState.toLowerCase());
    }
    
    // Then apply content filter if set
    if (filterContent) {
      result = result.filter(libro => libro.contenido.toLowerCase() === filterContent.toLowerCase());
    }
    
    // Finally, apply sorting
    if (sortOrder) {
      const [field, direction] = sortOrder.split('_');
      result = sortObjectsByProperty(result, field as keyof Book, direction as 'asc' | 'desc');
    }
    
    return result;
  }, [books, searchQuery, filterState, filterContent, sortOrder]);
  
  // Calculate total pages
  const totalPages = useMemo(() => 
    Math.ceil(filteredBooks.length / itemsPerPage), 
    [filteredBooks, itemsPerPage]
  );
  
  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage, itemsPerPage]);

  // Handle page change with scroll to top
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Reset to first page when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterState, filterContent, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    filterState,
    setFilterState,
    filterContent,
    setFilterContent,
    sortOrder,
    setSortOrder,
    currentPage,
    totalPages,
    currentItems,
    handlePageChange
  };
};
