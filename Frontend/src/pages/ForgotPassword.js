import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';

export const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const navigate=useNavigate('');
    function forgetPassword(e){
        e.preventDefault();
        let data={
            email:email
        }
        axios.post(`${API}user/forgotPassword`,data)
        .then(res=>{
            toast.success(res.data.message)
            navigate("/Success")
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
  <>
     <div className='signup-form m-auto mt-2'>
                <p className='h1 text-primary text-center'>EDS</p>
                <div className='card shadow'>
                <p className='h4 m-2 text-center'>Find your account</p>
                <hr/>
                <p className='h5 m-2 '>Please enter your email to search for your account </p>
                <br/>
                    <form className='mx-4' onSubmit={forgetPassword}>
                        <input className="form-control form-control-lg my-3" type="text" placeholder="Email" aria-label="default input example" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <input type='submit' className='w-100 btn btn-primary mb-2' value="Submit" />
                        </div>
                        <hr />
                        <div className='d-flex align-items-center justify-content-center'>
                            <Link to="/login" className='btn btn-success align-items-center  justify-content-center'>Back to login</Link>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
  </>
  )
}
