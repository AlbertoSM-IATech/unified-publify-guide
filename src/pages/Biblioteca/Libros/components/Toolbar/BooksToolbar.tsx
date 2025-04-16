
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { ViewToggle } from "./ViewToggle";

interface BooksToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortOrder?: string;
  setSortOrder?: (order: string) => void;
  filterState?: string;
  setFilterState?: (state: string) => void;
  filterContent?: string;
  setFilterContent?: (content: string) => void;
}

export const BooksToolbar = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode,
  sortOrder = "",
  setSortOrder = () => {},
  filterState = "",
  setFilterState = () => {},
  filterContent = "",
  setFilterContent = () => {}
}: BooksToolbarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  return (
    <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          filterState={filterState}
          setFilterState={setFilterState}
          filterContent={filterContent}
          setFilterContent={setFilterContent}
        />
        
        <SortDropdown
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        
        <ViewToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
        />
      </div>
    </div>
  );
};
