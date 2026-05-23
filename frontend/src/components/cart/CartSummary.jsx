import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

export default function CartSummary({
  subtotal = 0,
  deliveryCharge = 0,
  total = 0,
  onCheckout,
  showCheckoutBtn = true,
}) {
  return (
    <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50 sticky top-28 text-left">
      <h2 className="text-lg font-black text-black uppercase tracking-tight border-b border-neutral-200 pb-3 mb-5">Summary</h2>

      <div className="space-y-4 text-xs mb-6 font-semibold">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-mono text-black">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Delivery Charges</span>
          <span className="font-mono text-black">
            {deliveryCharge === 0 ? <span className="text-green-600 font-extrabold uppercase">FREE</span> : `₹${deliveryCharge}`}
          </span>
        </div>

        {deliveryCharge > 0 && (
          <div className="bg-neutral-200/40 border border-neutral-300 p-3 rounded flex items-start space-x-2">
            <Info size={12} className="text-black mt-0.5 shrink-0" />
            <p className="text-xxs text-gray-600 leading-normal font-medium">
              Add <strong>₹{(5000 - subtotal).toLocaleString('en-IN')}</strong> more to your order for free shipping!
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-black border-t border-neutral-200 pt-4 mb-6">
        <span>Grand Total</span>
        <span className="font-mono text-xl text-black font-black">₹{total.toLocaleString('en-IN')}</span>
      </div>

      {showCheckoutBtn && (
        <button
          type="button"
          onClick={onCheckout}
          className="w-full nike-btn-black flex items-center justify-center space-x-2 text-sm cursor-pointer shadow-md"
        >
          <span>Checkout</span>
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
