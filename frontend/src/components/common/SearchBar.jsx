import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search...', onSubmit, initialValue = '' }) {
  const [val, setVal] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full nike-input pr-10 text-xs"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-2.5 text-gray-400 hover:text-black bg-transparent border-0 cursor-pointer p-0.5"
        aria-label="Search"
      >
        <Search size={14} />
      </button>
    </form>
  );
}
