import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
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
    <section className='px-4 md:px-8 py-8'>
      <div className='grid lg:grid-cols-2 gap-8 items-stretch'>
        {/* Copy panel */}
        <div className='card bg-forest-700 border-forest-700 text-cream-50 rounded-4xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden'>
          <div className='absolute -right-10 -top-10 w-48 h-48 rounded-full bg-forest-600/50'></div>
          <div className='absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-clay-500/20'></div>
          <div className='relative'>
            <span className='eyebrow text-clay-200 before:bg-clay-300'>Harvested with care</span>
            <h1 className='font-display text-4xl md:text-5xl xl:text-6xl font-semibold leading-[1.05] mt-4'>
              Real food,<br />from real <span className='text-clay-300 italic'>farms</span>.
            </h1>
            <p className='text-cream-100/80 text-lg mt-5 max-w-md'>
              Seasonal produce, pantry staples and local favourites — picked fresh and brought right to your kitchen.
            </p>
            <div className='flex flex-wrap gap-3 mt-8'>
              <Link to='products' className='btn-clay text-base'>Shop the harvest <i className='fas fa-arrow-right'></i></Link>
              <Link to='categories' className='btn bg-cream-50/10 hover:bg-cream-50/20 text-base'>Browse categories</Link>
            </div>
            <div className='flex gap-8 mt-10 pt-6 border-t border-cream-50/15'>
              <div><p className='font-display text-2xl font-semibold'>100%</p><p className='text-cream-100/60 text-sm'>Farm fresh</p></div>
              <div><p className='font-display text-2xl font-semibold'>24h</p><p className='text-cream-100/60 text-sm'>Delivery</p></div>
              <div><p className='font-display text-2xl font-semibold'>5k+</p><p className='text-cream-100/60 text-sm'>Happy homes</p></div>
            </div>
          </div>
        </div>

        {/* Image collage */}
        <div className='grid grid-rows-2 gap-4'>
          <div className='rounded-4xl overflow-hidden shadow-soft'>
            <Slider {...sliderSettings}>
              <img src={mainSliderImg} alt="" className='w-full h-[260px] lg:h-[300px] object-cover object-center' />
              <img src={img1} alt="" className='w-full h-[260px] lg:h-[300px] object-cover object-center' />
              <img src={img2} alt="" className='w-full h-[260px] lg:h-[300px] object-cover object-center' />
            </Slider>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <img src={img1} alt="" className='w-full h-full max-h-[260px] object-cover rounded-4xl shadow-soft' />
            <img src={img2} alt="" className='w-full h-full max-h-[260px] object-cover rounded-4xl shadow-soft' />
          </div>
        </div>
      </div>
    </section>
  </>
}
