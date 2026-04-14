import React from "react";

export default function NoProductFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      {/* Icon */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-3xl shadow-md mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M9.88 9.88a3 3 0 014.24 4.24"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-base mb-6 max-w-md">
        Sorry, we couldn't find any products matching your search or filters.  
        Try removing filters, using a different keyword, or browsing popular items.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-[#C09578] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#a47c5e] transition-all shadow-sm"
        >
          Try Again
        </button>
        <a
          href="/"
          className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
