import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../components/CommonRoute';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const navigate = useNavigate();
    const loginSubmit = (e) => {
        e.preventDefault();
        if (pass !== cpass) {
            alert("password didn't match");
        }
        const data = {
            name: name,
            email: email,
            password: pass
        }
        axios.post(`${API}user/UserRegister`, data)
            .then(() => {
                navigate("/verification")
            })
            .catch(err => {
                alert("Your mail verification failed, please try again!")
                console.log(err)
            })
        //console.log(data)
    }
    useEffect(()=>{
        if(localStorage.getItem("USER")){
            navigate('/')
        }
    },[navigate])
    return (
        <>
            <div className='signup-form m-auto mt-2'>
                <p className='h1 text-primary text-center'>EDS</p>
                <div className='card shadow'>
                    <p className='h3 text-center mt-2'>Create a new account</p>
                    <hr />
                    <form className='mx-4' onSubmit={loginSubmit}>
                        <input className="form-control form-control-lg my-3" type="text" placeholder="Full name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} required />
                        <input className="form-control form-control-lg my-3" type="email" placeholder="Email" aria-label="default input example" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <input className="form-control form-control-lg my-3" type="password" placeholder="Password" aria-label="default input example" onChange={(e) => setPass(e.target.value)} value={pass} required />
                        <input className="form-control form-control-lg my-3" type="password" placeholder="Confirm Password" aria-label="default input example" onChange={(e) => setCpass(e.target.value)} value={cpass} required />
                        <hr />
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            <input type='submit' className='w-50 btn btn-success mb-2' value="Register" />
                            <Link to="/Login" className='h6 text-primary'>Already have an account?</Link>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </>
    )
}

export default SignUp