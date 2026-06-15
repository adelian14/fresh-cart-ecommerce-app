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
      }} className='product-card flex flex-col overflow-hidden bg-white rounded-4xl border border-cream-200 h-full cursor-pointer'>
        <div className='overflow-hidden relative p-2'>
          <img className={`w-full rounded-3xl ${isRelated ? 'md:h-56 h-80' : 'h-64'} object-cover object-center`} src={product?.imageCover} alt={product?.title} />
          <span className='absolute top-4 left-4 bg-cream-50/90 backdrop-blur text-clay-600 rounded-full text-xs font-bold uppercase tracking-wide px-3 py-1 shadow-soft'>{product?.category?.name}</span>
        </div>
        <div className='px-4 flex flex-col justify-between flex-grow relative'>
          <div className='flex flex-col gap-1 w-full pt-1 pb-1'>
            <h3 className='font-display font-semibold text-base text-forest-800 line-clamp-2 leading-snug'>{product?.brand?.name} {product?.title}</h3>
          </div>
          <div className='flex justify-between flex-wrap items-center w-full py-1 pb-3 relative'>
            <p className='font-display text-lg text-forest-700 font-semibold'>{product?.price} <span className='text-sm text-ink/50 font-sans'>EGP</span></p>
            <p className='inline-flex items-center gap-1 text-clay-500 text-sm font-semibold'><i className='fas fa-star'></i> {product?.ratingsAverage}</p>
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
            }} className={`lg:absolute duration-500 lg:opacity-0 lg:translate-y-4 btn-primary w-[calc(100%-2rem)] mt-2 bottom-3 z-10 ${!userLogin || btnLoading? 'cursor-default bg-opacity-60':''}`}>{btnLoading ? <i className='fas fa-spinner fa-spin'></i> : <><i className='fas fa-basket-shopping'></i> Add to cart</>}</button>}
          </div>
          {userLogin && <div className='overlay absolute bg-white bg-opacity-0 lg:bg-opacity-70 top-0 bottom-0 left-0 right-0 rounded-b-4xl'></div>}
        </div>
      </div>
    </div>
  </>
}
