import React from 'react';

export default function ColorSelector({ colors = [], selectedColor, onColorChange }) {
  // Default fallback color variations if none are provided
  const activeColors = colors.length > 0 ? colors : [
    { name: 'Stark White', value: '#ffffff', class: 'bg-white border-neutral-300' },
    { name: 'Matte Black', value: '#111111', class: 'bg-neutral-900 border-neutral-900' },
    { name: 'Saffron Orange', value: '#e28743', class: 'bg-amber-600 border-amber-600' },
    { name: 'Indigo Blue', value: '#1e3d59', class: 'bg-blue-900 border-blue-900' },
    { name: 'Emerald Green', value: '#17b978', class: 'bg-green-600 border-green-600' },
  ];

  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-black mb-3">Select Color Style</h3>
      <div className="flex items-center space-x-3">
        {activeColors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onColorChange && onColorChange(color.name)}
            title={color.name}
            className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${color.class} ${
              selectedColor === color.name ? 'ring-2 ring-black ring-offset-2 scale-110' : 'hover:scale-105'
            }`}
            aria-label={color.name}
          />
        ))}
      </div>
      {selectedColor && (
        <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mt-1.5 text-left">
          Style: {selectedColor}
        </span>
      )}
    </div>
  );
}
