import React, { useEffect, useState } from 'react'
import Style from './BrandSlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
import { baseurl } from '../../constansts';
import { useQuery } from '@tanstack/react-query';

export default function BrandSlider() {

  let sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
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
    queryKey: ['recentBrands'],
    queryFn: ()=>axios.get(`${baseurl}/brands`),
    staleTime: 50000
  })
  
  let brands = data?.data?.data;

  return <>
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>Shop your favourite brands</h1>
    </div>
    {!isLoading &&
      <div className='px-8'>
        <div className=''>
          <Slider {...sliderSettings}>
            {brands.map(brand => {
              return <div key={brand?._id}>
                <img className='md:h-56 h-72 w-full object-cover object-center' src={brand?.image} alt={brand?.name} />
                <h3 className='text-center text-xl my-3'>{brand?.name}</h3>
              </div>
            })}
          </Slider>
        </div>
      </div>
    }
  </>
}

