import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { API, IMAGEURL } from '../components/CommonRoute';
import { AuthContext } from '../components/AuthContext';

const CourseInfo = () => {
  const [allCourse, setAllCourse] = useState([]);
  const { getToken, logOut } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [nof, setnof] = useState('');
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
  const [department, setDepartment] = useState([]);
  const getAllDepartment = async () => {
    await axios.get(`${API}department/getDepartment`)
      .then(res => {
        setDepartment(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getDepartmentName = (deptId) => {
    const dept = department.find(dept => dept._id === deptId);
    return dept ? dept.name : 'Unknown';
  };
  useEffect(() => {
    getAllCourse();
    getAllDepartment();
  })
  function searchCourse(e) {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    const data = {
      search: search
    }
    axios.post(`${API}course/searchCourse`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        setSearch("");
        setCourse(res.data);
        setnof("");
      })
      .catch(err => {
        setnof("Course not found")
        console.log(err)
      })
  }
  function close() {
    setCourse("");
  }
  return (
    <>
      <div className='mx-2 my-2'>
        <form onSubmit={searchCourse} className='d-flex'>
          <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='search student' className='form-control' />
          <input type="submit" value="Search" className='btn btn-success mx-2' />
        </form>
        <p className='span-tag'>{nof}</p>
        {course.length > 0 ? (
          <>
          <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
            {course && course.map((item) => (
              <div className='m-3 card'>
                <div className='row'>
                  <div className='col col-6 '>
                    <div className='mx-2 my-4'>
                      <img src={`${IMAGEURL}${item.image}`} alt="" style={{ height: "15rem", width: "100%" }} />
                    </div>
                  </div>
                  <div className='col col-6'>
                    <p className='my-4'>Name:{item.name}</p>
                    <p>Price:{item.price}</p>
                    <p>Duration:{item.name}</p>
                    <p>Department:{getDepartmentName(item.department)}</p>
                  </div>
                </div>
                <hr />
                <p className='p-2'>{item.description}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            {allCourse.length > 0 ? (
              <>
                {allCourse && allCourse.map((item) => (
                  <div className='m-3 card'>
                    <div className='row'>
                      <div className='col col-6 '>
                        <div className='mx-2 my-4'>
                          <img src={`${IMAGEURL}${item.image}`} alt="" style={{ height: "15rem", width: "100%" }} />
                        </div>
                      </div>
                      <div className='col col-6'>
                        <p className='my-4'>Name:{item.name}</p>
                        <p>Price:{item.price}</p>
                        <p>Duration:{item.name}</p>
                        <p>Department:{getDepartmentName(item.department)}</p>
                      </div>
                    </div>
                    <hr />
                    <p className='p-2'>{item.description}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p>No courses Available</p>
              </>
            )}
          </>
        )}
      </div>
      {/* {allCourse.length>0 ? (
        <>
          {allCourse && allCourse.map((item) => (
            <div className='m-3 card'>
              <div className='row'>
                <div className='col col-6 '>
                  <div className='mx-2 my-4'>
                    <img src={`${IMAGEURL}${item.image}`} alt="" style={{ height: "15rem", width: "100%" }} />
                  </div>
                </div>
                <div className='col col-6'>
                  <p className='my-4'>Name:{item.name}</p>
                  <p>Price:{item.price}</p>
                  <p>Duration:{item.name}</p>
                  <p>Department:{getDepartmentName(item.department)}</p>
                </div>
              </div>
              <hr />
              <p className='p-2'>{item.description}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No courses Available</p>
        </>
      )} */}
    </>
  )
}

export default CourseInfo