import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';

// Reusable Components Imports
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ImageGallery from '../../components/product/ImageGallery';
import SizeSelector from '../../components/product/SizeSelector';
import QuantitySelector from '../../components/product/QuantitySelector';
import AddToCartButton from '../../components/product/AddToCartButton';
import RelatedProducts from '../../components/product/RelatedProducts';

import { ArrowLeft, Tag, Info, AlertTriangle, Heart } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, toggleWishlist, isInWishlist } = useAuth();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [togglingFav, setTogglingFav] = useState(false);

  const isFavorite = user ? isInWishlist(product?.id) : false;

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    if (user.role === 'ROLE_ADMIN') {
      toast('Administrators cannot add items to favorites.', 'error');
      return;
    }
    setTogglingFav(true);
    try {
      await toggleWishlist(product.id);
      toast(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'success');
    } catch (err) {
      toast('Failed to update favorites', 'error');
    } finally {
      setTogglingFav(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.products.getById(id);
      setProduct(data);
      if (data.sizes) {
        setSelectedSize(data.sizes.split(',')[0]);
      }
    } catch (err) {
      setError('Product details could not be loaded.');
      toast('Product details could not be loaded.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    if (user.role === 'ROLE_ADMIN') {
      toast('Administrators cannot add items to cart.', 'error');
      return;
    }

    if (!selectedSize) {
      toast('Please select a shoe size.', 'warning');
      return;
    }

    setAdding(true);

    try {
      await addToCart(product.id, quantity, selectedSize);
      toast(`Successfully added ${quantity} item(s) (UK ${selectedSize}, Style: ${product.color}) to your bag!`, 'success');
    } catch (err) {
      toast(err.message || 'Failed to add item to cart.', 'error');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage message="Loading shoe specifications..." />;
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center bg-white">
        <div className="border border-neutral-200 p-8 rounded-lg bg-neutral-50">
          <p className="text-red-500 font-bold">{error || 'Product not found.'}</p>
          <Link to="/shop" className="mt-4 inline-flex items-center text-black hover:underline font-bold text-xs uppercase tracking-wider">
            <ArrowLeft size={14} className="mr-1.5" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const sizesArray = product.sizes ? product.sizes.split(',') : [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-8xl mx-auto px-6 py-12">
        
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center text-gray-400 hover:text-black mb-8 transition-colors text-xs font-bold uppercase tracking-wider">
          <ArrowLeft size={14} className="mr-1.5" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          
          {/* Left Column: Image Gallery Component */}
          <div>
            <ImageGallery imageUrl={product.imageUrl} alt={product.name} />
          </div>

          {/* Right Column: Shoe details */}
          <div className="flex flex-col space-y-6">
            
            <div>
              {/* Brand */}
              <span className="text-xs text-gray-400 font-extrabold uppercase tracking-widest flex items-center">
                <Tag size={12} className="mr-1.5 text-black" /> {product.brand}
              </span>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-black mt-2 uppercase tracking-tighter leading-tight">
                {product.name}
              </h1>
              {/* Category */}
              <span className="text-xxs font-bold text-gray-400 uppercase tracking-widest block mt-1">
                Category: {product.category}
              </span>
            </div>

            {/* Price & Stock bar */}
            <div className="flex items-center space-x-6 pb-6 border-b border-neutral-100">
              <span className="text-2xl font-mono font-black text-black">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              
              {product.stock > 0 ? (
                <span className="bg-green-50 border border-green-200 text-green-700 px-3 py-0.5 rounded-full text-xxs font-extrabold uppercase tracking-wider">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="bg-red-50 border border-red-200 text-red-600 px-3 py-0.5 rounded-full text-xxs font-extrabold uppercase tracking-wider flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">Description</h3>
              <p className="text-gray-600 mt-2 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Reusable Sizing Component */}
            {product.stock > 0 && (
              <SizeSelector
                sizes={sizesArray}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            )}

            {/* Reusable Quantity Selection Component */}
            {product.stock > 0 && (
              <QuantitySelector
                quantity={quantity}
                maxStock={product.stock}
                onChange={setQuantity}
              />
            )}

            {/* Reusable AddToCart Button */}
            {product.stock > 0 && (
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <AddToCartButton
                  onClick={handleAddToCart}
                  loading={adding}
                  text={user ? 'Add to bag' : 'Sign in to buy'}
                />
                {(!user || user.role === 'ROLE_CUSTOMER') && (
                  <button
                    onClick={handleToggleWishlist}
                    disabled={togglingFav}
                    className="border border-neutral-300 rounded px-6 py-4 flex items-center justify-center font-bold text-xs uppercase tracking-wider transition-all hover:bg-neutral-50 cursor-pointer w-full sm:w-auto gap-2 bg-white text-black min-h-[50px] shrink-0"
                  >
                    <Heart size={16} className={isFavorite ? "fill-red-500 text-red-500" : "text-black"} />
                    <span>{isFavorite ? 'Favorite' : 'Add to Favorites'}</span>
                  </button>
                )}
              </div>
            )}

            {/* Admin Helper Box */}
            {user && user.role === 'ROLE_ADMIN' && (
              <div className="bg-neutral-50 border border-neutral-200 p-4 rounded flex items-center justify-between">
                <span className="text-xs text-gray-600 flex items-center font-semibold">
                  <Info size={14} className="mr-2 text-black shrink-0" />
                  You are logged in as Admin.
                </span>
                <Link
                  to={`/admin/edit-product/${product.id}`}
                  className="nike-btn-black py-1.5 px-3 text-xxs cursor-pointer"
                >
                  Edit in Catalog
                </Link>
              </div>
            )}

          </div>

        </div>

        {/* Reusable Related Footwear Component */}
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />

      </div>
    </div>
  );
}
