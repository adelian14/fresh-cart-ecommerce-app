import { createContext, useEffect, useState } from "react";
import { cartCounterKey, userTokenKey } from "../constansts";

export let CartCounterContext = createContext(0);

export function CartCounterContextProvider(props){
    let [cartCounter, setCartCounter] = useState(0);
    let userLogin = localStorage.getItem(userTokenKey);

    useEffect(()=>{
        if(localStorage.getItem(cartCounterKey+userLogin)) setCartCounter(+localStorage.getItem(cartCounterKey+userLogin));
    },[])

    return <CartCounterContext.Provider value={{cartCounter, setCartCounter}}>
        {props.children}
    </CartCounterContext.Provider>
}