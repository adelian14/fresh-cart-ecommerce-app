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
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>Recent Products</h1>
      {isLoading ? <Loading /> : products.map(product => <SingleProductCol related={data?.data?.data.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />)}
    </div>
  </>
}
