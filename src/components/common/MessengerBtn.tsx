"use client";

import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookMessenger,
  FaWhatsapp,
} from "react-icons/fa";

const MessengerBtn = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="fixed bottom-20 right-4 z-[999] md:bottom-6 md:right-6">
      {/* Popup Options */}
      <div
        className={`
          absolute bottom-14 right-0
          flex flex-col items-end gap-2
          transition-all duration-300
          ${
            showOptions
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }
        `}
      >
        {/* WhatsApp */}
        <Link
          href="https://www.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-2
          "
        >
          <span
            className="
              rounded-lg bg-white px-3 py-1.5
              text-xs font-medium text-gray-700
              shadow-md
              opacity-0 translate-x-2
              transition-all duration-300
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            WhatsApp
          </span>

          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full bg-[#25D366]
              text-white shadow-md
              transition-all duration-300
              hover:scale-110
            "
          >
            <FaWhatsapp size={19} />
          </span>
        </Link>

        {/* Messenger */}
        <Link
          href="https://www.messenger.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-2
          "
        >
          <span
            className="
              rounded-lg bg-white px-3 py-1.5
              text-xs font-medium text-gray-700
              shadow-md
              opacity-0 translate-x-2
              transition-all duration-300
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            Messenger
          </span>

          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-[#0866FF]
              text-white shadow-md
              transition-all duration-300
              hover:scale-110
            "
          >
            <FaFacebookMessenger size={18} />
          </span>
        </Link>
      </div>

      {/* Main Button */}
      <button
        type="button"
        onClick={toggleOptions}
        aria-label={
          showOptions ? "Close contact options" : "Open contact options"
        }
        className="
          group relative
          flex h-12 w-12
          items-center justify-center
          rounded-full
          bg-primary
          text-white
          shadow-lg shadow-primary/25
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl hover:shadow-primary/30
          active:scale-90
        "
      >
        {/* Pulse */}
        {!showOptions && (
          <span
            className="
              absolute inset-0
              animate-ping
              rounded-full
              bg-primary/30
            "
          />
        )}

        {/* Icon */}
        <span className="relative z-10">
          {showOptions ? (
            <X size={20} strokeWidth={2} />
          ) : (
            <MessageCircle size={20} strokeWidth={2} />
          )}
        </span>
      </button>
    </div>
  );
};

export default MessengerBtn;