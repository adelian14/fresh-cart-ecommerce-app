import React, { useContext, useEffect, useState } from 'react'
import Style from './SingleProductCol.module.css'
import { UserContext } from '../../Context/UserContext';
import { json, useNavigate } from 'react-router-dom';
import { RelatedProductContext } from '../../Context/RelatedProductContext';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CartCounterContext } from '../../Context/CartCounterContext';
import { cartCounterKey } from '../../constansts';

export default function SingleProductCol({ isRelated, product, related, layout }) {

  let { addProductToCart } = useContext(CartContext);
  let {setCartCounter} = useContext(CartCounterContext);

  useEffect(() => {

  }, []);

  let { userLogin } = useContext(UserContext);
  let { setRelatedProducts } = useContext(RelatedProductContext);
  let navigate = useNavigate();
  let [btnLoading,setBtnLoading] = useState(false);

  return <>
    <div key={product?.id} className={`single-product ${layout=='brands/cats'?'lg:w-1/3 xl:w-1/5 md:w-1/2 w-full':isRelated ? 'xl:w-1/4 lg:w-1/3 md:w-1/2 w-full' : 'lg:w-1/4 xl:w-1/6 md:w-1/3 w-1/2'} p-2`}>
      <div onClick={() => {
        setRelatedProducts(related.map(p => p));
        navigate(`/productdetails/${product?.id}`);
      }} className='flex flex-col overflow-hidden border-2 border-gray-200 rounded-lg h-full cursor-pointer'>
        <img className={`w-full ${isRelated ? 'md:h-60 h-96' : 'h-72'} object-cover object-center`} src={product?.imageCover} alt={product?.title} />
        <div className='px-2 flex flex-col justify-between flex-grow bg-gray-100 relative'>
          <div className='flex flex-col gap-1 w-full py-1'>
            <p className='text-green-600'>{product?.category?.name}</p>
            <h3 className='font-semibold line-clamp-2'>{product?.brand?.name} {product?.title}</h3>
          </div>
          <div className='flex justify-between flex-wrap items-center w-full py-1 pb-2 relative'>
            <p className=''>{product?.price} EGP</p>
            <p className=''>{product?.ratingsAverage} <i className='fas fa-star text-yellow-600'></i></p>
            {userLogin && <button onClick={(e) => {
              e.stopPropagation();
              if(btnLoading) return;
              setBtnLoading(true);
              addProductToCart(product?.id)
              .then(response=>{
                toast.success('Product added successfully');
                setBtnLoading(false);
                setCartCounter(response?.data?.numOfCartItems);
                localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
              })
              .catch(error=>{
                setBtnLoading(false);
                toast.error('Something went wrong');
              });
            }} className={`lg:absolute duration-500 lg:opacity-0 lg:translate-y-full btn w-full bg-green-700 mt-2 bottom-2 shadow-lg z-10 ${!userLogin || btnLoading? 'cursor-default bg-opacity-50':''}`}>Add to cart</button>}
          </div>
          {userLogin && <div className='overlay absolute bg-gray-100 bg-opacity-0 lg:bg-opacity-50 top-0 bottom-0 left-0 right-0'></div>}
        </div>
      </div>
    </div>
  </>
}
