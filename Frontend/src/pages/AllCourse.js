import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API } from '../components/CommonRoute';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Make sure to import your ConfirmationDialog component

const AllCourse = () => {
  const [department, setDepartment] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const { getToken, logOut } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [nof, setnof] = useState('');
  const getAllDepartment = async () => {
    try {
      const res = await axios.get(`${API}department/getDepartment`);
      setDepartment(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCourse = async () => {
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    try {
      const res = await axios.get(`${API}course/getCourse`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAllCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCourse();
    getAllDepartment();
  }, []);

  const getDepartmentName = (deptId) => {
    const dept = department.find(dept => dept._id === deptId);
    return dept ? dept.name : 'Unknown';
  };

  const deleteCourse = async (id) => {
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    try {
      const res = await axios.post(`${API}course/deleteCourse/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      getAllCourse(); // Refresh the course list after deletion
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleDelete = (id) => {
    setSelectedCourseId(id);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    if (selectedCourseId) {
      deleteCourse(selectedCourseId);
    }
    setShowDialog(false);
  };

  const handleCancel = () => {
    setSelectedCourseId(null);
    setShowDialog(false);
  };
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
            <div className='my-2 mx-3'>
              <div className='d-flex justify-content-between my-3'>
                <p className='h4 text-primary'>Course List</p>
                <Link to="/addCourse" className='btn btn-primary btn-sm'>Add Course</Link>
              </div>
              <hr />
              <table className='container-fluid table text-center border table-hover'>
                <thead className='table-info'>
                  <tr>
                    <th>No</th>
                    <th>Name of Course</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Department</th>
                    <th>Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {course.map((item, idx) => (
                    <tr key={item._id}>
                      <th scope='row'>{idx + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.duration}</td>
                      <td>{getDepartmentName(item.department)}</td>
                      <td>
                        <Link to={`/editCourse/${item._id}`} className='text-dark'>
                          <i className="fa-regular fa-pen-to-square mx-2"></i>
                        </Link>
                        <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {allCourse.length > 0 ? (
              <>
                <div className='my-2 mx-3'>
                  <div className='d-flex justify-content-between my-3'>
                    <p className='h4 text-primary'>Course List</p>
                    <Link to="/addCourse" className='btn btn-primary btn-sm'>Add Course</Link>
                  </div>
                  <hr />
                  <table className='container-fluid table text-center border table-hover'>
                    <thead className='table-info'>
                      <tr>
                        <th>No</th>
                        <th>Name of Course</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Department</th>
                        <th>Settings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCourse.map((item, idx) => (
                        <tr key={item._id}>
                          <th scope='row'>{idx + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.duration}</td>
                          <td>{getDepartmentName(item.department)}</td>
                          <td>
                            <Link to={`/editCourse/${item._id}`} className='text-dark'>
                              <i className="fa-regular fa-pen-to-square mx-2"></i>
                            </Link>
                            <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p>No courses available</p>
            )}
          </>
        )}

      </div>
      {/* {allCourse.length > 0 ? (
        <>
          <div className='my-2 mx-3'>
            <div className='d-flex justify-content-between my-3'>
              <p className='h4 text-primary'>Course List</p>
              <Link to="/addCourse" className='btn btn-primary btn-sm'>Add Course</Link>
            </div>
            <hr />
            <table className='container-fluid table text-center border table-hover'>
              <thead className='table-info'>
                <tr>
                  <th>No</th>
                  <th>Name of Course</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Department</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {allCourse.map((item, idx) => (
                  <tr key={item._id}>
                    <th scope='row'>{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.duration}</td>
                    <td>{getDepartmentName(item.department)}</td>
                    <td>
                      <Link to={`/editCourse/${item._id}`} className='text-dark'>
                        <i className="fa-regular fa-pen-to-square mx-2"></i>
                      </Link>
                      <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No courses available</p>
      )} */}

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this course?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default AllCourse;
