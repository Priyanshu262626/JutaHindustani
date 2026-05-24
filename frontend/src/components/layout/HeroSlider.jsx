import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, ShieldCheck, Truck, ArrowRight, Sparkles } from 'lucide-react';

const getBrandScheme = (brand, index) => {
  const schemes = [
    {
      // Slide 0: Jordan 12 (White/Gold)
      bg: 'from-[#fafafa] via-[#f7f5ff] to-[#fff5f6]',
      blob: 'bg-indigo-200/50',
      accentText: 'text-indigo-600',
      badgeBg: 'bg-indigo-50/50',
      badgeBorder: 'border-indigo-100',
      blobColor: '#c7d2fe',
      gradient: 'from-amber-500 via-yellow-600 to-amber-700'
    },
    {
      // Slide 1: Nike Revolution (Grey)
      bg: 'from-[#f4f7fa] via-[#eef2ff] to-[#fff5f5]',
      blob: 'bg-sky-200/40',
      accentText: 'text-sky-600',
      badgeBg: 'bg-sky-50/50',
      badgeBorder: 'border-sky-100',
      blobColor: '#bae6fd',
      gradient: 'from-blue-600 via-sky-500 to-indigo-600'
    },
    {
      // Slide 2: Jordan 7 (Black/Red)
      bg: 'from-[#faf5f5] via-[#f5f3ff] to-[#fff3f3]',
      blob: 'bg-rose-200/40',
      accentText: 'text-rose-600',
      badgeBg: 'bg-rose-50/50',
      badgeBorder: 'border-rose-100',
      blobColor: '#fecdd3',
      gradient: 'from-red-600 via-rose-600 to-pink-600'
    },
    {
      // Slide 3: Nike Air Max 1 (Red/White)
      bg: 'from-[#fef9f5] via-[#f3f0ff] to-[#fff0f2]',
      blob: 'bg-orange-200/45',
      accentText: 'text-orange-600',
      badgeBg: 'bg-orange-50/50',
      badgeBorder: 'border-orange-100',
      blobColor: '#fdba74',
      gradient: 'from-orange-600 via-red-500 to-rose-600'
    },
    {
      // Slide 4: Bata Premium Derby (Black Leather)
      bg: 'from-[#f6f6f6] via-[#f0efff] to-[#faf9ff]',
      blob: 'bg-neutral-300/40',
      accentText: 'text-neutral-700',
      badgeBg: 'bg-neutral-50/50',
      badgeBorder: 'border-neutral-100',
      blobColor: '#d4d4d4',
      gradient: 'from-neutral-800 via-neutral-700 to-neutral-900'
    },
    {
      // Slide 5: Nike Vomero Neon (Lime/Black)
      bg: 'from-[#fafcf2] via-[#f4f7ff] to-[#fff8fb]',
      blob: 'bg-lime-200/40',
      accentText: 'text-lime-700',
      badgeBg: 'bg-lime-50/50',
      badgeBorder: 'border-lime-100',
      blobColor: '#d9f99d',
      gradient: 'from-lime-600 via-emerald-600 to-teal-600'
    }
  ];
  return schemes[index % schemes.length];
};

const cleanHeroTitle = (title) => {
  if (!title) return 'THE FUTURE';
  const upper = title.toUpperCase().trim();

  if (upper.includes('JORDAN 12')) return 'JORDAN 12 ROYALTY';
  if (upper.includes('REVOLUTION')) return 'REVOLUTION GREY';
  if (upper.includes('JORDAN 7')) return 'JORDAN 7 RETRO';
  if (upper.includes('AIR MAX 1')) return 'AIR MAX 1 RED';
  if (upper.includes('PREMIUM DERBY')) return 'PREMIUM DERBY';
  if (upper.includes('VOMERO')) return 'VOMERO NEON';

  return upper;
};

