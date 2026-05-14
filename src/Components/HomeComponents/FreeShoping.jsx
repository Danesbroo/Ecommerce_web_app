import React from 'react'

export default function FreeShoping() {
  return (
    <>
      <div className='w-[100%] flex px-8 md:px-40 py-10 bg-[#F8F9F9] flex-wrap items-center justify-between gap-5'>
            <div className='flex flex-col justify-between items-center basis-[100%] sm:basis-[100%] md:basis-[30%] lg:basis-[30%]'>
                <div className='w-20 h-20 rounded-full border-[2px] flex justify-center items-center'>
                    <img src="#" alt="N/A" />
                </div>
                <div className='text-center py-5 font-bold'>Free Shipping</div>
                <div className='text-center'>Free shipping on all order</div>
            </div>
            <div className='flex flex-col justify-between items-center basis-[100%] sm:basis-[100%] md:basis-[30%] lg:basis-[30%]'>
                <div className='w-20 h-20 rounded-full border-[2px] flex justify-center items-center'>
                    <img src="#" alt="N/A" />
                </div>
                <div className='text-center py-5 font-bold'>Money Return</div>
                <div className='text-center'>Back guarantee under 7 days</div>
            </div>
            <div className='flex flex-col justify-between items-center basis-[100%] sm:basis-[100%] md:basis-[30%] lg:basis-[30%]'>
                <div className='w-20 h-20 rounded-full border-[2px] flex justify-center items-center'>
                    <img src="#" alt="N/A" />
                </div>
                <div className='text-center py-5 font-bold'>Online Support</div>
                <div className='text-center'>Support online 24 hours a day</div>
            </div>
      </div>
    </>
  )
}
