import React, { useEffect, useState } from 'react'
import Style from './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
import { baseurl } from '../../constansts';
import { useQuery } from '@tanstack/react-query';

export default function CategorySlider() {

  let sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  let {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey: ['recentCategories'],
    queryFn: ()=>axios.get(`${baseurl}/categories`),
    staleTime: 50000
  })
  
  let categories = data?.data?.data;

  return <>
    <div className="px-4 md:px-8 pt-12 pb-4 flex items-end justify-between flex-wrap gap-3">
      <div>
        <span className='eyebrow'>Shop by aisle</span>
        <h1 className='section-title mt-2'>Explore our categories</h1>
      </div>
    </div>
    {!isLoading &&
      <div className='px-4 md:px-8 pb-4'>
        <div className=''>
          <Slider {...sliderSettings}>
            {categories.map(cat => {
              return <div key={cat?._id} className='px-2'>
                <div className='group relative rounded-4xl overflow-hidden shadow-soft border border-cream-200 cursor-pointer'>
                  <img className='md:h-72 h-96 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105' src={cat?.image} alt={cat?.name} />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/85 to-transparent pt-12 pb-4 px-4'>
                    <h3 className='text-center text-cream-50 text-xl font-display font-semibold'>{cat?.name}</h3>
                  </div>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </div>
    }
  </>
}
