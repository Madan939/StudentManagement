import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API } from '../components/CommonRoute';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import ConfirmationDialog from '../components/ConfirmationDialog';

const DepartmentList = () => {
  const { getToken, logOut } = useContext(AuthContext);
  const [department, setDepartment] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [department1, setDepartment1] = useState([]);
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

  useEffect(() => {
    getAllDepartment();
  }, []);

  const deleteItem = async (_id) => {
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    try {
      const res = await axios.post(`${API}department/deleteDepartment/${_id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      getAllDepartment(); // Refresh the list after deletion
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleDelete = (id) => {
    setSelectedDepartmentId(id);
    setShowDialog(true);
  };

  const handleConfirm = () => {
    if (selectedDepartmentId) {
      deleteItem(selectedDepartmentId);
    }
    setShowDialog(false);
  };

  const handleCancel = () => {
    setSelectedDepartmentId(null);
    setShowDialog(false);
  };
  function searchdepartment(e) {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      logOut();
      return;
    }
    const data = {
      departmentname: search
    }
    axios.post(`${API}department/searchDepartment`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        setSearch("");
        setDepartment1(res.data);
        setnof("");
      })
      .catch(err => {
        setnof("department not found")
        console.log(err)
      })
  }
  function close() {
    setDepartment1("");
  }
  return (
    <>
      <div className='mx-2 my-2'>
        <form onSubmit={searchdepartment} className='d-flex'>
          <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='search student' className='form-control' />
          <input type="submit" value="Search" className='btn btn-success mx-2' />
        </form>
        <p className='span-tag'>{nof}</p>
        {department1.length > 0 ? (
          <>
            <p className='btn btn-danger btn-sm mx-2 my-2' onClick={close}>Close all</p>
            <table className='container-fluid table text-center border table-hover'>
              <thead className='table-info'>
                <tr>
                  <th>No</th>
                  <th>Name of Dept.</th>
                  <th>Status</th>
                  <th>Head</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                {department1.map((item, idx) => (
                  <tr key={item._id}>
                    <th scope='row'>{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <button className={`btn btn-sm ${item.status === 'Active' ? 'btn-success' : 'btn-danger'}`}>
                        {item.status}
                      </button>
                    </td>
                    <td>{item.hod}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/editDepartment/${item._id}`} className='text-dark'>
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
              <div className='d-flex justify-content-between my-3'>
                <p className='h4 text-primary'>Departments List</p>
                <Link to="/addDepartment" className='btn btn-primary btn-sm'>Add Departments</Link>
              </div>
              <hr />
              {department.length > 0 ? (
                <table className='container-fluid table text-center border table-hover'>
                  <thead className='table-info'>
                    <tr>
                      <th>No</th>
                      <th>Name of Dept.</th>
                      <th>Status</th>
                      <th>Head</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.map((item, idx) => (
                      <tr key={item._id}>
                        <th scope='row'>{idx + 1}</th>
                        <td>{item.name}</td>
                        <td>
                          <button className={`btn btn-sm ${item.status === 'Active' ? 'btn-success' : 'btn-danger'}`}>
                            {item.status}
                          </button>
                        </td>
                        <td>{item.hod}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Link to={`/editDepartment/${item._id}`} className='text-dark'>
                            <i className="fa-regular fa-pen-to-square mx-2"></i>
                          </Link>
                          <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No departments are added.</p>
              )}

              {showDialog && (
                <ConfirmationDialog
                  message="Are you sure you want to delete?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
            </div>
          </>
        )}

      </div>
      {/* <div className='my-2 mx-3'>
        <div className='d-flex justify-content-between my-3'>
          <p className='h4 text-primary'>Departments List</p>
          <Link to="/addDepartment" className='btn btn-primary btn-sm'>Add Departments</Link>
        </div>
        <hr />
        {department.length > 0 ? (
          <table className='container-fluid table text-center border table-hover'>
            <thead className='table-info'>
              <tr>
                <th>No</th>
                <th>Name of Dept.</th>
                <th>Status</th>
                <th>Head</th>
                <th>Email</th>
                <th>Phone</th>
                <th>No.of Students</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {department.map((item, idx) => (
                <tr key={item._id}>
                  <th scope='row'>{idx + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <button className={`btn btn-sm ${item.status === 'Active' ? 'btn-success' : 'btn-danger'}`}>
                      {item.status}
                    </button>
                  </td>
                  <td>{item.hod}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.nos}</td>
                  <td>
                    <Link to={`/editDepartment/${item._id}`} className='text-dark'>
                      <i className="fa-regular fa-pen-to-square mx-2"></i>
                    </Link>
                    <i className="delete fa-solid fa-trash mx-2" onClick={() => handleDelete(item._id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No departments are added.</p>
        )}

        {showDialog && (
          <ConfirmationDialog
            message="Are you sure you want to delete?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div> */}
    </>
  );
};

export default DepartmentList;
