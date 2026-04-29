"use client";
import React, { useEffect, useState } from "react";
import BestSelling from "../BestSelling/BestSelling";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/ReduxToolkit/cart";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState("");
  const [upsellProduct, setUpsellProduct] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const imageUrl = process.env.PRODUCT_URL

  useEffect(() => {
    // if we get slug in url return it's details page
    if (!params?.slug) return;

    const fetchDetails = async () => {
      try {
        const res = await axios.post(
          `${process.env.UPDATE_PROFILE_URL}/${params.slug}`
        );

        if (res.data._status) {
          setProductDetails(res.data._data);
        } else {
          toast.error(res.data._message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    fetchDetails();
  }, [params]);
  useEffect(()=>{
      axios.post(process.env.PRODUCTS_VIEW_URL,{is_up_sell: true})
      .then((res)=>{
        setUpsellProduct(res.data._data)
      })
      .catch((error)=>{
        toast.error("something Went Wrong !!!")
      })
  },[])
  if (!productDetails) { // if there is no available productdetails show empty space
    return (
      <div className="text-center mt-20 text-lg">Loading product details...</div>
    );
  }
  return (
    <>
      <div className="mx-5 sm:mx-8 md:mx-12 lg:mx-20">
        <div className="text-center font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl mt-10">
          {productDetails.name}
        </div>
        <p className="text-center">
          Home <span className="text-[#C09578]">&gt; </span>{" "}
          {productDetails.sub_category_ids?.[0]?.name || "Category"}{" "}
          <span className="text-[#C09578]">&gt;</span>
          <span className="text-[#C09578] ms-1">{productDetails.name}</span>
        </p>
        <div className="h-0.5 bg-[#EBEBEB] mt-10 mb-5"></div>

        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4">
          {/* Left Image Section */}
          <div className="basis-[48%]">
            <div className="h-[400px]">
              <img src={ imageUrl+productDetails.image} alt="" className="w-full h-full" />
            </div>
            <div className="px-10 my-6 flex justify-between items-center ">
              <div className="basis-[23%]">
                <img src={ imageUrl+productDetails.image}  alt="" />
              </div>
              <div className="basis-[23%]">
                <img src={ imageUrl+productDetails.image}  alt="" />
              </div>
              <div className="basis-[23%]">
                <img src={ imageUrl+productDetails.image}  alt="" />
              </div>
              <div className="basis-[23%]">
                <img src={ imageUrl+productDetails.image}  alt="" />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="basis-[51%]">
            <div className="text-2xl font-bold">{productDetails.name}</div>
            <div className="flex gap-3 py-3 items-center">
              <span className="text-[#C3C3C3] line-through">
                Rs.{productDetails.actual_price}
              </span>
              <span className="text-[16px] text-[#BF9578]">
                Rs.{productDetails.sale_price}
              </span>
            </div>
            <p className="mb-6">{productDetails.short_description}</p>
            <div className="h-0.5 bg-[#EBEBEB] w-full"></div>
            <button onClick={()=> dispatch(addToCart(productDetails))}
              className="px-6 py-2 rounded bg-[#C09578] mt-5 mb-3 text-white text-xl cursor-pointer">
              Add To Cart
            </button>
            <p className="my-3">Code: {productDetails.product_code}</p>
            <p className="my-3">Dimension: {productDetails.product_dimension}</p>
            <p className="my-3">
              Estimate Delivery Days: {productDetails.estimate_delevery_days} days
            </p>
            <p className="my-3">Category: 2 Seater Sofa</p>
            <p className="my-3">
              Color: {productDetails.color_ids?.[0]?.name || "N/A"}
            </p>
            <p className="my-3">
              Material: {productDetails.material_ids?.[0]?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="font-bold text-2xl text-[#C09578] mt-5">Description</div>
        <div className="h-0.5 bg-[#EBEBEB] mt-3 mb-5"></div>
        <p>{productDetails.long_description?.replace(/<[^>]*>/g, "")}</p>
      </div>

      {/* Dynamic Section Title */}
      <div className="mt-32">
      <BestSelling
          title="Related Products"
          categoryId={productDetails?.sub_category_ids?.[0]?._id}
        />
      </div>
      {/* Static Section Title */}
      <div className="mt-32">
      <BestSelling
          title="Upsell Products"
          product={upsellProduct}
        />
      </div>
    </>
  );
}
