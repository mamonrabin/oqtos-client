"use client";
import React, { useState } from 'react';
import { Check, ChevronRight, CheckCircle } from 'lucide-react';

const ShippingPolicyCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 bg-[#FAFAFA] rounded-lg border border-gray-200 overflow-hidden">
      {/* Toggle Header */}
      <div 
        className="shipping-toggle flex  items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="label-left flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
          <strong className="text-xs text-gray-800">
            Easy Returns & Exchange
          </strong>
        </div>
        <div className={`chevron transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight size={14} className="text-gray-500" />
        </div>
      </div>

      {/* Highlights Section */}
      <div className="shipping-highlights flex md:flex-row flex-col md:items-center md:gap-4 gap-2 px-4 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <CheckCircle size={16} className="text-primary" />
          <span>Tell us within 7 days</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <CheckCircle size={16} className="text-primary" />
          <span>Free return shipping*</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <CheckCircle size={16} className="text-primary" />
          <span>Instant refund on receipt</span>
        </div>
      </div>

      {/* Policy Details (Collapsible) */}
      <div 
        className={`shipping-policy text-xs overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-4">
          <p className=" text-gray-700">
            Your satisfaction is our priority. If something isn t right with your order, returning it is simple.
          </p>

          <div className="policy-section space-y-1">
            <div className="policy-section-title  font-semibold text-gray-800">
              Return Window
            </div>
            <p className=" text-gray-600">
              Request a return within <strong>7 days</strong> of receiving your order.
            </p>
          </div>

          <div className="policy-section space-y-1">
            <div className="policy-section-title font-semibold text-gray-800">
              Free Return Shipping
            </div>
            <p className=" text-gray-600">
              We cover return shipping for defective products, size/color mismatch, print issues, or wrong item sent.
            </p>
          </div>

          <div className="policy-section space-y-1">
            <div className="policy-section-title  font-semibold text-gray-800">
              How to Return
            </div>
            <ul className=" text-gray-600 space-y-1 list-disc pl-5">
              <li>
                Call our hotline <a href="tel:+8809677666888" className="text-blue-600 hover:underline">+8809677666888</a>, 
                email <a href="mailto:support@fabrilife.com" className="text-blue-600 hover:underline">support@fabrilife.com</a>, 
                or message us on <a href="https://www.facebook.com/fabrilife" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
              </li>
              <li>Items must be unused, unwashed, with original tags and packaging</li>
              <li>We ll arrange pickup for eligible returns</li>
            </ul>
          </div>

          <div className="policy-section space-y-1">
            <div className="policy-section-title  font-semibold text-gray-800">
              Refunds
            </div>
            <p className=" text-gray-600">
              Once we receive your return, refunds are processed within <strong>1 business day</strong> to your original payment method.
            </p>
          </div>

          <div className="policy-section space-y-1">
            <div className="policy-section-title font-semibold text-gray-800">
              Our Promise
            </div>
            <p className=" text-gray-600">
              We stand behind our products. In rare cases, we may issue a refund without requiring return — because your trust matters most.
            </p>
          </div>

          <p className="text-center mt-3">
            <a href="/refund-policy" className="text-blue-600 hover:underline">
              View Full Return & Refund Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyCard;