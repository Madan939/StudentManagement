import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { API, IMAGEURL } from '../components/CommonRoute';
import { AuthContext } from '../components/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
  const [student, setStudent] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const { getToken, logOut } = useContext(AuthContext);
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

  useEffect(() => {
    getAllStudent();
    getAllCourse();
  }, []);
  function getCourse(course) {
    let findcourse = allCourse.find(Course => Course._id === course)
    return findcourse ? findcourse.name : "null";
  }
  // console.log(student)
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
        {student1.length > 0 ? (
          <>
            <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
            <div className='row mx-3 my-3'>
              {student1 && student1.map((item) => (
                <>
                  <div className='col col-6'>
                    <div className='row border my-3 mx-2'>
                      <div className='col col-6 my-3'>
                        <img src={`${IMAGEURL}${item.image}`} style={{ height: "180px", width: "100%" }} alt="student" />
                        <p className='h5 mt-2 text-center'><strong>{item.name}</strong></p>
                      </div>
                      <div className='col col-6 my-3'>
                        <p><strong>Email: </strong><i>{item.email}</i></p>
                        <p><strong>Phone: </strong><i>{item.phone}</i></p>
                        <p><strong>Dob: </strong><i>{item.dob}</i></p>
                        <div className='d-flex justify-content-between'>
                          <div className=''>
                            <strong>Grade </strong>
                            <p><i>{item.grade}</i></p>
                          </div>
                          <div className=''>
                            <strong>Course </strong>
                            <p><i>{getCourse(item.course)}</i></p>
                          </div>
                        </div>

                        <Link to={`/StudentProfile/${item._id}`} className='h6 Links text-decoration-none'>See more...</Link>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <>
            {student.length > 0 ? (
              <>
                <div className='row mx-3 my-3'>
                  {student && student.map((item) => (
                    <>
                      <div className='col col-6'>
                        <div className='row border my-3 mx-2'>
                          <div className='col col-6 my-3'>
                            <img src={`${IMAGEURL}${item.image}`} style={{ height: "180px", width: "100%" }} alt="student" />
                            <p className='h5 mt-2 text-center'><strong>{item.name}</strong></p>
                          </div>
                          <div className='col col-6 my-3'>
                            <p><strong>Email: </strong><i>{item.email}</i></p>
                            <p><strong>Phone: </strong><i>{item.phone}</i></p>
                            <p><strong>Dob: </strong><i>{item.dob}</i></p>
                            <div className='d-flex justify-content-between'>
                              <div className=''>
                                <strong>Grade </strong>
                                <p><i>{item.grade}</i></p>
                              </div>
                              <div className=''>
                                <strong>Course </strong>
                                <p><i>{getCourse(item.course)}</i></p>
                              </div>
                            </div>

                            <Link to={`/StudentProfile/${item._id}`} className='h6 Links text-decoration-none'>See more...</Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>No Students are found</p>
              </>
            )}
          </>
        )}
      </div>

      {/* {student.length > 0 ? (
        <>
          <div className='row mx-3 my-3'>
            {student && student.map((item) => (
              <>
                <div className='col col-6'>
                  <div className='row border my-3 mx-2'>
                    <div className='col col-6 my-3'>
                      <img src={`${IMAGEURL}${item.image}`} style={{ height: "180px", width: "100%" }} alt="student" />
                      <p className='h5 mt-2 text-center'><strong>{item.name}</strong></p>
                    </div>
                    <div className='col col-6 my-3'>
                      <p><strong>Email: </strong><i>{item.email}</i></p>
                      <p><strong>Phone: </strong><i>{item.phone}</i></p>
                      <p><strong>Dob: </strong><i>{item.dob}</i></p>
                      <div className='d-flex justify-content-between'>
                        <div className=''>
                          <strong>Grade </strong>
                          <p><i>{item.grade}</i></p>
                        </div>
                        <div className=''>
                          <strong>Course </strong>
                          <p><i>{getCourse(item.course)}</i></p>
                        </div>
                      </div>

                      <Link to={`/StudentProfile/${item._id}`} className='h6 Links text-decoration-none'>See more...</Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>No Students are found</p>
        </>
      )} */}


    </>
  )
}

export default StudentProfile