// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { API } from '../components/CommonRoute';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../components/AuthContext';

// const AllStudent = () => {
//   const [student, setStudent] = useState([]);
//   const {getToken,logOut}=useContext(AuthContext);
//   const getAllStudent = () => {
//     axios.get(`${API}student/getStudent`)
//       .then(res => {
//         setStudent(res.data);
//       })
//       .catch(err => {
//         toast.error(err.message);
//       })
//   };
//   const [allCourse, setAllCourse] = useState([]);
//   const getAllCourse = () => {
//     const token = getToken();
//     if (!token) {
//       logOut();
//     }
//     axios.get(`${API}course/getCourse`,{
//       headers:{
//         'Authorization':`Bearer ${token}`
//       }
//     })
//       .then(res => {
//         setAllCourse(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getAllStudent();
//     getAllCourse();
//   }, []);
//   function deleteStudent(id) {
//     const token = getToken();
//     if (!token) {
//       logOut();
//     }
//     axios.post(`${API}student/deleteStudent/${id}`,{},{
//       headers:{
//         'Authorization':`Bearer ${token}`
//       }
//     })
//     .then((res=>{
//       getAllStudent();
//       toast.success(res.data.message)
//     }))
//     .catch(()=>{
//       toast.error("failed to delete Student records")
//     })
//   }
//   // const getCoursedue=(course_id,advfee)=>{
//   //   const fee = allCourse.find(fee => fee._id === course_id);
//   //   return fee ? fee.price-advfee : 'Unknown';
//   // }
//   const getCourse=(course_id)=>{
//     const fee = allCourse.find(fee => fee._id === course_id);
//     return fee ? fee.name: 'Unknown';
//   }
//   return (
//     <>
//       <div className='my-2 mx-3'>
//         <div className='d-flex justify-content-between my-3 mx-2'>
//           <p className='h4 text-primary'>Students List</p>
//           <Link to="/addStudent" className='btn btn-primary btn-sm'>Add students</Link>
//         </div>
//         <hr />
//         <table className='container-fluid table text-center border table-hover'>
//           <thead className='table-info'>
//             <tr>
//               <th>SN</th>
//               <th>Name</th>
//               <th>Grade</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Gender</th>
//               <th>Course</th>
//               {/* <th>Due_fee</th> */}
//               <th>Settings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {student && student.map((item, idx) => (
//               <tr key={item._id}>
//                 <th scope='row'>{idx + 1}</th>
//                 <td>{item.name}</td>
//                 <td>{item.grade}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.email}</td>
//                 <td>{item.gender}</td>
//                 <td>{getCourse(item.course)}</td>
//                 {/* <td>{getCoursedue(item.course,item.advancefee)}</td> */}
//                 <td>
//                   <Link to={`/editStudent/${item._id}`} className='text-dark'>
//                     <i className="fa-regular fa-pen-to-square mx-2"></i>
//                   </Link>
//                   <i className="delete fa-solid fa-trash mx-2" onClick={() => deleteStudent(item._id)}></i>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }

// export default AllStudent
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import your ConfirmationDialog component

const AllStudent = () => {
  const [student, setStudent] = useState([]);
  const [student1, setStudent1] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { getToken, logOut } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [nof, setnof] = useState('');

  const getAllStudent = async () => {
    try {
      const res = await axios.get(`${API}student/getStudent`);
      setStudent(res.data);
    } catch (err) {
      toast.error(err.message);
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
    getAllStudent();
    getAllCourse();
  }, []);

  const deleteStudent = async (id) => {
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    try {
      const res = await axios.post(`${API}student/deleteStudent/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      getAllStudent(); // Refresh the student list after deletion
    } catch (err) {
      toast.error('Failed to delete student');
    }
  };

  const handleDelete = (id) => {
    setSelectedStudentId(id);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    if (selectedStudentId) {
      deleteStudent(selectedStudentId);
    }
    setShowDialog(false);
  };

  const handleCancel = () => {
    setSelectedStudentId(null);
    setShowDialog(false);
  };

  const getCourse = (course_id) => {
    const course = allCourse.find(c => c._id === course_id);
    return course ? course.name : 'Unknown';
  };
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
      <div className='mx-2 mt-2'>
        {student1.length > 0 ? (
          <>
            <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
            <table className='container-fluid table text-center border table-hover '>
              <thead className='table-info'>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {student1.map((item, idx) => (
                  <tr key={item._id}>
                    <th scope='row'>{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.grade}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{getCourse(item.course)}</td>
                    <td>
                      <Link to={`/editStudent/${item._id}`} className='text-dark'>
                        <i className="fa-regular fa-pen-to-square mx-2"></i>
                      </Link>
                      <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className='my-2 mx-3'>
              {student.length > 0 ? (
                <>
                  <div className='d-flex justify-content-between my-3 mx-2'>
                    <p className='h4 text-primary'>Students List</p>
                    <Link to="/addStudent" className='btn btn-primary btn-sm'>Add Students</Link>
                  </div>
                  <hr />
                  <table className='container-fluid table text-center border table-hover'>
                    <thead className='table-info'>
                      <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Grade</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Settings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.map((item, idx) => (
                        <tr key={item._id}>
                          <th scope='row'>{idx + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.grade}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{item.gender}</td>
                          <td>{getCourse(item.course)}</td>
                          <td>
                            <Link to={`/editStudent/${item._id}`} className='text-dark'>
                              <i className="fa-regular fa-pen-to-square mx-2"></i>
                            </Link>
                            <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <><p>No students</p></>
              )}
            </div>
          </>)}
      </div>
      {/* <div className='my-2 mx-3'>
        {student.length > 0 ? (
          <>
            <div className='d-flex justify-content-between my-3 mx-2'>
              <p className='h4 text-primary'>Students List</p>
              <Link to="/addStudent" className='btn btn-primary btn-sm'>Add Students</Link>
            </div>
            <hr />
            <table className='container-fluid table text-center border table-hover'>
              <thead className='table-info'>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {student.map((item, idx) => (
                  <tr key={item._id}>
                    <th scope='row'>{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.grade}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
                    <td>{getCourse(item.course)}</td>
                    <td>
                      <Link to={`/editStudent/${item._id}`} className='text-dark'>
                        <i className="fa-regular fa-pen-to-square mx-2"></i>
                      </Link>
                      <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <><p>No students</p></>
        )}

      </div> */}

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this student?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default AllStudent;
