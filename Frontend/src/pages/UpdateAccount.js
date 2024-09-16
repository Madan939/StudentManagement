import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';

const UpdateAccount = () => {
  const { id, student, course } = useParams();
  const [Student, setStudent] = useState([]);
  const [Course, setCourse] = useState([]);
  const [paidAmount, setPaidAmount] = useState('');
  const [validAmount, setValidAmount] = useState('');
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const { getToken, logOut } = useContext(AuthContext);
  const getAllAccount = () => {
    const token = getToken();
    if (!token) {
      logOut();
    }
    axios.get(`${API}account/getOneAccount/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setAccount(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getStudent = () => {
    axios.get(`${API}student/getStudentInfo/${student}`)
      .then(res => {
        setStudent(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };
  const getCourse = () => {
    axios.get(`${API}course/getCourse/${course}`)
      .then(res => {
        setCourse(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };
  useEffect(() => {
    getStudent();
    getCourse();
    getAllAccount();
  }, []);
  function updateAccount(e) {
    e.preventDefault();
    if (paidAmount < 0) {
      setValidAmount("amount should not be less than Zero");
      return false;
    }
    if (paidAmount > Course.price) {
      setValidAmount("Paid amount should not be greater than total amount");
      return false;
    } if (paidAmount > (account.remainingfee)) {
      setValidAmount("Paid amount should not be greater than remaining amount");
      return false;
    }
    const regex = /^[0-9.]+$/;
    if (!regex.test(paidAmount)) {
      setValidAmount("Amount should contain only numbers ")
      return false;
    }

    const data = {
      _id: id,
      studentId: student,
      courseId: course,
      totalAmount: account.remainingfee,
      paidfee: Number(paidAmount),
      remainingfee: account.remainingfee - Number(paidAmount),
      date: new Date().toISOString().split('T')[0]
    }
    const token = getToken();
    if (!token) {
      logOut();
    }
    axios.post(`${API}account/updateAccount`, data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        toast.success(res.data.message);
        navigate("/updatepayment");
      })
      .catch(err => {
        toast.error("failed to update amount");
        console.log(err)
      })
  }
  return (
    <>
      <Link to="/updatepayment" className='btn btn-secondary btn-sm mt-2 mb-1'>Back</Link>
      <div className='w-75 mt-2 border shadow m-auto' >

        <p className='my-2 text-center h3'>Account Section</p>
        <form className='m-3' onSubmit={updateAccount} >
          <div className='row'>
            <div className='col'>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputN" value={Student.name} disabled />
                <label htmlFor="floatingInputN">Student Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputCN" value={Course.name} disabled />
                <label htmlFor="floatingInputCN">Course Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputpA" placeholder="" onChange={(e) => setPaidAmount(e.target.value)} required />
                <label htmlFor="floatingInputPA">Paid Amount</label>
              </div>
              <span className='span-tag'>{validAmount}</span>
            </div>
            <div className='col'>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputCA" value={Course.price} disabled />
                <label htmlFor="floatingInputCA">Total Amount</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputpRF" value={account.remainingfee} disabled />
                <label htmlFor="floatingInputRF">Remaining Amount</label>
              </div>
            </div>
          </div>
          <br />
          <input type='submit' value="Update" className='btn btn-success' />
        </form>
      </div>
    </>
  )
}

export default UpdateAccount