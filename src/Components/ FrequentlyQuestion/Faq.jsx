'use client'
import React, { useEffect, useState } from 'react'
import FaqAskQuestion from './FaqAskQuestion'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Faq() {
    let [freq, setFreq] = useState([])
    let [currentIndex, setCurrentIndex] = useState()

    useEffect(() => {
    
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/faq/view`)
            .then((res) => {
                setFreq(res.data._data)
            })
            .catch((err) => {
               toast.error("Something Went Wrong !!!")            
            });
        
    }, []);
    

    const showHide = (index)=>{
            if(currentIndex==index){ // if index id is in state make it blank otherwise set index to state
                setCurrentIndex()
            }else{
                setCurrentIndex(index)
            }
    }

  return (
    <>
        <div className='mx-5 sm:mx-8 md:mx-15 lg:mx-20'>
            <div className='text-center font-bold text-3xl mt-16'>Frequently Questions</div>
            <p className='text-center my-5'>Home <span className='text-[#C09578]'>&gt;</span> <span className='text-[#C09578]'>Frequent Questions</span></p>
            <div className='h-0.5 bg-[#EBEBEB] flex-1 my-10'></div>
        </div>
        <div>
            {
                freq.map((v,i)=>{
                    return(
                        <div className='px-16 my-5' key={i}>
                            <div className='my-4'>
                                <div className='w-full relative'>
                                    <div className='ps-4 py-4 bg-[#F2F2F2] cursor-pointer rounded-[8px] font-bold text-gray-500' onClick={()=>showHide(i)}>{v.question} </div>
                                    <span className='absolute top-2 right-4 text-2xl cursor-pointer text-gray-500' onClick={()=>showHide(i)}>{(currentIndex==i)? '-' : '+'}</span>
                                </div>
                                <div className= {(currentIndex == i)? 'active' :  'hidden'}>
                                    <div className='ps-4 py-5'>{v.answer}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

