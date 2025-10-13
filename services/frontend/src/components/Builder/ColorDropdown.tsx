'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { COLOR_SCALES, type ColorScaleName } from '@/types/bulletSystemV2';

interface ColorDropdownProps {
  value: ColorScaleName;
  onChange: (color: ColorScaleName) => void;
  colors: ColorScaleName[];
  label?: string;
  className?: string;
}

export function ColorDropdown({ value, onChange, colors, label, className = '' }: ColorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<ColorScaleName | null>(null);
  const [pillPosition, setPillPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedColorData = COLOR_SCALES[value];

  const getColorLabel = (colorKey: ColorScaleName): string => {
    const labels: Record<string, string> = {
      limeGreen: 'Verde Limão',
      teal: 'Verde Água',
      navy: 'Azul Marinho',
      lightBlue: 'Azul Claro',
      emerald: 'Esmeralda',
      orange: 'Laranja',
      pink: 'Rosa',
      purple: 'Roxo',
    };
    return labels[colorKey] || colorKey;
  };

  const isDarkColor = (colorKey: ColorScaleName): boolean => {
    const darkColors = ['navy', 'emerald', 'darkBrown', 'espresso', 'darkChocolate', 'deepOcean', 'deepForest',
      'deepTeal', 'deepPurple', 'deepViolet', 'nero', 'jetBlack', 'obsidian', 'onyxBlack', 'charcoalBlack',
      'midnightNavy', 'midnightSlate', 'aventurinaPreta', 'azulMarinho', 'marVerde', 'trilhaNaMata',
      'capimSeco', 'cinzaTecnologico', 'roxoRustico'];
    return darkColors.includes(colorKey);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label className="text-xs text-gray-600 block mb-1">{label}</label>
      )}

      {/* Selected color button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between"
        style={{
          backgroundImage: `linear-gradient(90deg, ${selectedColorData.light} 0%, ${selectedColorData.medium} 50%, ${selectedColorData.dark} 100%)`,
          color: isDarkColor(value) ? 'white' : 'black',
          fontWeight: '600',
        }}
      >
        <span>{getColorLabel(value)}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Custom dropdown menu */}
      {isOpen && (
        <>
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {colors.map((colorKey) => {
              const colorData = COLOR_SCALES[colorKey];
              const isSelected = colorKey === value;
              const isHovered = colorKey === hoveredColor;

              return (
                <button
                  key={colorKey}
                  type="button"
                  onClick={() => {
                    onChange(colorKey);
                    setIsOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    setHoveredColor(colorKey);
                    const buttonRect = e.currentTarget.getBoundingClientRect();
                    const dropdownRect = dropdownRef.current?.getBoundingClientRect();
                    setPillPosition({
                      x: dropdownRect ? dropdownRect.right + 8 : 0,
                      y: buttonRect.top
                    });
                  }}
                  onMouseLeave={() => setHoveredColor(null)}
                  className="w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-all"
                  style={{
                    backgroundColor: colorData.medium,
                    color: isDarkColor(colorKey) ? '#FFFFFF' : '#000000',
                  }}
                >
                  {isSelected && (
                    <Check className="w-4 h-4 flex-shrink-0" strokeWidth={3} />
                  )}
                  <span className="flex-1">{getColorLabel(colorKey)}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic hovering pill - OUTSIDE dropdown to avoid overflow clipping */}
          {hoveredColor && (
            <div
              className="fixed z-[100] flex items-center gap-2 p-2 rounded-full border-2 shadow-xl pointer-events-none transition-all duration-150"
              style={{
                backgroundColor: COLOR_SCALES[hoveredColor].light,
                borderColor: COLOR_SCALES[hoveredColor].dark,
                minWidth: '220px',
                left: `${pillPosition.x}px`,
                top: `${pillPosition.y}px`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-md flex-shrink-0"
                style={{
                  backgroundColor: COLOR_SCALES[hoveredColor].medium,
                }}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span
                  className="text-xs font-semibold truncate"
                  style={{
                    color: isDarkColor(hoveredColor) ? '#FFFFFF' : '#000000',
                  }}
                >
                  {getColorLabel(hoveredColor)}
                </span>
                <span
                  className="text-xs font-mono opacity-75"
                  style={{
                    color: isDarkColor(hoveredColor) ? '#FFFFFF' : '#000000',
                  }}
                >
                  {COLOR_SCALES[hoveredColor].medium}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
