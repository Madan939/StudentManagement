import React, { useEffect, useState } from 'react'
import { API } from '../components/CommonRoute';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const[validUrl,setValidUrl]=useState(false);
    const params=useParams();
    useEffect(()=>{
        const verifyemail=async()=>{
            try{
                const url=`${API}user/verifyEmail/${params.token}`
                const {data}= await axios.get(url)
                console.log(data)
                setValidUrl(true)

            }
            catch(err){
               // console.log(err)
                setValidUrl(false)
            }
        }
        verifyemail()
    },[])
        

  return (
    <>
    <p className='h2 text-center '>User Registered successfully</p>
    <Link to="/Login" className='btn btn-primary text-light'>Back to Log In</Link>
    </>
  )
        }
    
export default VerifyEmail