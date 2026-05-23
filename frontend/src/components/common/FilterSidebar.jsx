import React from 'react';
import SearchBar from './SearchBar';
import { ArrowUpDown } from 'lucide-react';

export default function FilterSidebar({
  categories = [],
  activeCategory = 'ALL',
  onCategoryChange,
  activeSearch = '',
  onSearchChange,
  activeSort = 'none',
  onSortChange,
}) {
  return (
    <div className="space-y-8 text-left">
      {/* Search Bar */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Search</h3>
        <SearchBar 
          placeholder="e.g. Ultraboost, Bata"
          initialValue={activeSearch}
          onSubmit={onSearchChange}
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Categories</h3>
        <div className="flex flex-col space-y-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange && onCategoryChange(cat)}
              className={`text-left text-xs font-bold uppercase tracking-wider transition-colors border-0 bg-transparent cursor-pointer py-1 ${
                activeCategory === cat ? 'text-black border-l-2 border-black pl-2' : 'text-gray-400 hover:text-black pl-0'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Sort By</h3>
        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className="w-full bg-white border border-neutral-200 text-black text-xs font-bold uppercase tracking-wider rounded px-3 py-2.5 focus:outline-none focus:border-black cursor-pointer appearance-none"
          >
            <option value="none">Default Sort</option>
            <option value="price-low-high">Price: Low - High</option>
            <option value="price-high-low">Price: High - Low</option>
          </select>
          <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500">
            <ArrowUpDown size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
