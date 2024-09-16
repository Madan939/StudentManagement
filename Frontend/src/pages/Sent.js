import React from 'react'
import { Link } from 'react-router-dom'

const Sent = () => {
  return (
    <>
    <p className='h3 text-primary'>Please check your mail to reset your password</p>
    <Link to="/login">Back to login</Link>

    </>
  )
}

export default Sent