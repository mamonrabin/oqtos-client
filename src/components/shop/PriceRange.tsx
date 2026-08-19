/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function PriceRangeFilter() {
  const calculatedMaxPrice = 10000;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(calculatedMaxPrice);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, max - 1);
    setMin(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, min + 1);
    setMax(newMax);
  };

  return (
    <div className="group">
      <div className="pb-4">
        <div className="relative my-4">
          {/* Track background */}
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200 rounded" />

          {/* Selected range */}
          <div
            className="absolute top-1/2 h-1 bg-black rounded"
            style={{
              left: `${(min / calculatedMaxPrice) * 100}%`,
              right: `${100 - (max / calculatedMaxPrice) * 100}%`,
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            min={0}
            max={calculatedMaxPrice}
            value={min}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute top-0.5 w-full appearance-none h-0 range-thumb pointer-events-none"
          />

          {/* Max slider */}
          <input
            type="range"
            min={0}
            max={calculatedMaxPrice}
            value={max}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute -top-0.75 w-full appearance-none h-3 range-thumb bg-transparent pointer-events-none"
          />
        </div>

        {/* Input boxes */}
        <div className="flex items-center gap-2 pt-6">
          <label className="flex items-center gap-1 border rounded px-2 py-1 text-sm">
            <span className="text-gray-500">৳</span>
            <input
              type="number"
              min={0}
              max={calculatedMaxPrice}
              value={min}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="w-20 outline-none"
            />
          </label>

          <span className="text-gray-500">to</span>

          <label className="flex items-center gap-1 border rounded px-2 py-1 text-sm">
            <span className="text-gray-500">৳</span>
            <input
              type="number"
              min={0}
              max={calculatedMaxPrice}
              value={max}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="w-20 outline-none"
            />
          </label>
        </div>
      </div>

      <style jsx>{`
        input[type="range"].range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          pointer-events: auto;
        }

        input[type="range"].range-thumb::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: 2px solid white;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
