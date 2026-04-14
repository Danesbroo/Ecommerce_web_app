'use client'
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import Slider from 'react-slick';
import { FaLessThan } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ConsumerSection() {
    const [testimonal, setTestimonial] = useState([])
    const [imagePath, setImagePath] = useState("")
    useEffect(() => {
        axios.post("http://localhost:4000/api/website/testimonial/view")
            .then((res) => {
                setTestimonial(res.data._data);
                setImagePath(res.data._image_path);
            })
            .catch((err) => {
                toast.error("Something went wrong in testimonial section");
            })
    }, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <div className='flex w-[100%]'>
                <div className="w-[100%]">
                    <h2 className='text-center text-2xl font-bold my-3'>What Our Custumers Say ?</h2>
                    <div>
                        <Slider {...settings} id="testimonial" >
                            {
                                testimonal.map((item, i) => {
                                    return (
                                        <div>
                                            <p key={i} className='text-center my-3 px-[5%] sm:px-[10%] md:px-[15%] lg:px-[220px]'>{item.message}</p>
                                            <div>
                                                <div className='flex justify-center items-center '>
                                                    <div className='my-5 w-[140] h-[140] rounded-full overflow-hidden'>
                                                        <img className='object-fill' src={imagePath+item.image} alt="" />
                                                    </div>
                                                </div>
                                                <h4 className='text-center font-bold text-2xl'>{item.name}</h4>
                                                <p className='text-center py-4'>{item.designation}</p>
                                                <div className='flex justify-center'>
                                                    <div className='text-center star flex justify-center gap-2'><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                                </div>
                                            </div>
                                     </div>
                                 )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>

        </>
    )
}
