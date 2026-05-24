import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from './Toast';

export default function ProductCard({ product }) {
  if (!product) return null;

  const { user, toggleWishlist, isInWishlist } = useAuth();
  const showToast = useToast();

  const isFavorite = user ? isInWishlist(product.id) : false;

  const handleFavClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      showToast('Please sign in to save favorites!', 'info');
      return;
    }
    try {
      await toggleWishlist(product.id);
      showToast(isFavorite ? 'Removed from Favorites' : 'Saved to Favorites', 'success');
    } catch (err) {
      showToast('Failed to update favorites', 'error');
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group product-card rounded-lg overflow-hidden flex flex-col h-full text-left cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square relative p-6 bg-white flex items-center justify-center border-b border-white overflow-hidden">
        {/* Wishlist Button Overlay */}
        {(!user || user.role === 'ROLE_CUSTOMER') && (
          <button
            onClick={handleFavClick}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs border border-neutral-200 flex items-center justify-center text-black hover:bg-white hover:scale-105 transition-all shadow-xxs cursor-pointer"
            aria-label="Toggle Wishlist"
          >
            <Heart 
              size={16} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} 
            />
          </button>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Fallback Display */}
        <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-white">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-3">
            <span className="text-2xl font-black">{product.brand[0]}</span>
          </div>
          <span className="text-xxs text-gray-500 font-extrabold uppercase tracking-widest">{product.brand}</span>
          <span className="text-sm font-bold text-black mt-1 uppercase">{product.name}</span>
        </div>

        {/* Tag Category */}
        <div className="absolute top-3 left-3 bg-white border border-neutral-200 text-black px-2.5 py-0.5 rounded-full text-xxs font-bold uppercase flex items-center">
          <Tag size={10} className="mr-1" />
          {product.category}
        </div>
      </div>

      {/* Info details */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <span className="text-xxs text-gray-400 font-extrabold uppercase tracking-wider">{product.brand}</span>
        <h3 className="text-sm font-bold text-black mt-0.5 line-clamp-1 group-hover:text-neutral-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-xxs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Sizes preview */}
        <div className="flex gap-1 flex-wrap mt-3">
          {product.sizes.split(',').slice(0, 3).map((sz) => (
            <span key={sz} className="text-xxs px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-gray-500 font-bold rounded">
              {sz}
            </span>
          ))}
          {product.sizes.split(',').length > 3 && (
            <span className="text-xxs px-2 py-0.5 bg-neutral-100 text-gray-400 font-bold rounded">
              +{product.sizes.split(',').length - 3}
            </span>
          )}
        </div>

        {/* Bottom Price Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center">
          <span className="text-base font-extrabold text-black font-mono">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xxs font-extrabold uppercase tracking-wider text-black group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
