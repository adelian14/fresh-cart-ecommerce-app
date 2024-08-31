import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import CartRow from '../CartRow/CartRow';
import Loading from '../Loading/Loading';
import { CartCounterContext } from '../../Context/CartCounterContext';
import { cartCounterKey } from '../../constansts';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';


export default function Cart() {
  let { getLoggedUserCart, clearCart } = useContext(CartContext);
  let { userLogin } = useContext(UserContext);
  let {cartCounter,setCartCounter} = useContext(CartCounterContext);
  let [cartDetails,setCartDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(0);
  let [btnLoading, setBtnLoading] = useState(false);

  function getCart(){
    setIsLoading(true);
    getLoggedUserCart()
    .then((response)=>{
      setIsLoading(false);
      setCartDetails(response?.data?.data);
      setCartCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    })
    .catch(error=>{
      setIsLoading(false);
    });  
  }

  let clearUserCart = () => {
    if(btnLoading) return;
    setBtnLoading(true);
    clearCart().then(response=>{
      toast.success('Cart cleared');
      setBtnLoading(false);
      setCartDetails(response?.data?.data);
      setCartCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    }).catch(error=>{
      setBtnLoading(false);
      toast.error('Something went wrong');
      console.log(error);
    })
  }

  useEffect(()=>{
    getCart();
  },[])

  return <>
    <div className='row'>
      <h1 className='text-3xl text-center text-green-600 font-semibold w-full mb-3'>Shopping cart{!cartCounter ? ' is empty' : ''}</h1>
      {isLoading && <Loading/>}
      {cartCounter > 0 && cartDetails && <h3 className='text-2xl text-center text-gray-600 font-medium w-full mb-1'>Total price: {cartDetails?.totalCartPrice} EGP</h3>}
      {cartCounter > 0 && cartDetails && <h3 className='text-2xl text-center text-gray-600 w-full mb-3'>Total items: {cartCounter}</h3>}
      {cartCounter > 0 && cartDetails &&
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-500 bg-gray-100">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-16 py-3">

                </th>
                <th scope="col" className="px-6 py-3 max-w-64">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-gray-100'>
            {
              cartDetails?.products?.map((product)=><CartRow key={product?.product?.id} product={product} setCart={setCartDetails} setCounter={setCartCounter}/>)
            }
            </tbody>
          </table>
        </div>
        <div className='w-full px-5 flex justify-between'>
          <div className='md:w-1/3 lg:w-1/6 w-1/2 px-2'>
            <button onClick={clearUserCart} className={`btn w-full bg-red-600 my-4 shadow-lg z-10 ${btnLoading? 'cursor-default bg-opacity-50':''}`}>Clear Cart</button>
          </div>
          <div className='md:w-1/3 lg:w-1/6 w-1/2 px-2'>
            <Link to={`/checkout/${cartDetails?._id}`}>
              <button className={`btn w-full bg-green-600 my-4 shadow-lg z-10`}>Check Out</button>
            </Link>
          </div>
        </div>
        </>
      }
    </div>
  </>
}
