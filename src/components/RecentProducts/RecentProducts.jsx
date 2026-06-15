import React, { useEffect, useState } from 'react'
import Style from './RecentProducts.module.css'
import axios from 'axios';
import { baseurl } from '../../constansts';
import Loading from '../Loading/Loading';
import SingleProductCol from '../SingleProductCol/SingleProductCol';
import { useQuery } from '@tanstack/react-query';

export default function RecentProducts() {

  function getRecentProducts(arr) {
    if (!arr) return [];
    arr = JSON.parse(JSON.stringify(arr));
    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = i+1; j < arr.length; j++) {
    //     if(Math.trunc(Math.random()*1000)%2){
    //       let temp = arr[i];
    //       arr[i]=arr[j];
    //       arr[j]=temp;
    //     }
    //   }
    // }
    let cats = [];
    let products = [];
    arr.forEach(p => {
      if (!cats.includes(p?.category?.name)) cats.push(p?.category?.name);
    });
    cats.forEach(cat => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.category?.name == cat) {
          products.push(arr[i]);
          break;
        }
      }
    });
    for (let i = 0; i < arr.length; i++) {
      if (products.find(p => p == arr[i])) continue;
      if(products.length >= 12) break;
      if (i % 4 == 3) products.push(arr[i]);
    }
    return products;
  }

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: () => axios.get(`${baseurl}/products`),
    staleTime: 50000
  })

  let products = getRecentProducts(data?.data?.data);


  return <>
    <div className='px-4 md:px-8 pt-12 pb-2 flex items-end justify-between flex-wrap gap-3'>
      <div>
        <span className='eyebrow'>Just in</span>
        <h1 className='section-title mt-2'>Fresh off the shelf</h1>
      </div>
      <p className='text-ink/50 max-w-sm'>A handpicked taste of what's new across our aisles this week.</p>
    </div>
    <div className="row pt-2">
      {isLoading ? <Loading /> : products.map(product => <SingleProductCol related={data?.data?.data.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />)}
    </div>
  </>
}
