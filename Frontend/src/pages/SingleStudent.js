import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/AuthContext';
import { API, IMAGEURL } from '../components/CommonRoute';
import { Link, useParams } from 'react-router-dom';

const SingleStudent = () => {
    const [student, setStudent] = useState([]);
    const [allCourse, setAllCourse] = useState([]);
    const { getToken, logOut } = useContext(AuthContext);
    const { id } = useParams();
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

    useEffect(() => {
        if (!id) {
            console.log("err")
        }
        axios.get(`${API}student/getStudentInfo/${id}`)
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        getAllCourse();
    }, [id]);
    return (
        <>
         <Link to="/studentProfile"  className='mx-2 my-2 btn btn-secondary btn-sm '>back...</Link>
            <div className='border m-3'>
                <p className='h2 mt-2 text-center text-primary'>Student Information</p>
                <div className='row m-4 border'>
                    <div className='col col-3 mt-3 mb-2'>
                        <p className='border'>
                            <img src={`${IMAGEURL}${student.image}`} alt='st....' style={{ height: "200px", width: "100%" }} />
                        </p>
                    </div>
                    <div className='col col-9 mt-3 mb-2 border'>
                        <p className='h3 text-center'>Personal Information</p>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p>
                                    <strong>Full Name: </strong><i>{student.name}</i>
                                </p>
                                <p>
                                    <strong>Dob: </strong><i>{student.dob}</i>
                                </p>
                                <p>
                                    <strong>Gender: </strong><i>{student.gender}</i>
                                </p>
                                <p>
                                    <strong>Phone: </strong><i>{student.phone}</i>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Email: </strong><i>{student.email}</i>
                                </p>
                                <p>
                                    <strong>Permanent Address: </strong><i>{student.address && student.address.map((item => item.paddress))}</i>
                                </p>
                                <p>
                                    <strong>Temporary Address: </strong><i>{student.address && student.address.map((item => item.taddress))}</i>
                                </p>
                                <p>
                                    <strong>About Student: </strong><i>{student.description}</i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='row m-4 border'>
                    <p className='h4 text-center'>Academic Information</p>
                    {allCourse && allCourse.filter((i) => i._id === student.course).map((item) => (
                        <>
                            <div className='d-flex justify-content-between mt-2 mb-2'>
                                <p key={item._id}><strong>Course Name: </strong><i>{item.name}</i></p>
                                <p key={item._id}><strong>Course Price: </strong><i>{item.price}</i></p>
                                <p key={item._id}><strong>Course Duration: </strong><i>{item.duration}</i></p>
                            </div>
                            <p className='mx-2'><hr/></p>
                            <p className='text-center'><strong>Description</strong></p>
                            <p><i>{item.description}</i></p>
                        </>
                    ))}
                </div>
                
            </div>
        </>
    )
}

export default SingleStudent