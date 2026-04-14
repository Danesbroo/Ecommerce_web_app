import React from 'react'
import Category from '../Common/Category'
import FilterSection from '../Common/FilterSection'

export default function ProductListing({title}) {
  return (
    <>
      {/* Heading section  */}
      <div className='mx-5 sm:mx-8 md:mx-15 lg:mx-20'>
        <div className='text-center font-bold text-3xl mt-16'>{title}</div>
        <p className='text-center my-5'>Home <span className='text-[#C09578]'>&gt;</span> <span className='text-[#C09578]'>{title}</span></p>
        <div className='h-0.5 bg-[#EBEBEB] flex-1 my-10'></div>
      </div>
    </>
  )
}
