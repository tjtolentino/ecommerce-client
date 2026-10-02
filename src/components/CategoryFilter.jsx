import { Filter } from "lucide-react";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="relative min-w-[180px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
        <Filter className="w-4 h-4" />
      </div>

      <select
        id="category-filter-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
        className="w-full pl-10 pr-8 py-2.5 bg-neutral-900/90 text-neutral-100 text-sm rounded-xl border border-neutral-800 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
      >
        <option value="All" className="bg-neutral-950 text-neutral-100">All Categories</option>
        <option value="Electronics" className="bg-neutral-950 text-neutral-100">Electronics</option>
        <option value="Accessories" className="bg-neutral-950 text-neutral-100">Accessories</option>
        <option value="Books" className="bg-neutral-950 text-neutral-100">Books</option>
      </select>

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default CategoryFilter;
