"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OPTIONS = [
  { label: "Default", value: "" },
  { label: "Featured", value: "1" },
  { label: "Best Selling", value: "2" },
  { label: "Top Rated", value: "3" },
  { label: "Trending", value: "4" },
  { label: "Online Store", value: "5" },
  { label: "New Arrival", value: "6" },
  { label: "Name: A to Z", value: "7" },
  { label: "Name: Z to A", value: "8" },
  { label: "Price: Low to High", value: "9" },
  { label: "Price: High to Low", value: "10" },
];

export default function FilterSection() {
  const router = useRouter();
  const pathname = usePathname();        // ✅ FIX
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "");

  // Sync state when URL changes (back / forward)
  useEffect(() => {
    setSortBy(searchParams.get("sort_by") || "");
  }, [searchParams]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    // Preserve existing params (color, material, sub, price...)
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort_by", value); // add sort_by key and it's value other wise delete sort_by key
    } else {
      params.delete("sort_by");
    }

    //  PATH NEVER BREAKS and replace old and keep new url
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-4 flex justify-end">
      <div className="flex items-center gap-2 border border-blue-50 rounded px-4 py-3">
        <label className="font-medium text-sm">Sort By:</label>
        <select
          className="border border-blue-100 rounded px-2 py-1 text-sm"
          value={sortBy}
          onChange={handleChange}
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}






















