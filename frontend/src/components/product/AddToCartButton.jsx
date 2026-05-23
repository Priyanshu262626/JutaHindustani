import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ onClick, loading = false, disabled = false, text = 'Add to bag' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="nike-btn-black w-full max-w-sm flex items-center justify-center space-x-2 text-sm disabled:opacity-75 cursor-pointer shadow-md"
    >
      {loading ? (
        <span className="border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin"></span>
      ) : (
        <>
          <ShoppingBag size={18} />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
