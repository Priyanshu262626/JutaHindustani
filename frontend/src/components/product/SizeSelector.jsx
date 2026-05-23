import React from 'react';

export default function SizeSelector({ sizes = [], selectedSize, onSizeChange }) {
  if (sizes.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Select Size (UK/India)</h3>
      <div className="grid grid-cols-5 gap-2 max-w-xs">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSizeChange && onSizeChange(size)}
            className={`h-11 border rounded text-sm font-bold font-mono transition-all cursor-pointer ${
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-neutral-200 bg-white text-black hover:border-neutral-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
