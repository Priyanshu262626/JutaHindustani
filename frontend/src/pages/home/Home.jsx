import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowRight, Tag, ShieldCheck, Flame, Truck } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await api.products.getAll();
      // Slice first 4 products to show as featured trending products
      setFeaturedProducts(data.slice(0, 4));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Top Banner Message */}
      <div className="bg-neutral-100 text-black text-center py-2 px-4 text-xs font-bold tracking-wider uppercase border-b border-gray-200">
        Free Delivery on orders above ₹4,999. Limited time offer!
      </div>

      {/* Hero Section */}
      <div className="relative bg-neutral-100 min-h-[500px] md:min-h-[600px] flex items-center px-6 md:px-16 overflow-hidden">
        {/* Subtle geometric circles */}
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-white/60 border border-neutral-200 rounded-full -translate-y-1/2 select-none pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10 py-12">
          {/* Text Content */}
          <div className="text-left space-y-6">
            <span className="inline-flex items-center text-xs font-extrabold tracking-widest text-orange-600 bg-orange-100/50 border border-orange-200 px-3 py-1 uppercase rounded">
              <Flame size={12} className="mr-1" /> New Season Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-black uppercase leading-[0.95]">
              STEP INTO <br />
              <span className="text-indigo-600">THE FUTURE</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
              Engineered for comfort. Styled for the streets. Walk with the bold spirit of JutaHindustani, featuring premium athletic sneakers, formal derby shoes, and outdoor boots.
            </p>
            <div className="pt-2">
              <Link to="/shop" className="nike-btn-black inline-flex items-center space-x-2">
                <span>Shop Collection</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="flex justify-center relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-neutral-200/50 border border-neutral-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none blur-sm"></div>
            <img 
              src="/images/shoes/nike-airmax.jpg" 
              alt="Featured Indian Sneaker" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-full max-w-[420px] object-contain drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
            {/* Fallback Display */}
            <div className="hidden w-80 h-80 rounded-2xl bg-black text-white items-center justify-center font-extrabold tracking-wider text-xl flex-col relative z-10">
              <span>JUTA HINDUSTANI</span>
              <span className="text-xs text-indigo-400 mt-2 font-mono uppercase">Premium Athletics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-black text-left uppercase tracking-tighter mb-8 border-l-4 border-black pl-3">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'SNEAKERS', label: 'Sneakers', img: '/images/shoes/nike-airmax.jpg' },
            { id: 'RUNNING', label: 'Running', img: '/images/shoes/adidas-ultraboost.jpg' },
            { id: 'CASUAL', label: 'Casual / Outdoor', img: '/images/shoes/woodland-boots.jpg' },
            { id: 'FORMAL', label: 'Formal Wear', img: '/images/shoes/bata-derby.jpg' },
          ].map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative h-72 rounded-lg overflow-hidden border border-gray-100 bg-neutral-50 flex items-end p-6 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer"
            >
              {/* Product Thumbnail background overlay */}
              <div className="absolute inset-0 p-8 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <img 
                  src={category.img} 
                  alt={category.label} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Title text overlay */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">{category.label}</h3>
                <span className="text-xxs font-bold text-orange-400 uppercase tracking-widest flex items-center mt-1">
                  Explore Now <ArrowRight size={10} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Products Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-neutral-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter border-l-4 border-black pl-3">
            Trending Footwear
          </h2>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-black hover:underline flex items-center">
            View All Shop <ArrowRight size={12} className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="border-3 border-black border-t-transparent w-8 h-8 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((shoe) => (
              <Link
                key={shoe.id}
                to={`/product/${shoe.id}`}
                className="group product-card rounded-lg flex flex-col h-full text-left overflow-hidden cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-square relative p-6 bg-white flex items-center justify-center overflow-hidden border-b border-white">
                  <img
                    src={shoe.imageUrl}
                    alt={shoe.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white border border-neutral-200 text-black px-2.5 py-0.5 rounded-full text-xxs font-bold uppercase flex items-center">
                    <Tag size={10} className="mr-1" />
                    {shoe.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-grow bg-white">
                  <span className="text-xxs text-gray-400 font-extrabold uppercase tracking-wider">{shoe.brand}</span>
                  <h3 className="text-sm font-bold text-black mt-1 line-clamp-1 group-hover:text-neutral-700 transition-colors">
                    {shoe.name}
                  </h3>
                  <span className="text-sm font-extrabold text-black mt-2 font-mono">
                    ₹{shoe.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-neutral-50 border-t border-neutral-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck size={32} className="text-black" />
            <h4 className="font-extrabold text-black uppercase tracking-wider text-xs">Secure Payments</h4>
            <p className="text-xs text-gray-500 max-w-xs">We protect checkout logs and card numbers using stateless cryptographic tokens.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Truck size={32} className="text-black" />
            <h4 className="font-extrabold text-black uppercase tracking-wider text-xs">Free Ship & Returns</h4>
            <p className="text-xs text-gray-500 max-w-xs">Free standard dispatch and delivery above ₹4,999, plus direct COD checking.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-sm text-black">HQ</div>
            <h4 className="font-extrabold text-black uppercase tracking-wider text-xs">Original Quality</h4>
            <p className="text-xs text-gray-500 max-w-xs">100% genuine products sourced directly from manufacturers in Hindustani regions.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
