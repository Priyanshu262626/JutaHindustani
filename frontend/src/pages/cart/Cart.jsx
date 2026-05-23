import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import CartItemCard from '../../components/cart/CartItemCard';
import CartSummary from '../../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const cartItems = cart?.cartItems || [];

  const handleQtyChange = async (itemId, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty < 1) return;
    try {
      await updateCartQuantity(itemId, newQty);
      toast('Quantity updated.', 'success');
    } catch (err) {
      toast('Failed to update quantity.', 'error');
    }
  };

  const handleRemove = async (itemId) => {
    if (!window.confirm('Remove this item from your bag?')) return;
    try {
      await removeFromCart(itemId);
      toast('Item removed from bag.', 'success');
    } catch (err) {
      toast('Failed to remove item.', 'error');
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryCharge = subtotal > 4999 ? 0 : 250;
  const total = subtotal + deliveryCharge;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-black text-left uppercase tracking-tighter mb-8 border-b border-neutral-100 pb-4">
          Shopping Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 border border-neutral-200 rounded-lg max-w-2xl mx-auto bg-neutral-50">
            <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-lg font-bold text-black uppercase tracking-tight">Your bag is empty</h2>
            <p className="text-gray-500 mt-2 text-xs max-w-xs mx-auto leading-relaxed">
              Once you add products to your shopping bag, they will appear here. Start browsing our new season arrivals.
            </p>
            <Link
              to="/shop"
              className="nike-btn-black mt-6 inline-flex items-center space-x-2 text-xs"
            >
              <ArrowLeft size={14} /> <span>Shop catalog</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
            
            {/* Bag Items list */}
            <div className="lg:col-span-2 divide-y divide-neutral-100">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Price invoice Summary Component */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                total={total}
                onCheckout={() => navigate('/checkout')}
                showCheckoutBtn={true}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
