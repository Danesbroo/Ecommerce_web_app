
import Link from "next/link";
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800 px-4 relative">
      {/* Big 404 Number */}
      <h1 className="text-7xl font-extrabold tracking-widest mb-6">
        404
      </h1>

      {/* Message */}
      <p className="text-2xl md:text-3xl font-bold mb-2 text-center">
        Oops! Page Not Found
      </p>
      <p className="mb-8 text-center max-w-md text-gray-600">
        The page you are looking for does not exist or has been moved. Let’s get you back home.
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="px-8 py-3 bg-white text-blue-500 font-bold rounded-lg shadow hover:bg-blue-50 transition-all duration-300"
      >
        Go Home
      </Link>

      {/* Light animated shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-pink-200/20 rounded-full animate-pulse"></div>
    </div>
  );
}
