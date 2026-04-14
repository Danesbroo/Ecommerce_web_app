"use client";
import React, { use, useEffect } from 'react'
import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import axios from 'axios';
import { toast } from 'react-toastify';
export default function ContactUs() {

  const enquiry = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile_number: e.target.mobile_number.value,
      subject: e.target.subject.value,
      message: e.target.message.value
    };
    axios.post("http://localhost:4000/api/website/enquiry/create", formData)
      .then((res) => {
        if(res.data._status === true){
          toast.success("Enquiry Sent Successfully!");
          e.target.reset();
        }else{
          toast.error("something went wrong" );
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong !!!");
      });
  }

  return (
    <>
      <div className='mx-5 sm:mx-8 md:mx-15 lg:mx-20'>
        <div className='text-center font-bold text-3xl mt-16'>Contact Us</div>
        <p className='text-center my-5'>Home <span className='text-[#C09578]'>&gt;</span> <span className='text-[#C09578]'>Contact Us</span></p>
        <div className='h-0.5 bg-[#EBEBEB] flex-1 my-10'></div>
        <div className='w-full'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112488.41424396807!2d83.87421703388011!3d28.22969770618789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1750960687094!5m2!1sen!2snp"
            width="100%"
            height="500px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className='flex flex-wrap justify-between w-full my-15 gap-5'>
          <div className='basis-[100%] sm:basis-[100%] md:basis-[100%] lg:basis-[48%]'>
            <div className='font-bold text-xl my-5'>Contact Us</div>
            <div className='h-0.5 bg-[#EBEBEB] flex-1 my-5'></div>
            <div className='flex items-center gap-2'> <span><FaAddressCard /></span>Address:Claritas est etiam processus dynamicus</div>
            <div className='h-0.5 bg-[#EBEBEB] flex-1 my-5'></div>
            <div className='flex items-center gap-2'><span><FaPhoneAlt /></span>: 98745612330</div>
            <div className='h-0.5 bg-[#EBEBEB] flex-1 my-5'></div>
            <div className='flex items-center gap-2'><span className='pe-2'><CiMail /></span>: furnitureinfo@gmail.com</div>
          </div>
          <form onSubmit={enquiry} className='basis-[100%] sm:basis-[100%] md:basis-[100%] lg:basis-[48%]'>
            <div className='text-xl font-bold my-5'>Tell us your question</div>
            <div className='font-bold'>Your Name (required)</div>
            <div className='w-full'><input type="text" name='name' className='w-full h-8 ps-3' placeholder='Name' required /></div>
            <div className='font-bold mt-5'>Your Email (required)</div>
            <div><input type="email" placeholder='Email' name='email' className='w-full h-8 ps-3' required /></div>
            <div className='font-bold mt-5'>Your Mobile Number (required)</div>
            <div><input type="text" name='mobile_number' placeholder='Mobile No.' className='w-full h-8 ps-3' required /></div>
            <div className='font-bold mt-5'>Subject</div>
            <div><input type="text" name='subject' className='w-full h-8 ps-3' placeholder='subject' required /></div>
            <div className='font-bold mt-5'>Your Message</div>
            <textarea name="message" id="" className='w-full h-40 border rounded my-5 ps-3' placeholder='Message'></textarea>
            <div><button className='px-10 py-3 font-bold text-white bg-black my-3 rounded hover:bg-[#C09578] transition'>Send</button></div>
          </form>
        </div>
      </div>
    </>
  )
}
