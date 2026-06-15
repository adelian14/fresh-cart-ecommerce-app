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
    <div className='px-4 md:px-8 pt-4 pb-2'>
      <span className='eyebrow'>The full pantry</span>
      <h1 className='section-title mt-2'>All products</h1>
      <p className='text-ink/50 mt-2'>Everything we stock, from garden to grocery — all in one place.</p>
    </div>
    <div className="row pt-2">
      {isLoading ? <Loading /> : products?.map(product => <SingleProductCol related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />)}
    </div>
  </>
}
