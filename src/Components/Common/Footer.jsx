"use client"
import React, { use, useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa6";
import Link from 'next/link';
import TopRatedFooter from '../TopRatedFooter';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Footer() {
  const [products, setProducts] = useState([])
  const [profile, setProfile] = useState({})
  const [companyInfo, setCompanyInfo] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_PRODUCTS_VIEW_URL,
          {
            is_top_rated: true,
            random: true,
            random_size: 2
          }
        );
        setProducts(res.data._data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    axios
      .post(process.env.NEXT_PUBLIC_COMPANY_INFO_URL)
      .then((res) => {
        if (res.data._status) {
          setCompanyInfo(res.data._data || {});
        } else {
          toast.error(res.data._message || "Error fetching company info");
        }
      })
      .catch((error) => {
        toast.error("Error fetching company info");
      });
  }, []);  
  return (
    <>
      <footer className='foot py-20 px-8 sm:px-15 md:px-24 lg:px-32'>
        <div className='flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap justify-between mx-1 gap-y-5 border-b-gray-300'>
          <div className='min-w-[100%] sm:min-w-[100%] md:min-w-[50%] lg:min-w-[29%]'>
            <div>
              <div className='font-bold text-xl pb-10 text-gray-500'>Contact Us</div>
              <p className='py-2'>Address: {companyInfo?.[0]?.address} </p>
              <p>Phone: <a className='' href="">{companyInfo?.[0]?.mobile_number}</a></p>
              <p className='py-2'>Email: {companyInfo?.[0]?.email}</p>
              <div className='flex gap-2'>
                <a href='https://www.facebook.com/' target='_' className='socialIcon'><TiSocialFacebook /></a>
                <a href='https://www.instagram.com' target='_' className='socialIcon'><CiInstagram /></a>
                <a href='https://www.twitter.com/' target='_' className='socialIcon'><FaXTwitter /></a>
                <a href='https://www.telegram.com/' target='_' className='socialIcon'><FaTelegramPlane /></a>
                <a href='https://www.youtube.com/' target='_' className='socialIcon'><CiYoutube /></a>
                <a href='https://www.linkedin.com/' target='_' className='socialIcon'><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
          <div className='min-w-[50%] sm:min-w-[50%] md:min-w-[50%] lg:min-w-[19%]'>
            <div className='font-bold text-xl pb-10 text-gray-500'>Information</div>
            <p><Link href={'/about-us'}>About Us</Link></p>
            <p className='py-2'><Link href={'/contact-us'}>Contact Us</Link></p>
            <p><Link href={'/faq'}>Frequently Questions</Link></p>
          </div>
          <div className='min-w-[50%] sm:min-w-[50%] md:min-w-[50%] lg:min-w-[19%]'>
            <div className='font-bold text-xl pb-10 text-gray-500'>My Account</div>
            <p><Link href={'/my-dashboard'}>My Dashboard</Link></p>
            <p className='py-2'><a href="/wishlist">Wishlist</a></p>
            <p><a href="/cart">Cart</a></p>
            <p className='pt-2'><Link href={"/checkout"}>Checkout</Link></p>
          </div>
          <div className='min-w-[100%] sm:min-w-[100%] md:min-w-[50%] lg:min-w-[29%]'>
            <div className='font-bold text-xl pb-10 text-gray-500'>Top Rated Products</div>
            <div className='flex flex-col gap-2'>
              {
                products.map((v,i)=>{
                  return(
                    <TopRatedFooter key={i} details ={v}/>
                  )
                })
              }
            </div>

          </div>
        </div>
        <div className='footNav flex my-5 gap-5 gap-sm-3 gap-md-4 gap-lg-6 justify-center '>
          <div className='py-6' ><Link href="/" className=' text-gray-500 font-bold' >Home</Link></div>
          <div className='py-6' ><Link className=' text-gray-500 font-bold' href="/products/online-store">Online Store</Link></div>
          <div className='py-6'><Link className=' text-gray-500 font-bold' href="/privacy-policy">Privacy Policy</Link></div>
          <div className='py-6'><Link className=' text-gray-500 font-bold' href={'/term-of-use'}>Term of Use</Link></div>
        </div>
        <div className='text-center py-3 my'>All Rights Reserved By Furniture | © 2025</div>
        <div className="paymentMode flex justify-center gap-3 mt-5">
          <div className='payment'><RiVisaFill /></div>
          <div className='payment'><FaCcMastercard /></div>
          <div className='payment'><FaCcPaypal /></div>
        </div>
      </footer>
    </>
  )
}
