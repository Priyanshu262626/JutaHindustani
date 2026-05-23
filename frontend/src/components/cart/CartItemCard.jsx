import React from 'react';
import { Trash2 } from 'lucide-react';

export default function CartItemCard({ item, onQtyChange, onRemove }) {
  if (!item) return null;

  const handleQtyChange = (amount) => {
    if (onQtyChange) {
      onQtyChange(item.id, item.quantity, amount);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  return (
    <div className="py-6 flex flex-col sm:flex-row items-center gap-6 relative border-b border-neutral-100 last:border-0">
      {/* Product Thumbnail */}
      <div className="w-28 h-28 rounded bg-neutral-100 p-3 flex items-center justify-center shrink-0 border border-neutral-200/50">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          className="w-full h-full object-contain"
        />
        {/* Fallback Display */}
        <div className="hidden absolute inset-0 items-center justify-center font-bold text-black bg-neutral-200">
          {item.product.brand[0]}
        </div>
      </div>

      {/* Info details */}
      <div className="flex-grow space-y-1 text-center sm:text-left">
        <span className="text-xxs text-gray-400 font-extrabold uppercase tracking-widest">{item.product.brand}</span>
        <h3 className="text-base font-bold text-black uppercase tracking-tight">{item.product.name}</h3>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5">
          <span className="text-xxs text-gray-500 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded font-mono font-bold">
            Size: UK {item.size}
          </span>
          <span className="text-xxs text-gray-500 font-mono">
            Price: ₹{item.product.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Actions & Price */}
      <div className="flex items-center space-x-8 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-100">
        {/* Qty adjustments */}
        <div className="flex items-center space-x-3 bg-neutral-100 border border-neutral-200 rounded p-1">
          <button
            type="button"
            onClick={() => handleQtyChange(-1)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 border-0 cursor-pointer bg-transparent font-bold"
            aria-label="Decrease Quantity"
          >
            -
          </button>
          <span className="text-black font-extrabold font-mono text-xs w-4 text-center select-none">{item.quantity}</span>
          <button
            type="button"
            onClick={() => handleQtyChange(1)}
            disabled={item.quantity >= item.product.stock}
            className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:text-black disabled:opacity-30 border-0 cursor-pointer bg-transparent font-bold"
            aria-label="Increase Quantity"
          >
            +
          </button>
        </div>

        {/* Item Total Price */}
        <span className="text-base font-extrabold text-black font-mono w-24 text-right hidden sm:block">
          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
        </span>

        {/* Delete button */}
        <button
          type="button"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-400 p-2 rounded hover:bg-red-50 transition-colors border-0 cursor-pointer bg-transparent"
          title="Remove Item"
        >
          <Trash2 size={16} />
        </button>
      </div>

    </div>
  );
}
