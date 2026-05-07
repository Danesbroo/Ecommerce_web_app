"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function TopRatedFooter({details}) { 
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products`
    return (
        <>
            <div className='flex gap-3 pb-4'>
                <div>
                    <Link href={`/product-details/${details._id}`}><img src={imageUrl+details.image} style={{ width: 100, height: 80 }} alt="" /></Link>
                </div>
                <div>
                    <div>{details.parent_category_ids?.[0]?.name}</div>
                    <Link href={`/product-details/${details._id}`}>{details.name}</Link>
                    <p><span className='line-through'>Rs. {details.actual_price}</span> <span>Rs. {details.sale_price}</span></p>
                </div>
            </div>
        </>
    )
}
