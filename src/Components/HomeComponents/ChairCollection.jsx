"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React from 'react';

export default function ChairCollection() {

    return (
        <>
            <div className='w-full mt-2 flex justify-between flex-wrap px-4 sm:px-6 md:px-[8%] lg:px-[10%] gap-x-2 gap-y-5'>                
                {/* Top Rated Chair */}
                <div className='basis-[100%] sm:basis-[100%] md:basis-[48%] lg:basis-[30%] relative chairparent'>
                    <Link href="/products/top-rated">
                        <img
                            className='w-full chair transition-transform duration-500 ease-in-out hover:scale-110'
                            src="/assets/yellochair.webp"
                            alt="Top Rated Chair"
                        />
                    </Link>

                    <div className='absolute top-10 sm:top-8 md:top-6 lg:top-7 left-10 sm:left-7 md:left-5 lg:left-6'>
                        <span>Design Creative</span>
                        <h3 className='font-bold text-2xl sm:text-xl md:text-2xl'>Chair Collection</h3>
                    </div>
                </div>

                {/* Best Selling Chair */}
                <div className='basis-[100%] sm:basis-[100%] md:basis-[48%] lg:basis-[30%] chairparent relative overflow-hidden'>
                    <Link href="/products/best-selling">
                        <img
                            className='w-full chair transition-transform duration-500 ease-in-out hover:scale-110'
                            src="/assets/yellochair.webp"
                            alt="Best Selling Chair"
                        />
                    </Link>

                    <div className='absolute top-10 sm:top-8 md:top-6 lg:top-7 left-10 sm:left-7 md:left-5 lg:left-6'>
                        <span>Bestselling Products</span>
                        <h3 className='font-bold text-2xl sm:text-xl md:text-2xl'>Chair Collection</h3>
                    </div>
                </div>

                {/* On Sale Chair */}
                <div className='basis-[100%] sm:basis-[100%] md:basis-[48%] lg:basis-[30%] relative chairparent'>
                    <Link href="/products/on-sale">
                        <img
                            className='w-full chair transition-transform duration-500 ease-in-out hover:scale-110'
                            src="/assets/yellochair.webp"
                            alt="On Sale Chair"
                        />
                    </Link>

                    <div className='absolute top-10 sm:top-8 md:top-6 lg:top-7 left-10 sm:left-7 md:left-5 lg:left-6'>
                        <span>Special Offer</span>
                        <h3 className='font-bold text-2xl sm:text-xl md:text-2xl'>Chair Collection</h3>
                    </div>
                </div>

            </div>
        </>
    );
}
