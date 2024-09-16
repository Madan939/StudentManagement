import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';

const ResetPassword = () => {
const[pass,setPass]=useState('');
const[cpass,setCpass]=useState('');
const {token,id}=useParams();
const navigate=useNavigate();
function resetPassword(e){
    e.preventDefault();
    if(pass!==cpass){
        alert("Passwords didn't match")
    }
    let data={
        _id:id,
        token:token,
        password:pass
    }
    axios.post(`${API}user/resetPassword`,data)
    .then(res=>{
        toast.success(res.data.message)
        navigate("/login")
    })
    .catch(err=>{
        alert("failed to reset password")
        console.log(err)
    })
}
console.log(token,id)
  return (
   <>
    <div className='signup-form m-auto mt-2'>
                <p className='h1 text-primary text-center'>EDS</p>
                <div className='card shadow'>
                    <p className='h3 text-center mt-2'>Reset your password</p>
                    <hr />
                    <form className='mx-4' onSubmit={resetPassword}>
                        <input className="form-control form-control-lg my-3" type="password" placeholder="Password" aria-label="default input example" onChange={(e) => setPass(e.target.value)} value={pass} required />
                        <input className="form-control form-control-lg my-3" type="password" placeholder="Confirm Password" aria-label="default input example" onChange={(e) => setCpass(e.target.value)} value={cpass} required />
                        <hr />
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <input type='submit' className='w-75 btn btn-primary mb-2' value="Reset Password" />                       
                        </div>
                        <hr/>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <Link to="/login" className='w-50 btn btn-success mb-2'>Back to Log In  </Link>                     
                        </div>
                    </form>
                    <br />
                </div>
            </div>
   </>
  )
}

export default ResetPassword