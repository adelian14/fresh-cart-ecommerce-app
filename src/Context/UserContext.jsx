import { createContext, useEffect, useState } from "react";
import { userTokenKey } from "../constansts";

export let UserContext = createContext(0);

export function UserContextProvider(props){
    let [userLogin, setUserLogin] = useState(localStorage.getItem(userTokenKey));
    useEffect(()=>{
        setUserLogin(localStorage.getItem(userTokenKey));
    },[]);
    
    return <UserContext.Provider value={{userLogin, setUserLogin}}>
        {props.children}
    </UserContext.Provider>
}