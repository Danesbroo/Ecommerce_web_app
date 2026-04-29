"use client"
import React, { use, useEffect, useState } from 'react'
import { FaRegLaugh } from "react-icons/fa";
import ConsumerSection from '../HomeComponents/ConsumerSection';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function AboutUs() {

    const [whyChooseProducts, setWhyChooseProducts] = useState([]);
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {  
        
        axios.post(process.env.WHY_CHOOSE_US_URL)
            .then((res) => {
                setWhyChooseProducts(res.data._data || []);
                setImagePath(res.data._image_path || '');
            })
            .catch(() => {
                toast.error("Error fetching 'Why Choose Us' data");
            });
               
    }, []);

    return (
        <>
            <div className=' mx-5 sm:mx-5 md:mx-10 lg:mx-15 mt-15'>
                <div className='text-center text-3xl'>About Us</div>
                <p className='mb-5 md:mb-10 text-center'> Home <span className='text-[#C09578]'>&gt;</span><span className='text-[#C09578]'>About Us</span></p>
                <div className='h-0.5 bg-[#EBEBEB] flex-1 my-10 hidden sm:hidden md:hidden lg:block'></div>
                <div>
                    <img src="./assets/About.jpg" alt="" className='w-full' />
                </div>
                <div className='text-center font-bold text-xl my-8'>Welcome to Monsta!</div>
                <p className='text-center py-3'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                <p className='text-[#C09578] text-center py-5'><i>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</i></p>
                <div className='text-center font-bold text-xl my-15'>Why Choose Us?</div>
                <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-10 mb-10 justify-center px-4">
                    {/* Card 1 */}
                    {
                        whyChooseProducts.map((v,i)=>{
                            return (
                            <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] p-6 rounded-lg  flex flex-col items-center text-center">
                                <div className="text-6xl sm:text-7xl md:text-8xl flex justify-center items-center text-indigo-600">
                                    <img src={imagePath+v.image} alt="" />
                                </div>
                                <h6 className="py-6 text-lg md:text-xl font-bold">{v.title}</h6>
                                <p className="text-sm md:text-base text-gray-700">
                                    {v.discription}
                                </p>
                            </div>
                            )
                        })
                    }
                </div>

                {/* <div className="flex flex-wrap gap-6 md:gap-8 lg:gap-10 justify-center px-4">
                    
                    <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] p-4">
                        <div className="m-auto">
                            <img src="./assets/first.jpg" alt="" className="w-full h-auto rounded-lg shadow-md" />
                        </div>
                        <h6 className="text-center py-6 font-bold text-lg md:text-xl">Creative Design</h6>
                        <p className="text-center text-sm md:text-base text-gray-700">
                            Erat metus sodales eget dolor consectetuer, porta ut purus at et alias,
                            nulla ornare velit amet enim
                        </p>
                    </div>

                    
                    <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] p-4">
                        <div className="m-auto">
                            <img src="./assets/second.jpg" alt="" className="w-full h-auto rounded-lg shadow-md" />
                        </div>
                        <h6 className="text-center py-6 font-bold text-lg md:text-xl">Creative Design</h6>
                        <p className="text-center text-sm md:text-base text-gray-700">
                            Erat metus sodales eget dolor consectetuer, porta ut purus at et alias,
                            nulla ornare velit amet enim
                        </p>
                    </div>

                    
                    <div className="w-full sm:w-[80%] md:w-[45%] lg:w-[30%] p-4">
                        <div className="m-auto">
                            <img src="./assets/third.jpg" alt="" className="w-full h-auto rounded-lg shadow-md" />
                        </div>
                        <h6 className="text-center py-6 font-bold text-lg md:text-xl">Creative Design</h6>
                        <p className="text-center text-sm md:text-base text-gray-700">
                            Erat metus sodales eget dolor consectetuer, porta ut purus at et alias,
                            nulla ornare velit amet enim
                        </p>
                    </div>
                </div> */}

                <div className='my-32'>
                    <ConsumerSection />
                </div>
            </div>

        </>
    )
}
