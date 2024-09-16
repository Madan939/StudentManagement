import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API } from '../components/CommonRoute';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const PaymentInfo = () => {
    const { id, student, course } = useParams();
    const [details, setDetails] = useState(null);
    const [Student, setStudent] = useState([]);
    const { getToken, logOut } = useContext(AuthContext);
    const [allCourse, setAllCourse] = useState([]);
    const getAllStudent = () => {
        axios.get(`${API}student/getStudent`)
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };
    const getAllCourse = () => {
        const token = getToken();
        if (!token) {
            logOut();
        }
        axios.get(`${API}course/getCourse`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setAllCourse(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const getDetails = () => {
        axios.get(`${API}history/getOnehistory/${id}`)
            .then(res => {
                setDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDetails();
        getAllStudent();
        getAllCourse();
    }, []);
    const getStudent = (studentId) => {
        const studentname = Student.find(student => student._id === studentId);
        return studentname ? studentname.name : 'Unknown';
    }
    const getCourse = (course_id) => {
        const course = allCourse.find(course => course._id === course_id);
        return course ? course.name : 'Unknown';
    }
    const getGrade = (studentId) => {
        const studentgrade = Student.find(student => student._id === studentId);
        return studentgrade ? studentgrade.grade : 'Unknown';
    }
    const getadvancefee = (studentId) => {
        const studentadvfee = Student.find(student => student._id === studentId);
        return studentadvfee ? studentadvfee.advancefee : 'Unknown';
    }
    console.log(details);

    return (
        <>
            <div className='mx-1 mt-2'>
                {/* <div className=''>
                    <p><strong>Name:</strong>{getStudent(student)}</p>
                    <p>Grade:{getGrade(student)}</p>
                    <p>Course:{getCourse(course)}</p>
                    <p>Advance Payment:{getadvancefee(student)}</p>
                </div> */}
                <Link to="/paymentdetails" className='btn btn-secondary btn-sm'>Back</Link>
                <p className='text-center h5'>Payment History of <strong>{getStudent(student)},{getGrade(student)}({getCourse(course)})</strong></p>
                <p>Advance Payment(Rs.{getadvancefee(student)}) is debited in first payment</p>
                <table className='container-fluid table text-center border '>
                    <thead className='table-success'>
                        <tr>
                            <th>SN</th>
                            <th>Transaction Date</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Remaining Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details && details.map((item, idx) => (
                            <tr key={item._id}>
                                <th scope='row'>{idx + 1}</th>
                                <td>{item.date}</td>
                                <td>Rs.{item.totalAmount}</td>
                                <td>Rs.{item.paidAmount}</td>
                                <td>Rs.{item.remainingAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentInfo;
