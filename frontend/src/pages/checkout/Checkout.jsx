import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { api } from '../../services/api';
import CheckoutForm from '../../components/cart/CheckoutForm';
import CartSummary from '../../components/cart/CartSummary';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Checkout() {
  const { cart, loadCart } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cartItems = cart?.cartItems || [];

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center bg-white">
        <div className="border border-neutral-200 p-8 rounded-lg bg-neutral-50">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Your bag is empty. Cannot checkout.</p>
          <Link to="/shop" className="nike-btn-black mt-4 inline-flex text-xs">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryCharge = subtotal > 4999 ? 0 : 250;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrderSubmit = async (formData) => {
    setError('');
    setLoading(true);

    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

    try {
      // Place order api request
      const order = await api.orders.checkout(fullAddress);
      
      // Sync local cart
      await loadCart();
      
      toast('Order registered successfully!', 'success');
      
      // Redirect
      navigate('/order-success', { state: { order } });
    } catch (err) {
      setError(err.message || 'Failed to place order.');
      toast(err.message || 'Failed to place order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Back Link */}
        <Link to="/cart" className="inline-flex items-center text-gray-400 hover:text-black mb-8 transition-colors text-xs font-bold uppercase tracking-wider">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Bag
        </Link>

        <h1 className="text-3xl font-black text-black text-left uppercase tracking-tighter mb-8 border-b border-neutral-100 pb-4">
          Checkout
        </h1>

        {error && (
          <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-xs mb-8 max-w-4xl text-left">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
          
          {/* Checkout Form (Left Columns) */}
          <div className="lg:col-span-2">
            <CheckoutForm
              onSubmit={handlePlaceOrderSubmit}
              loading={loading}
            />
          </div>

          {/* Checkout summary details (Right Column) */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-28">
              {/* Order Items list review */}
              <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50 shadow-xs">
                <h3 className="text-sm font-black text-black border-b border-neutral-200 pb-3 mb-5 uppercase tracking-tight">Review Items</h3>
                <div className="max-h-56 overflow-y-auto space-y-4 pr-1 scrollbar-none">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-semibold">
                      <div className="flex items-center space-x-3 text-left">
                        <div className="w-10 h-10 rounded bg-white border border-neutral-200 p-1 flex items-center justify-center shrink-0">
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-bold text-black truncate w-32 uppercase">{item.product.name}</h4>
                          <p className="text-gray-400 font-mono text-xxs">Qty: {item.quantity} | Sz: {item.size}</p>
                        </div>
                      </div>
                      <span className="font-mono text-black">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* reusable subtotal summaries */}
              <CartSummary
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                total={total}
                showCheckoutBtn={false} // Submit is managed by CheckoutForm
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
