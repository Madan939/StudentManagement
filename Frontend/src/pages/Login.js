import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../components/CommonRoute';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    function formSubmit(e){
        e.preventDefault();
        const data={
            email:email,
            password:password
        }
        axios.post(`${API}user/userLogin`,data)
        .then((res)=>{
            localStorage.setItem('USER',JSON.stringify(res.data));
            navigate('/');
            window.location.reload();
        })
        .catch(err=>{
            alert("Email and password didn't match")
            console.log(err)
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('USER')){
            navigate('/')
        }
    },[navigate])
    return (
        <>
            <div className='signup-form m-auto mt-2'>
                <p className='h1 text-primary text-center'>EDS</p>
                <div className='card shadow'>
                    <form className='mx-4' onSubmit={formSubmit}>
                        <input className="form-control form-control-lg my-3" type="text" placeholder="Email" aria-label="default input example" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        <input className="form-control form-control-lg my-3" type="password" placeholder="Password" aria-label="default input example" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <input type='submit' className='w-100 btn btn-primary mb-2' value="Log In" />
                            <p className=''><Link to="/forgotPassword">Forgot password?</Link></p>
                        </div>
                        <hr />
                        <div className='d-flex align-items-center justify-content-center'>
                            <Link to="/Signup" className='btn btn-success align-items-center  justify-content-center'>Create new Account</Link>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </>
    )
}

export default Login