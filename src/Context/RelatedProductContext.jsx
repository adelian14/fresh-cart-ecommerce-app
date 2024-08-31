import React, { createContext, useState } from 'react'

export let RelatedProductContext = createContext(0);

export function RelatedProductContextProvider(props) {

    let [relatedProducts,setRelatedProducts] = useState([]);
    return <>
        <RelatedProductContext.Provider value={{relatedProducts,setRelatedProducts}}>
            {props.children}
        </RelatedProductContext.Provider>
    </>
}
