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
      <div className="p-8 bg-white rounded-lg flex items-center justify-center relative overflow-hidden h-[350px] md:h-[450px] border border-neutral-200/40">
        <img
          src={imageUrl}
          alt={alt}
          className={`max-w-full max-h-full object-contain transition-all duration-500 relative z-10 ${viewStyles[activeView]}`}
        />
      </div>

      {/* Thumbnails row */}
      <div className="grid grid-cols-4 gap-4">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveView(v.id)}
            className={`aspect-square p-2 rounded bg-white border flex items-center justify-center overflow-hidden cursor-pointer transition-all ${
              activeView === v.id ? 'border-black ring-1 ring-black' : 'border-neutral-200 hover:border-neutral-400'
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
