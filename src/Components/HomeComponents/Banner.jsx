'use client'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios'

export default function Banner() {
  const [items, setItems] = useState([])
  const [imageUrl, setImageUrl] = useState("")


  useEffect(() => {
    axios.post(process.env.SLIDER_VIEW_URL)
      .then((res) => {
        setItems(res.data._data || [])
        setImageUrl(res.data._image_path || "")
      })
      .catch((error) => {
        toast.error("Something went wrong while fetching slider data!");
      });
  }, [])

  const slider = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 800,     // Fade transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,     // Enables fade effect
    cssEase: "ease-in-out", // Smooth easing
  }

  return (
    <div className="relative">
      <Slider ref={slider} {...settings}>
        {
          items.map((items) => {
            return (
              <div>
                <img src={`${imageUrl}${items.image}`} alt="" className="w-full object-cover" />
              </div>
            )
          })
        }
      </Slider>

      {/* Tailwind-styled dots */}
      <style global jsx>{`
        .slick-dots {
          @apply absolute bottom-2 w-full flex justify-center z-10 !important;
        }
        .slick-dots li button:before {
          font-size: 14px !important;
          color: #C09578 !important;
          opacity: 0.5 !important;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  )
}
