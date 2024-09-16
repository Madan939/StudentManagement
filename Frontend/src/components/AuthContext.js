import { createContext, useEffect, useState } from "react";
//import { APIROUTE } from "../components/Commonroute";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{  
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('USER'));
        // console.log(userInfo)
        if(userInfo){
            setUser(userInfo);
        }
    },[])
    const logOut=()=>{  
        setUser(null)
        localStorage.removeItem('USER')
    }
    const getToken=()=>{
        const user=JSON.parse(localStorage.getItem('USER'));
        return user?(user.token):(null)
    }
    return (
        <AuthContext.Provider value={{user,logOut,getToken}}>
            {children}
        </AuthContext.Provider>
        
    )
}