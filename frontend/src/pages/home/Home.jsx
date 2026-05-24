import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { ArrowRight, Tag, ShieldCheck, Flame, Truck } from 'lucide-react';
import HeroSlider from '../../components/layout/HeroSlider';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await api.products.getAll();
      // Filter out only the 6 custom PNG shoes for the landing page (slider & trending section)
      const pngShoes = data.filter(p => p.imageUrl && p.imageUrl.toLowerCase().endsWith('.png'));
      setSliderProducts(pngShoes);
      // Slice first 4 PNG products to show as featured trending products
      setFeaturedProducts(pngShoes.slice(0, 4));
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

      {/* Hero Showcase Slider */}
      <HeroSlider products={sliderProducts} loading={loading} />

      {/* Category Selection Grid Section */}
      <div className="max-w-8xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter border-l-4 border-indigo-600 pl-3">
            Browse Categories
          </h2>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black transition-colors flex items-center group/viewall cursor-pointer">
            <span>View all</span>
            <ArrowRight size={13} className="ml-1.5 transform group-hover/viewall:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'SNEAKERS', label: 'Sneakers', subtitle: 'Street style essentials', img: '/images/shoes/4rth-shoe.png', blob: 'bg-rose-200/40', rotate: '-15deg' },
            { id: 'RUNNING', label: 'Sports Shoes', subtitle: 'Performance meets comfort', img: '/images/shoes/2nd-shoe.png', blob: 'bg-sky-200/40', rotate: '-20deg' },
            { id: 'CASUAL', label: 'Boots', subtitle: 'Built for every terrain', img: '/images/shoes/woodland-boots.jpg', blob: 'bg-amber-200/45', rotate: '-10deg' },
            { id: 'FORMAL', label: 'Formal Shoes', subtitle: 'Elegance in every step', img: '/images/shoes/5th-shoe.png', blob: 'bg-neutral-300/40', rotate: '-25deg' },
          ].map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative h-80 rounded-[2rem] overflow-hidden bg-[#f9f9fb] flex flex-col justify-between p-7 border border-neutral-200/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Card Header */}
              <div className="text-left">
                <h3 className="text-lg font-black text-black tracking-tight uppercase leading-none">{category.label}</h3>
                <span className="text-xxs text-neutral-500 font-semibold mt-1 block">{category.subtitle}</span>
              </div>

              {/* Product Thumbnail background overlay */}
              <div className="relative w-full flex-grow flex items-center justify-center py-4">
                <div className={`absolute rounded-full ${category.blob} mix-blend-multiply filter blur-xs ${
                  category.img.includes('2nd-shoe.png') ? 'w-[175px] h-[175px]' : 'w-[145px] h-[145px]'
                }`} />
                <img
                  src={category.img}
                  alt={category.label}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className={`w-auto object-contain z-10 transition-all duration-300 drop-shadow-[0_12px_12px_rgba(0,0,0,0.1)] group-hover:scale-108 group-hover:rotate-0 ${
                    category.img.includes('2nd-shoe.png') ? 'h-[175px]' : 'h-[145px]'
                  }`}
                  style={{ transform: `rotate(${category.rotate})` }}
                />
              </div>

              {/* Action Button */}
              <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-black border border-neutral-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Products Grid Section */}
      <div className="max-w-8xl mx-auto px-6 py-8 border-t border-neutral-100">
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
                <div className="aspect-square relative p-3 bg-white flex items-center justify-center overflow-hidden border-b border-white">
                  <img
                    src={shoe.imageUrl}
                    alt={shoe.name}
                    className={`w-full h-full object-contain transform transition-transform duration-300 ${
                      shoe.imageUrl?.includes('2nd-shoe.png') ? 'scale-[1.18] group-hover:scale-[1.24]' : 'scale-[1.06] group-hover:scale-[1.12]'
                    }`}
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
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
            <p className="text-xs text-gray-500 max-w-xs">100% genuine products sourced directly from manufacturers in curated Soltrix partner networks.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
