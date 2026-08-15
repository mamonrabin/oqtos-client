import Link from "next/link";
import React from "react";

const UserFooter = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-4 px-5 py-5">
        {/* Copyright */}
        <p className="m-0 text-sm text-gray-500">
          © {new Date().getFullYear()} Oqtos. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="policies/terms-conditions"
            className="text-sm font-medium text-gray-500 no-underline transition-colors hover:text-gray-900"
          >
            Terms of Condition
          </Link>

          <Link
            href="/policies/privacy-policy"
            className="text-sm font-medium text-gray-500 no-underline transition-colors hover:text-gray-900"
          >
            Privacy Policy
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-500 no-underline transition-colors hover:text-gray-900"
          >
            Contact Us
          </Link>

          <Link
            href="/policies/return-policy"
            className="text-sm font-medium text-gray-500 no-underline transition-colors hover:text-gray-900"
          >
            Return & Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;