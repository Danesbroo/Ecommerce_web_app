"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";

import Category from "./Category";
import FilterSection from "./FilterSection";
import CardDisplaySection from "./CardDisplaySection";
import ProductListing from "../ProductListing/ProductListing";

/* ================= FEATURE TITLE MAP ================= */
const FEATURE_MAP = {
  "best-selling": "Best Selling",
  "top-rated": "Top Rated",
  "on-sale": "On Sale",
  "trending-collection": "Trending Collection",
  "online-store": "Online Store",
};

export default function FrameSection() {
  const params = useParams();

/* ================= SAFE SLUG ARRAY ================= */
const slugArray = Array.isArray(params?.slug) ? params.slug : [];

/* ================= DYNAMIC TITLE ================= */
const title = useMemo(() => {
  // 🟡 No slug → default
  if (!slugArray.length) return "Product Listing";

  // 🔹 Always decode first slug
  const decodedSlug = decodeURIComponent(slugArray[0]);

  // 1️⃣ SEARCH PAGE (keyword in pathname)
  if (decodedSlug.startsWith("mode=search")) {
    return "Product Search";
  }

  // 2️⃣ FEATURE PAGE (best-selling, top-rated, etc) what slug in decodedSlug it's value return
  if (FEATURE_MAP[decodedSlug]) {
    return FEATURE_MAP[decodedSlug];
  }

  // 3️⃣ CATEGORY / SUBCATEGORY
  // if URL has more than one slug → subcategory
  if (slugArray.length > 1) {
    return "Product Listing";
  }

  // 4️⃣ CATEGORY ONLY
  return decodedSlug.replace(/-/g, " ");
}, [slugArray]);


  return (
    <>
      <ProductListing title={title} />

      <div className="flex flex-wrap mx-6 justify-between gap-4 mb-5">
        <div className="order-2 lg:order-1 w-full lg:basis-[22%]">
          <Category />
        </div>

        <div className="order-1 lg:order-2 w-full lg:basis-[75%]">
          <FilterSection />
          <CardDisplaySection />
        </div>
      </div>
    </>
  );
}




