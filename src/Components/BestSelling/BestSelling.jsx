"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCart from "../ProductCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function BestSelling({ title, categoryId, product }) {
  const [items, setItems] = useState([]);
  const slider = useRef(null);
  // Load data whenever categoryId or product prop changes
  useEffect(() => {
    const loadData = async () => {
      try {
        // CASE 1: If product prop is provided → Upsell Products
        if(title =="Upsell Products"){
          setItems(product)
        } else{
          const res = await axios.post(
            "http://localhost:4000/api/website/products/view",
            { is_best_selling: true }
          );
          setItems(res.data._data || []);
        }
        if (product && product.length > 0) {
          setItems(product);
          return;
        } 
        // CASE 2: If categoryId is provided → Related Products
        if (categoryId) {
          const res = await axios.post(
            "http://localhost:4000/api/website/products/view",
            { sub_category_ids: categoryId }
          );
          setItems(res.data._data || []);
          return;
        }

      } catch (error) {
        toast.error(error?.response?.data?._message || "Something went wrong!");
      }
    };

    loadData();
  }, [categoryId, product]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1420, settings: { slidesToShow: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 990, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  // Only render slider if items exist
  if (!items || items.length === 0) return null;

  return (
    <div className="my-10 px-2 sm:px-4 md:px-8 lg:px-12">
      {/* Title + Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-[20px] sm:text-[22px] md:text-xl text-gray-700">
          {title}
        </div>
        <div className="h-0.5 bg-[#EBEBEB] flex-1 mx-4"></div>

        <div className="flex gap-3">
          <button
            onClick={() => slider.current?.slickPrev()}
            className="text-[22px] text-gray-400 hover:text-[#C09578]"
          >
            &lt;
          </button>
          <button
            onClick={() => slider.current?.slickNext()}
            className="text-[22px] text-gray-400 hover:text-[#C09578]"
          >
            &gt;
          </button>
        </div>
      </div>
      
      {/* Slider */}
      <div className="mx-auto">
        <Slider ref={slider} {...settings}>
          {items.map((item, index) => (
            <div key={index} className="px-2 sm:px-3 md:px-4">
              <ProductCart product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
