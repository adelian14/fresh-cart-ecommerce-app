import React, { useContext, useEffect, useState } from 'react'
import Style from './CartRow.module.css'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { cartCounterKey } from '../../constansts';
import { UserContext } from '../../Context/UserContext';

export default function CartRow({ product, setCart, setCounter }) {

  let { updateProductInCart, removeProductFromCart } = useContext(CartContext);
  let { userLogin } = useContext(UserContext);
  let [btnLoading, setBtnLoading] = useState(false);

  let updateCartCount = (id, count) => {
    if(btnLoading) return;
    setBtnLoading(true);
    updateProductInCart(id,count).then(response=>{
      toast.success('Product quantity updated successfully');
      setBtnLoading(false);
      setCart(response?.data?.data);
      setCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    }).catch(error=>{
      setBtnLoading(false);
      toast.error('Something went wrong');
    })
  }

  let deleteCartProduct = (id) => {
    if(btnLoading) return;
    setBtnLoading(true);
    removeProductFromCart(id).then(response=>{
      toast.success('Product removed successfully');
      setBtnLoading(false);
      setCart(response?.data?.data);
      setCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    }).catch(error=>{
      setBtnLoading(false);
      toast.error('Something went wrong');
    })
  }


  useEffect(() => {

  }, []);

  return <>
    <tr className=" border-b border-cream-200 last:border-0 hover:bg-cream-50 duration-300">
      <td className="p-4 md:w-36">
        <img src={product?.product?.imageCover} className="w-16 md:w-24 md:h-24 object-cover object-center rounded-2xl border border-cream-200" alt={product?.product?.title}></img>
      </td>
      <td className="px-6 py-4 font-display font-semibold text-forest-800 max-w-80">
        {`${product?.product?.brand?.name} ${product?.product?.title}`}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button onClick={
            ()=>{
              updateCartCount(product?.product?.id,product?.count-1);
            }
          } className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-7 w-7 text-forest-700 bg-cream-50 border border-cream-200 rounded-full focus:outline-none hover:bg-forest-50 hover:border-forest-300 transition-colors" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <div>
            <span className='font-semibold text-forest-800 w-6 text-center inline-block'>{product?.count} </span>
          </div>
          <button onClick={
            ()=>{
              updateCartCount(product?.product?.id,product?.count+1);
            }
          }className="inline-flex items-center justify-center h-7 w-7 p-1 ms-3 text-sm font-medium text-forest-700 bg-cream-50 border border-cream-200 rounded-full focus:outline-none hover:bg-forest-50 hover:border-forest-300 transition-colors" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-display font-semibold text-forest-700">
        {product?.price} EGP
      </td>
      <td className="px-6 py-4">
        <button className="inline-flex items-center gap-1.5 font-semibold text-clay-600 hover:text-clay-700 transition-colors" onClick={
          ()=>{
            deleteCartProduct(product?.product?.id);
          }
        }><i className='fas fa-trash-can'></i> Remove</button>
      </td>
    </tr>
  </>
}
