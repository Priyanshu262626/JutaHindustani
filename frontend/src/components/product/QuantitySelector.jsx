import React from 'react';

export default function QuantitySelector({ quantity = 1, maxStock = 10, onChange }) {
  const handleDecrement = () => {
    if (quantity > 1 && onChange) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock && onChange) {
      onChange(quantity + 1);
    }
  };

  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Quantity</h3>
      <div className="flex items-center space-x-3 bg-neutral-100 border border-neutral-200 rounded w-28 justify-between p-1">
        <button
          type="button"
          disabled={quantity <= 1}
          onClick={handleDecrement}
          className="w-7 h-7 flex items-center justify-center font-bold text-gray-500 hover:text-black disabled:opacity-30 border-0 cursor-pointer bg-transparent"
          aria-label="Decrease Quantity"
        >
          -
        </button>
        <span className="text-black font-extrabold font-mono text-xs select-none">{quantity}</span>
        <button
          type="button"
          disabled={quantity >= maxStock}
          onClick={handleIncrement}
          className="w-7 h-7 flex items-center justify-center font-bold text-gray-500 hover:text-black disabled:opacity-30 border-0 cursor-pointer bg-transparent"
          aria-label="Increase Quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
