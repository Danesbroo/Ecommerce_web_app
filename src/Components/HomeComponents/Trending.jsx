
import Link from "next/link";
import React from "react";

export default function Trending() {
  return (
    <div className="relative">
      <div className="bannerContainer"></div>

      <div className="absolute top-[30%] left-10 sm:left-16 md:left-24 btnparent">
        <h1 className="font-bold text-[20px] sm:text-[32px] md:text-[40px] lg:text-4xl">
          New Trending Collection
        </h1>
        <p className="py-3">
          We Believe That Good Design is Always in Season
        </p>

        <Link
          href="/products/trending-collection"
          className="px-4 py-2 font-bold rounded mt-10 btnborder text-[#C09578] hover:bg-[#C09578] hover:!text-white"
        >
          SHOPPING NOW
        </Link>
      </div>
    </div>
  );
}
