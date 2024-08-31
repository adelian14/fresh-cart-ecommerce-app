import React, { useEffect, useState } from 'react'
import Style from './Products.module.css'
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import SingleProductCol from '../SingleProductCol/SingleProductCol';
import axios from 'axios';
import { baseurl } from '../../constansts';

export default function Products() {

  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: () => axios.get(`${baseurl}/products`),
    staleTime: 50000
  })
  
  let products = data?.data?.data;

  return <>
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>All Products</h1>
      {isLoading ? <Loading /> : products?.map(product => <SingleProductCol related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />)}
    </div>
  </>
}
