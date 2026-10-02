import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="search"
        id="product-search-input"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search products by title..."
        aria-label="Search products"
        className="w-full pl-10 pr-9 py-2.5 bg-neutral-900/90 text-neutral-100 placeholder-neutral-500 text-sm rounded-xl border border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-all duration-200"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
