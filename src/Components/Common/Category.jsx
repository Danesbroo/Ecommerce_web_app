
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function SidebarFilter() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ FIX
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);

  /* ================= Fetch Data ================= */
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/nested-category/view`)
      .then((res) => setCategories(res.data._data || []))
      .catch(() => toast.error("Error fetching categories"));
  }, []);

  useEffect(() => {
    axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/material/view`)
      .then((res) => setMaterials(res.data._data || []))
      .catch(() => toast.error("Error fetching materials"));
  }, []);

  useEffect(() => {
    axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/color/view`)
      .then((res) => setColors(res.data._data || []))
      .catch(() => toast.error("Error fetching colors"));
  }, []);

  /* ================= URL Update Helper ================= */
  const updateUrlParam = (key, values) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }

    // Path never breaks now
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  /* ================= Checkbox Toggle ================= */
  const handleToggle = (key, slug) => {
    const params = new URLSearchParams(searchParams.toString());
    let values = params.get(key)?.split(",") || [];

    if (values.includes(slug)) {
      values = values.filter((v) => v !== slug);
    } else {
      values.push(slug);
    }

    updateUrlParam(key, values);
  };

  /* ================= Price ================= */
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    updateUrlParam("max", [value]);
  };

  return (
    <div className="sidebar">
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Categories</h4>
        {categories.map((cat) => (
          <div key={cat._id}>
            <div className="font-semibold">{cat.name}</div>
            {cat.subCategories?.map((sub) => {
              const checked = searchParams
                .get("sub")
                ?.split(",")
                .includes(sub.slug);

              return (
                <label key={sub._id} className="flex items-center gap-2 ml-4 my-2">
                  <input
                    type="checkbox"
                    checked={checked || false}
                    onChange={() => handleToggle("sub", sub.slug)}
                  />
                  {sub.name}
                </label>
              );
            })}
          </div>
        ))}
      </div>

      {/* Materials */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Materials</h4>
        {materials.map((mat) => {
          const checked = searchParams
            .get("material")
            ?.split(",")
            .includes(mat.slug);

          return (
            <label key={mat._id} className="flex items-center gap-2 my-2">
              <input
                type="checkbox"
                checked={checked || false}
                onChange={() => handleToggle("material", mat.slug)}
              />
              {mat.name}
            </label>
          );
        })}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Colors</h4>
        {colors.map((col) => {
          const checked = searchParams
            .get("color")
            ?.split(",")
            .includes(col.slug);

          return (
            <label key={col._id} className="flex items-center gap-2 my-2">
              <input
                type="checkbox"
                checked={checked || false}
                onChange={() => handleToggle("color", col.slug)}
              />
              {col.name}
            </label>
          );
        })}
      </div>

      {/* Price */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Price</h4>
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={handlePriceChange}
        />
        <div>Rs. 0 - Rs. {maxPrice}</div>
      </div>
    </div>
  );
}














