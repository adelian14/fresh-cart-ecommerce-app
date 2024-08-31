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
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>Product Categories</h1>
    </div>
    {!isLoading &&
      <div className='px-8'>
        <div className=''>
          <Slider {...sliderSettings}>
            {categories.map(cat => {
              return <div key={cat?._id}>
                <img className='md:h-72 h-96 w-full object-cover object-center' src={cat?.image} alt={cat?.name} />
                <h3 className='text-center text-xl my-3'>{cat?.name}</h3>
              </div>
            })}
          </Slider>
        </div>
      </div>
    }
  </>
}