export default function HeroSlider({ products = [], loading = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const activeProducts = products.length > 0 ? products : [];

  // Reset autoplay timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isHovered && activeProducts.length > 1) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeProducts.length);
      }, 4500);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, activeProducts.length]);

  const handleNext = (e) => {
    e.preventDefault();
    if (activeProducts.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeProducts.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (activeProducts.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + activeProducts.length) % activeProducts.length);
  };

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="relative bg-neutral-100 min-h-[550px] md:min-h-[650px] flex items-center justify-center px-6 md:px-16 overflow-hidden">
        <div className="max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12">
          <div className="space-y-6 text-left animate-pulse pl-8 sm:pl-12 md:pl-16 lg:pl-16">
            <div className="h-6 w-32 bg-neutral-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-12 md:h-16 w-3/4 bg-neutral-200 rounded"></div>
              <div className="h-12 md:h-16 w-1/2 bg-neutral-200 rounded"></div>
            </div>
            <div className="h-20 w-5/6 bg-neutral-200 rounded"></div>
            <div className="h-12 w-40 bg-neutral-200 rounded"></div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-72 h-72 rounded-full bg-neutral-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback slide if no dynamic products are available
  if (activeProducts.length === 0) {
    return (
      <div className="relative bg-gradient-to-tr from-[#fafafa] via-[#f7f5ff] to-[#fff5f6] min-h-[550px] md:min-h-[650px] flex items-center px-6 md:px-16 overflow-hidden">
        <div className="max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12">
          <div className="text-left space-y-6 pl-8 sm:pl-12 md:pl-16 lg:pl-16">
            <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 uppercase">
              <Sparkles size={12} className="fill-current" />
              <span>New Season Collection</span>
            </span>
            <h1 className="text-5xl md:text-8.5xl font-black tracking-tighter text-black uppercase leading-[0.95] font-sans">
              STEP INTO <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent pb-2">THE FUTURE</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed font-normal">
              Explore our fresh drop of premium athletic, casual, and formal footwear crafted for ultimate comfort.
            </p>
            <div className="pt-2">
              <Link to="/shop" className="bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg inline-flex items-center space-x-2 border border-black cursor-pointer">
                <span>Shop Collection</span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className="w-80 h-80 rounded-full bg-neutral-200/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none blur-sm"></div>
            <div className="w-80 h-80 rounded-2xl bg-black text-white flex items-center justify-center font-extrabold tracking-wider text-xl flex-col relative z-10 shadow-2xl">
              <span>SOLTRIX</span>
              <span className="text-xs text-orange-400 mt-2 font-mono uppercase">Premium Footwear</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = activeProducts[currentIndex];
  const scheme = getBrandScheme(currentProduct.brand, currentIndex);
  const secondLine = cleanHeroTitle(currentProduct.title || currentProduct.name);

  // Transition variants
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 150 : -150
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -150 : 150,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const textVariants = {
    enter: { opacity: 0, y: 25 },
    center: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    }),
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  const shoeVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.75,
      rotate: dir > 0 ? 10 : -45,
      x: dir > 0 ? 200 : -200
    }),
    center: {
      opacity: 1,
      scale: 1,
      rotate: -20, // default stylish tilt angle
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 18,
        duration: 0.7
      }
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.75,
      rotate: dir > 0 ? -45 : 10,
      x: dir > 0 ? -200 : 200,
      transition: {
        duration: 0.4
      }
    })
  };

  const blobVariants = {
    enter: { scale: 0.4, opacity: 0 },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    },
    exit: { scale: 0.4, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div
      className={`relative h-[850px] sm:h-[730px] lg:h-[680px] flex items-center px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden transition-all duration-700 ease-in-out bg-gradient-to-tr ${scheme.bg}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-8xl mx-auto w-full relative z-10 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-16"
          >
            {/* Left Side: Content */}
            <div className="text-left space-y-6 pl-8 sm:pl-12 md:pl-16 lg:pl-16 order-2 lg:order-1 select-none min-h-[380px] sm:min-h-[400px] lg:min-h-[380px] flex flex-col justify-center">
              <motion.div
                variants={textVariants}
                custom={0}
                className="inline-flex items-center"
              >
                <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-indigo-600 bg-indigo-50/70 border border-indigo-100 uppercase">
                  <Sparkles size={12} className="fill-current" />
                  <span>New Season Collection</span>
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-[0.95] font-sans">
                <motion.span variants={textVariants} custom={1} className="block">
                  STEP INTO
                </motion.span>
                <motion.span
                  variants={textVariants}
                  custom={2}
                  className={`block bg-gradient-to-r ${scheme.gradient} bg-clip-text text-transparent pb-2`}
                >
                  {secondLine}
                </motion.span>
              </h1>

              <motion.p
                variants={textVariants}
                custom={3}
                className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed font-normal"
              >
                Engineered for comfort. Styled for the streets. Walk with the bold spirit of Soltrix.
              </motion.p>

              <motion.div
                variants={textVariants}
                custom={4}
                className="flex items-center space-x-4 pt-2"
              >
                <Link
                  to={`/product/${currentProduct.id}`}
                  className="bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg inline-flex items-center space-x-2 border border-black cursor-pointer shadow-md"
                >
                  <span>SHOP COLLECTION</span>
                  <ArrowRight size={14} />
                </Link>

              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={textVariants}
                custom={5}
                className="flex flex-wrap items-center gap-y-3 gap-x-8 pt-8 border-t border-neutral-200/60 w-full"
              >
                <span className="flex items-center text-xs font-bold text-neutral-600 space-x-2">
                  <ShieldCheck size={16} className="text-indigo-600" />
                  <span>Premium Quality</span>
                </span>
                <span className="flex items-center text-xs font-bold text-neutral-600 space-x-2">
                  <Flame size={16} className="text-indigo-600" />
                  <span>Latest Designs</span>
                </span>
                <span className="flex items-center text-xs font-bold text-neutral-600 space-x-2">
                  <Truck size={16} className="text-indigo-600" />
                  <span>Easy Returns</span>
                </span>
              </motion.div>
            </div>

            {/* Right Side: Product Image Display */}
            <div className="flex items-center justify-center order-1 lg:order-2 relative h-[300px] sm:h-[380px] md:h-[420px]">
              {/* SVG Orbit Lines */}
              <svg className="absolute w-[120%] h-[120%] pointer-events-none select-none z-0 overflow-visible opacity-75" viewBox="0 0 400 400" fill="none">
                <path d="M 40 200 A 160 135 15 1 1 360 200 A 160 135 15 1 1 40 200" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1.5" strokeDasharray="6 5" />
                <path d="M 70 200 A 130 100 -15 1 1 330 200 A 130 100 -15 1 1 70 200" stroke="rgba(124, 58, 237, 0.12)" strokeWidth="1" />
                <circle cx="40" cy="200" r="4" fill="#6366f1" />
                <circle cx="360" cy="200" r="4" fill="#7c3aed" />
                <circle cx="170" cy="72" r="3" fill="#3b82f6" />
                <circle cx="230" cy="328" r="3" fill="#818cf8" />
              </svg>

              {/* Animated Morphing Accent Shape */}
              <motion.div
                variants={blobVariants}
                animate={{
                  borderRadius: [
                    '42% 58% 70% 30% / 45% 45% 55% 55%',
                    '70% 30% 52% 48% / 60% 40% 60% 40%',
                    '48% 52% 60% 40% / 40% 60% 40% 60%',
                    '42% 58% 70% 30% / 45% 45% 55% 55%'
                  ]
                }}
                transition={{
                  borderRadius: {
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
                className={`w-72 h-72 sm:w-96 sm:h-96 absolute rounded-full ${scheme.blob} mix-blend-multiply filter blur-sm`}
              />

              {/* Floater shoe display wrapper */}
              <motion.div
                variants={shoeVariants}
                className="relative z-10 w-full flex flex-col items-center"
              >
                {/* Continuous oscillation (Floating shoe) */}
                <motion.div
                  animate={{
                    y: [-12, 12, -12],
                    rotate: [-20, -18, -20]
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-full flex justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.18)]"
                >
                  <img
                    src={currentProduct.imageUrl}
                    alt={currentProduct.title || currentProduct.name}
                    className={`w-auto h-[230px] sm:h-[300px] md:h-[350px] object-contain select-none pointer-events-none transform ${
                      currentProduct.imageUrl?.includes('2nd-shoe.png') ? 'scale-[1.22]' : ''
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Display */}
                  <div className="hidden w-64 h-64 rounded-2xl bg-black text-white items-center justify-center font-extrabold tracking-wider text-xl flex-col shadow-2xl rotate-[20deg]">
                    <span>{currentProduct.brand}</span>
                    <span className="text-xxs text-amber-400 mt-2 font-mono uppercase tracking-widest">{currentProduct.title || currentProduct.name}</span>
                  </div>
                </motion.div>

                {/* Animated soft drop shadow beneath the floating shoe */}
                <motion.div
                  animate={{
                    scale: [1, 0.85, 1],
                    opacity: [0.35, 0.18, 0.35]
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-48 sm:w-64 h-4 bg-black/20 rounded-full filter blur-md mt-4 select-none pointer-events-none absolute -bottom-10"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls: Chevrons */}
      {activeProducts.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200/50 hover:border-black bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 text-black hover:bg-black hover:text-white cursor-pointer select-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200/50 hover:border-black bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 text-black hover:bg-black hover:text-white cursor-pointer select-none"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Pagination dots indicator */}
      {activeProducts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {activeProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'w-8 bg-black' : 'w-2.5 bg-black/20 hover:bg-black/45'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
