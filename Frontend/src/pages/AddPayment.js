import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext';
import { toast } from 'react-toastify';
import { API } from '../components/CommonRoute';
import { Link } from 'react-router-dom';

const AddPayment = () => {
    const [student, setStudent] = useState([]);
    const { getToken, logOut } = useContext(AuthContext);
    const [allCourse, setAllCourse] = useState([]);
    const [account, setAccount] = useState([]);
    const [student1, setStudent1] = useState([]);
    const [search, setSearch] = useState("");
    const [nof, setnof] = useState('');
    const getAllStudent = () => {
        axios.get(`${API}student/getStudent`)
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => {
                toast.error(err.message);
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
        axios.get(`${API}account/getAccount`,{
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
    useEffect(() => {
        getAllStudent();
        getAllCourse();
        getAllAccount();
    }, []);
    const getCourse = (course_id) => {
        const fee = allCourse.find(fee => fee._id === course_id);
        return fee ? fee.name : 'Unknown';
    }
    const getacc = (id, course) => {
        const acc = account.find(act => act.studentId === id);
        return acc ? (<>
            <Link className='btn btn-danger btn-sm'>Already added</Link>
        </>) : (<>
            <Link to={`/accounting/${id}/${course}`} className='btn btn-success btn-sm'>Add payment</Link>
        </>)
    }
    function searchStudent(e) {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            logOut();
            return;
        }
        const data = {
            search: search
        }
        axios.post(`${API}student/searchStudent`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setSearch("");
                setStudent1(res.data);
                setnof("");
            })
            .catch(err => {
                setnof("Student not found")
                console.log(err)
            })
    }
    function close() {
        setStudent1("");
    }
    return (
        <>
            <div className='mx-2 my-2'>
                <form onSubmit={searchStudent} className='d-flex'>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='search student' className='form-control' />
                    <input type="submit" value="Search" className='btn btn-success mx-2' />
                </form>
                <p className='span-tag'>{nof}</p>
            </div>
            <div className='my-2 mx-3'>
                {student1.length > 0 ? (<>
                    <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
                    <div className='d-flex justify-content-between my-3 mx-2'>
                        <p className='h4 text-primary'>Add Payment Section</p>
                    </div>
                    <hr />
                    <table className='container-fluid table text-center border table-hover'>
                        <thead className='table-info '>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student1 && student1.map((item, idx) => (
                                <tr key={item._id}>
                                    <th scope='row'>{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{getCourse(item.course)}</td>
                                    <td>
                                        {getacc(item._id, item.course)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>) : (<>
                    {student.length > 0 ? (<>
                        <div className='d-flex justify-content-between my-3 mx-2'>
                            <p className='h4 text-primary'>Add Payment Section</p>
                        </div>
                        <hr />
                        <table className='container-fluid table text-center border table-hover'>
                            <thead className='table-info '>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Grade</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Settings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student && student.map((item, idx) => (
                                    <tr key={item._id}>
                                        <th scope='row'>{idx + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
                                        <td>{getCourse(item.course)}</td>
                                        <td>
                                            {getacc(item._id, item.course)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>) : (<>
                        <p>No students</p>
                    </>)}
                </>)}
                {/* {student.length > 0 ? (<>
                    <div className='d-flex justify-content-between my-3 mx-2'>
                        <p className='h4 text-primary'>Add Payment Section</p>
                    </div>
                    <hr />
                    <table className='container-fluid table text-center border table-hover'>
                        <thead className='table-info '>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student && student.map((item, idx) => (
                                <tr key={item._id}>
                                    <th scope='row'>{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{getCourse(item.course)}</td>
                                    <td>
                                        {getacc(item._id, item.course)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>) : (<>
                    <p>No students</p>
                </>)} */}
            </div>
        </>
    )
}

export default AddPayment