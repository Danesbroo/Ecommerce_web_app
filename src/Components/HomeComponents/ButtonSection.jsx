"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCart from "../ProductCart";
import { toast } from "react-toastify";

export default function ButtonSection() {
  const [activeTab, setActiveTab] = useState("featured"); // we keep featured value as default
  const [products, setProducts] = useState([]);

  // Function to fetch products based on type applying async for query handle.
  const fetchProducts = async (type) => {
    try {
      // Determine filter object
      const filter = {};
      if (type === "featured") filter.is_featured = true;
      else if (type === "newarrival") filter.is_new_arrival = true;
      else if (type === "onsale") filter.is_on_sell = true;

      // api takes time to respond so use async await
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/products/view`,{...filter, limit: 12});

      setProducts(res.data._data || []);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Fetch products whenever activeTab changes
  useEffect(() => {
    fetchProducts(activeTab); // when this function run ? If the activeTab is changed.
  }, [activeTab]);

  return (
    <div className="my-10 mx-5 sm:mx-10">
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          className={`px-10 py-2 border-2 rounded font-bold border-amber-600 ${
            activeTab === "featured" ? "bg-amber-600 text-white" : ""
          }`}
          onClick={() => setActiveTab("featured")} // send name of user select value
        >
          Featured
        </button>

        <button
          className={`px-10 py-2 border-2 rounded font-bold border-amber-600 ${
            activeTab === "newarrival" ? "bg-amber-600 text-white" : ""
          }`}
          onClick={() => setActiveTab("newarrival")} // send name of user select value
        >
          New Arrivals
        </button>

        <button
          className={`px-10 py-2 border-2 rounded font-bold border-amber-600 ${
            activeTab === "onsale" ? "bg-amber-600 text-white" : ""
          }`}
          onClick={() => setActiveTab("onsale")} // send name of user select value
        >
          On Sale
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
        {products.length > 0 ? (
          products.map((product, i) => <ProductCart key={i} product={product} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
