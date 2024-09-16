import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { API } from '../components/CommonRoute';
import { AuthContext } from '../components/AuthContext';
import { Link } from 'react-router-dom';

const PaymentDetails = () => {
    const [student, setStudent] = useState([]);
    const { getToken, logOut } = useContext(AuthContext);
    const [allCourse, setAllCourse] = useState([]);
    const [account, setAccount] = useState([]);
    const [account1, setAccount1] = useState([]);
    const [search, setSearch] = useState("");
    const [nof, setnof] = useState('');
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
    const getAllAccount = () => {
        const token = getToken();
        if (!token) {
            logOut();
            return;
        }
        axios.get(`${API}account/getAccount`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setAccount(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAllStudent();
        getAllCourse();
        getAllAccount();
    }, []);
    const getStudent = (studentId) => {
        const studentname = student.find(student => student._id === studentId);
        return studentname ? studentname.name : 'Unknown';
    }
    const getCourse = (course_id) => {
        const course = allCourse.find(course => course._id === course_id);
        return course ? course.name : 'Unknown';
    }
    const getEmail = (studentId) => {
        const studentemail = student.find(student => student._id === studentId);
        return studentemail ? studentemail.email : 'Unknown';
    }
    const getPhone = (studentId) => {
        const studentphone = student.find(student => student._id === studentId);
        return studentphone ? studentphone.phone : 'Unknown';
    }
    const getGrade = (studentId) => {
        const studentgrade = student.find(student => student._id === studentId);
        return studentgrade ? studentgrade.grade : 'Unknown';
    }
    function searchAccount(e) {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            logOut();
            return;
        }
        const data = {
            account: search
        }
        axios.post(`${API}account/searchAccount`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setSearch("");
                setAccount1(res.data);
                setnof("");
            })
            .catch(err => {
                setnof("Account not found")
                console.log(err)
            })
    }
    function close() {
        setAccount1("");
    }
    return (
        <>
            <div className='mx-2 my-2'>
                <form onSubmit={searchAccount} className='d-flex'>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='search student' className='form-control' />
                    <input type="submit" value="Search" className='btn btn-success mx-2' />
                </form>
                <p className='span-tag'>{nof}</p>
            </div>
            <div className='my-2 mx-3'>
                <div className='d-flex justify-content-between my-3 mx-2'>
                    <p className='h4 text-primary'>Payment Details</p>
                </div>
                {account1.length > 0 ? (
                    <>
                        <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
                        <table className='container-fluid table text-center border '>
                            <thead className='table-info '>
                                <tr>
                                    <th>SN</th>
                                    <th>Student Name</th>
                                    <th>Grade</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    {/* <th>Paid Fee</th> */}
                                    <th>Phone</th>
                                    <th>Settings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {account1 && account1.map((item, idx) => (
                                    <tr key={item._id}>
                                        <td>{idx + 1}</td>
                                        <td>{getStudent(item.studentId)}</td>
                                        <td>{getGrade(item.studentId)}</td>
                                        <td>{getCourse(item.courseId)}</td>
                                        <td>{getEmail(item.studentId)}</td>
                                        <td>{getPhone(item.studentId)}</td>
                                        <td>
                                            <Link to={`/paymentinfo/${item._id}/${item.studentId}/${item.courseId}`} className='btn btn-secondary btn-sm'>payment details...</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        {account.length > 0 ? (
                            <>
                                <table className='container-fluid table text-center border '>
                                    <thead className='table-info '>
                                        <tr>
                                            <th>SN</th>
                                            <th>Student Name</th>
                                            <th>Grade</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            {/* <th>Paid Fee</th> */}
                                            <th>Phone</th>
                                            <th>Settings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {account && account.map((item, idx) => (
                                            <tr key={item._id}>
                                                <td>{idx + 1}</td>
                                                <td>{getStudent(item.studentId)}</td>
                                                <td>{getGrade(item.studentId)}</td>
                                                <td>{getCourse(item.courseId)}</td>
                                                <td>{getEmail(item.studentId)}</td>
                                                <td>{getPhone(item.studentId)}</td>
                                                <td>
                                                    <Link to={`/paymentinfo/${item._id}/${item.studentId}/${item.courseId}`} className='btn btn-secondary btn-sm'>payment details...</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>No payments are added to the account section</p>
                        )}
                    </>
                )}

            </div>
        </>
    )
}

export default PaymentDetails