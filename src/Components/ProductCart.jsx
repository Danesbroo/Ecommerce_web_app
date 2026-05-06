import { addToCart } from '@/app/ReduxToolkit/cart';
import { addToWish } from '@/app/ReduxToolkit/wishlistslice';
import Link from 'next/link';
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';


export default function ProductCart({ product }) {
    const dispatch = useDispatch();
    const imageUrl = process.env.NEXT_PUBLIC_PRODUCT_URL
    return (
        <>
            <div className="w-full mt-2 mb-2 pb-3">
                <div
                    className="productCard bg-white shadow-md rounded-lg overflow-hidden m-auto flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    {/* Product Image */}
                    <div className="w-full h-[260px] sm:h-[260px] md:h-[260px] lg:h-[260px] overflow-hidden flex justify-center items-center">
                        <Link href={`/product-details/${product._id}`}>
                            <img href="/product-details" src={product?.image
                                ? `${imageUrl}${product.image}`
                                : "/no-image.png"
                            } alt="product" className=" w-full h-full object-fit rounded-t-md transition-transform duration-300 hover:scale-105" />
                        </Link>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                            <p className="text-center py-1 cursor-pointer text-sm sm:text-base">
                                {product?.sub_category_ids?.[0]?.name || ""}

                            </p>
                            <div className="text-center">
                                <Link
                                    href={`/product-details/${product._id}`}
                                    className="font-bold mb-3 hover:text-[#C09578] cursor-pointer text-[15px] sm:text-[16px]"
                                >
                                    {product?.name}
                                </Link>
                            </div>

                            <div className="w-[80%] h-[1px] bg-gray-200 m-auto my-2"></div>

                            <div className="flex justify-center gap-2 items-center mb-3">
                                <span className="line-through text-gray-500 text-sm sm:text-base">
                                    Rs. {product?.actual_price}
                                </span>
                                <span className="font-bold text-[#C09578] text-sm sm:text-base">
                                    Rs. {product?.sale_price}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4 items-center pt-1 pb-2 relative z-50 overflow-visible">
                            {/* Wishlist */}
                            <div className="relative group">
                                <div onClick={() => dispatch(addToWish(product))}
                                    className="bg-gray-200 p-1 rounded-md hover:bg-[#C09578] cursor-pointer flex justify-center items-center">
                                    <FaRegHeart className="text-xl sm:text-2xl text-gray-700 group-hover:text-white" />
                                </div>
                                <span
                                    className="w-[130px] p-1 shadow-md rounded absolute left-1/2 top-[30px] mt-2 -translate-x-1/2 bg-white text-gray-600 text-[12px] font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Add To Wishlist
                                </span>
                            </div>

                            {/* Add To Cart */}
                            <div className="relative group">
                                <div onClick={() => dispatch(addToCart(product))}
                                    className=" bg-gray-200 py-1 px-3 rounded-md hover:bg-[#C09578] duration-300 cursor-pointer text-[13px] sm:text-[14px] font-semibold flex justify-center items-center">
                                    Add To Cart
                                </div>
                                <span
                                    className="w-[110px] p-1 shadow-md rounded absolute top-[30px] mt-1 left-[-50px] translate-x-1/2 bg-gray-100 text-gray-600 text-[12px] font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-1">
                                    Add To Cart
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
