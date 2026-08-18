import { apiBaseUrl } from '@/config';
import { TBrand } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface brandProps  {
    brandItem:TBrand
}

const BrandCard:React.FC<brandProps> = ({brandItem}) => {
    return (
       
             <Link
            href={`/product?brand=${brandItem.slug}`}
            key={brandItem._id}
            className="group relative overflow-hidden rounded border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
          >
            {/* Logo */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-50/70 p-5 transition-colors duration-300 group-hover:bg-primary/[0.03]">
              <Image
                src={apiBaseUrl + brandItem.image}
                alt={brandItem.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 12.5vw"
                className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Soft hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-primary/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Brand name */}
            <div className="border-t border-gray-100 px-2 py-3 text-center">
              <h3 className="truncate md:text-sm text-xs font-semibold text-gray-700 transition-colors duration-300 group-hover:text-primary">
                {brandItem.title}
              </h3>
            </div>

            {/* Bottom hover indicator */}
            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-12" />
          </Link>
       
    );
};

export default BrandCard;