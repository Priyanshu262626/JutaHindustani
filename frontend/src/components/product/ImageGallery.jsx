import React, { useState } from 'react';

export default function ImageGallery({ imageUrl, alt = 'Shoe Image' }) {
  const [activeView, setActiveView] = useState('profile');

  if (!imageUrl) return null;

  // CSS transform classes to simulate multi-angle shots
  const viewStyles = {
    profile: '',
    closeUp: 'scale-125 origin-center',
    side: 'rotate-[-8deg] scale-95',
    top: 'rotate-[12deg] scale-90',
  };

  const views = [
    { id: 'profile', label: 'Profile' },
    { id: 'closeUp', label: 'Zoom' },
    { id: 'side', label: 'Sole' },
    { id: 'top', label: 'Angle' },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Main Large Display */}
      <div className="p-8 bg-white rounded-3xl flex items-center justify-center relative overflow-hidden h-[350px] md:h-[430px] border border-neutral-200/60 shadow-xs">
        <img
          src={imageUrl}
          alt={alt}
          className={`max-w-full max-h-full object-contain transition-all duration-500 relative z-10 ${viewStyles[activeView]}`}
        />
      </div>

      {/* Thumbnails row */}
      <div className="flex justify-start space-x-3 pt-2">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveView(v.id)}
            className={`w-16 h-16 sm:w-20 sm:h-20 p-2.5 rounded-2xl bg-white border-2 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${
              activeView === v.id 
                ? 'border-black shadow-sm scale-95' 
                : 'border-neutral-200/80 hover:border-neutral-300 hover:scale-105'
            }`}
          >
            <img
              src={imageUrl}
              alt={`${alt} view`}
              className={`max-w-full max-h-full object-contain pointer-events-none transition-transform duration-300 ${viewStyles[v.id]}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
