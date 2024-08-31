import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import mainSliderImg from '../../assets/images/slider-image-3.jpeg';
import img1 from '../../assets/images/slider-image-1.jpeg';
import img2 from '../../assets/images/slider-image-2.jpeg';

export default function MainSlider() {
  useEffect(() => {

  }, []);

  let sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return <>
    {/* <div className="row">
      <h1 className='text-3xl font-semibold w-full'>All your shopping needs in one place</h1>
    </div> */}
    <div className='px-8 py-10'>
      <div className='flex'>
        <div className='w-2/3'>
          <Slider {...sliderSettings}>
            <img src={mainSliderImg} alt="" className='w-full h-[520px] object-cover object-center' />
            <img src={img1} alt="" className='w-full h-[520px] object-cover object-center' />
            <img src={img2} alt="" className='w-full h-[520px] object-cover object-center' />
          </Slider>
        </div>
        <div className='w-1/3'>
          <img src={img1} alt="" className='w-full h-[260px] object-cover' />
          <img src={img2} alt="" className='w-full h-[260px] object-cover' />
        </div>
      </div>
    </div>
  </>
}
