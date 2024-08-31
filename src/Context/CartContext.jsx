import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { baseurl, userTokenKey } from '../constansts';
import { UserContext } from './UserContext';
export let CartContext = createContext(0);

export default function CartContextProvider(props) {

    let { userLogin } = useContext(UserContext);

    let headers = {
        token: userLogin
    }



    let getLoggedUserCart = () => axios.get(`${baseurl}/cart` , {headers});
    let addProductToCart = (productId) => axios.post(`${baseurl}/cart`, {productId} , {headers});
    let updateProductInCart = (productId, count) => axios.put(`${baseurl}/cart/${productId}`, {count} , {headers});
    let removeProductFromCart = (productId) => axios.delete(`${baseurl}/cart/${productId}` , {headers});
    let clearCart = () => axios.delete(`${baseurl}/cart` , {headers});
    let checkOut = (cartId, url, shippingAddress) => axios.post(`${baseurl}/orders/checkout-session/${cartId}?url=${url}`, {shippingAddress}, {headers});

    return <CartContext.Provider value={{
        addProductToCart,
        updateProductInCart,
        getLoggedUserCart,
        removeProductFromCart,
        clearCart,
        checkOut
    }}>
        {props.children}
    </CartContext.Provider>
}
