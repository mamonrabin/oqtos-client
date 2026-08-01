"use client";

import { TProduct } from '@/types';
import React, { useState, useRef } from 'react';
interface ProductProps {
  product: TProduct;
}
const ProductInformation: React.FC<ProductProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const descriptionRef = useRef<HTMLDivElement>(null);
  const specificationRef = useRef<HTMLDivElement>(null);

  // Helper to render specification list
  const renderSpecifications = (specs?: { key: string; value: string }[]) => {
    if (!specs || specs.length === 0) return <p className="text-gray-500">No specifications available.</p>;

    // Group specifications into two columns for a cleaner look
    const midPoint = Math.ceil(specs.length / 2);
    const leftCol = specs.slice(0, midPoint);
    const rightCol = specs.slice(midPoint);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2  gap-y-2">
        <div className="space-y-2">
          {leftCol.map((spec, index) => (
            <div key={`left-${index}`} className="flex py-1 border-b border-gray-100">
              <span className="w-2/5 text-sm font-medium text-gray-600">{spec.key}</span>
              <span className="w-3/5 text-sm text-gray-800">{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {rightCol.map((spec, index) => (
            <div key={`right-${index}`} className="flex py-1 border-b border-gray-100">
              <span className="w-2/5 text-sm font-medium text-gray-600">{spec.key}</span>
              <span className="w-3/5 text-sm text-gray-800">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Scroll to the respective section with a smooth offset
    setTimeout(() => {
      const targetRef = tab === 'description' ? descriptionRef : specificationRef;
      if (targetRef.current) {
        const yOffset = -80; // Adjust based on your sticky header height
        const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="mx-auto ">
      {/* Tab Buttons - Sticky on scroll */}
      <div className="sticky top-0 z-10 bg-[#F1F1F1] Container backdrop-blur-sm py-4 border-b border-gray-200 flex gap-2 md:gap-4 overflow-x-auto">
        <button
          onClick={() => handleTabClick('description')}
          className={`px-4 md:px-8 py-3 text-sm md:text-base font-semibold rounded transition-all whitespace-nowrap ${
            activeTab === 'description'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => handleTabClick('specification')}
          className={`px-4 md:px-8 py-3 text-sm md:text-base font-semibold rounded transition-all whitespace-nowrap ${
            activeTab === 'specification'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300'
          }`}
        >
          Specifications
        </button>
      </div>

      {/* Description Section */}
      <div ref={descriptionRef} className="mt-10 scroll-mt-20 Container">
        <h3 className="text-xl font-medium text-gray-800 mb-4">{product.title}</h3>
        <div 
          className="text-sm max-w-none  text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Specifications Section */}
      <div ref={specificationRef} className="mt-10 scroll-mt-20 Container">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Specifications</h3>
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
          {renderSpecifications(product.specifications)}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;