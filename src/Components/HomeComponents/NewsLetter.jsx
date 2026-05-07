"use client";
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function NewsLetter() {

  const formHandler = (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value
    };

    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/newsletter/view`, formData)
      .then((res) => {
        if(res.data._status === true){
          toast.success("Subscribed Successfully!");
          event.target.reset();
        }else{
          toast.error(res.data._message);
        }
        
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <form onSubmit={formHandler} className='w-[100%] px-3 py-16 bg-[#F8F9F9]'>
        <div className='text-center font-bold text-2xl py-3'>Our Newsletter</div>
        <div className='text-center'>Get E-mail updates about our latest shop and special offers.</div>

        <div className='flex flex-wrap justify-center my-10 gap-1'>
          <input
            className='py-2 bg-white pl-2 basis-[15%]'
            type="text"
            name='name'
            placeholder='Enter your name...'
            required
          />

          <input
            className='py-2 bg-white pl-2 basis-[25%]'
            type="text"
            name='email'
            placeholder='Enter your Email...' 
            required
          />

          <button
            type='submit'
            className='py-1.5 gap-y-4 px-10 bg-[#C09578] text-white font-bold hover:bg-black'
          >
            Subscribe
          </button>
        </div>
      </form>
    </>
  );
}
