
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { SortDropdown } from "./SortDropdown";
import { ViewToggle } from "./ViewToggle";

interface BooksToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  filterState: string;
  setFilterState: (state: string) => void;
  filterContent: string;
  setFilterContent: (content: string) => void;
}

export const BooksToolbar = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortOrder,
  setSortOrder,
  filterState,
  setFilterState,
  filterContent,
  setFilterContent,
}: BooksToolbarProps) => {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown 
          filterState={filterState}
          setFilterState={setFilterState}
          filterContent={filterContent}
          setFilterContent={setFilterContent}
        />
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
};
