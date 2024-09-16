import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../components/CommonRoute';
import axios from 'axios';
import { toast } from 'react-toastify';

const Accounting = () => {
    const { id, course_id } = useParams();
    const [student, setStudent] = useState([]);
    const [course, setCourse] = useState([]);
    const [paidAmount, setPaidAmount] = useState('');
    const [validAmount, setValidAmount] = useState('');
    const navigate=useNavigate();
    const getStudent = () => {
        axios.get(`${API}student/getStudentInfo/${id}`)
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };
    const getCourse = () => {
        axios.get(`${API}course/getCourse/${course_id}`)
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
    }, []);
    function feePay(e) {
        e.preventDefault();
        if (paidAmount < 0) {
            setValidAmount("amount should not be less than Zero");
            return false;
        }
        if (paidAmount > course.price) {
            setValidAmount("Paid amount should not be greater than total amount");
            return false;
        }  if (paidAmount > (course.price-student.advancefee)) {
            setValidAmount("Paid amount should not be greater than remaining amount");
            return false;
        }
        const regex = /^[0-9.]+$/;
        if (!regex.test(paidAmount)) {
            setValidAmount("Amount should contain only numbers ")
            return false;
        }
        const data = {
            studentId: student._id,
            courseId: course._id,
            name:student.name,
            totalAmount: course.price,
            paidfee: Number(paidAmount),
            remainingfee: course.price - Number(paidAmount) - student.advancefee,
            date:new Date().toISOString().split('T')[0] 
        }
        axios.post(`${API}account/addAccountInfo`, data)
        .then(res=>{
            toast.success(res.data.message);
            navigate("/updatepayment")
        })
        .catch(err=>{
            console.log(err)
        })
        setValidAmount("")
        console.log(data)
    }
    //console.log(course)

    return (
        <>
        <Link to="/addpayments" className='btn btn-secondary btn-sm mt-2 mb-1'>Back</Link>
            <div className='w-75 mt-2 border shadow m-auto' >
                <p className='my-2 text-center h3'>Account Section</p>
                <form className='m-3' onSubmit={feePay}>
                    <div className='row'>
                        <div className='col'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInputN" value={student.name} disabled />
                                <label htmlFor="floatingInputN">Student Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInputCN" value={course.name} disabled />
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
                                <input type="text" className="form-control" id="floatingInputCA" value={course.price} disabled />
                                <label htmlFor="floatingInputCA">Course Amount</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInputAP" value={student.advancefee} disabled />
                                <label htmlFor="floatingInputCA">Advance Payment</label>
                            </div>
                            <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputpRF" value={course.price-student.advancefee} disabled />
                        <label htmlFor="floatingInputRF">Remaining Amount</label>
                    </div>
                        </div>
                    </div>
                    
                    <br />
                    <input type='submit' value="submit"  className='btn btn-primary'/>
                </form>
            </div>
        </>
    )
}

export default Accounting