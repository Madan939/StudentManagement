import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';

const EditDepartment = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [hod, setHod] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const navigate=useNavigate();
  const{getToken,logOut}=useContext(AuthContext);
  const [validname, setValidName] = useState('');
  const [validhod, setValidHod] = useState('');
  const [validemail, setValidemail] = useState('');
  const [validphone, setValidPhone] = useState('');
  const [department, setDepartment] = useState([]);
  const[names,setnames]=useState('');
  const getAllDepartment = async () => {
    await axios.get(`${API}department/getDepartment`)
      .then(res => {
        // console.log(res.data)
        setDepartment(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };
  useEffect(() => {
    getAllDepartment();
    if (id) {
      axios.get(`${API}department/editDepartment/${id}`)
        .then(res => {
          setName(res.data.name)
          setnames(res.data.name)
          setHod(res.data.hod)
          setEmail(res.data.email)
          setPhone(res.data.phone)
          setStatus(res.data.status)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [id])
  function updateForm(e) {
    e.preventDefault();
    const nameregex = /^[A-Za-z\s]+$/;
    const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneregex=/^[0-9-+]+$/;
    if(!nameregex.test(name)){
      setValidName("only alphabets are allowed")
      return false;
    }
    const dname=department.find(d => d.name.toLowerCase() === name.toLowerCase());
    if(dname && names!==name){
      setValidName("Department name is already in use")
      return false;
    }
    setValidName("");
    if(!nameregex.test(hod)){
      setValidHod("Numbers are not allowed")
      return false;
    }
    if(hod.length<=2){
      setValidHod("names character should not be less than 3")
      return false;
    }
    setValidHod("");
    if(!emailregex.test(email)){
      setValidemail("email format doesnot match");
      return false;
    }
    setValidemail("");
    if(!phoneregex.test(phone)){
      setValidPhone("Format does not match");
      return false;
    }
    if(phone.length<10){
      setValidPhone("Phone numbers should not be less than 10 character");
      return false;
    }
    setValidPhone("");
    const data = {
      _id: id,
      name: name,
      hod: hod,
      email: email,
      phone: phone,
      status: status
    }
    let token=getToken();
    if(!token){
      logOut();
    }
    axios.post(`${API}department/updateDepartment`, data,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        toast.success(res.data.message);
        navigate("/departmentList");
      })
      .catch(err => {
        toast.error("Failed to update")
      })
  }
  return (
    <>
    <Link to="/departmentlist" className='btn btn-secondary btn sm mt-2 mx-2'>Back...</Link>
      <form className='mx-2 my-4 shadow' onSubmit={updateForm}>
        <p className='h3 text-center text-success'>Edit Department</p>
        {/* <div className='row mx-3'>
          <div className='col col-6'>
            <input className="form-control  my-3" type="text" placeholder="Name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} required />
            <input className="form-control  my-3" type="text" placeholder="Head Of Department" aria-label="default input example" onChange={(e) => setHod(e.target.value)} value={hod} required />
            <input className="form-control  my-3" type="text" placeholder="Email" aria-label="default input example" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className='col col-6'>
            <input className="form-control  my-3" type="text" placeholder="Phone" aria-label="default input example" onChange={(e) => setPhone(e.target.value)} value={phone} required />
            <input className="form-control  my-3" type="text" placeholder="No.of Students" aria-label="default input example" onChange={(e) => setNos(e.target.value)} value={nos} required />
            <input className="form-control  my-3" type="text" placeholder="Status" aria-label="default input example" onChange={(e) => setStatus(e.target.value)} value={status} required />
          </div>
        </div> */}
          <div className='row mx-3'>
          <div className='col col-6'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} required />
              <label>Departments'name</label>
            </div>
            <span className='span-tag'>{validname}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="" aria-label="default input example" onChange={(e) => setHod(e.target.value)} value={hod} required />
              <label>Head Of Department</label>
            </div>
            <span className='span-tag'>{validhod}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Email" aria-label="default input example" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <label>Email</label>
            </div>
            <span className='span-tag'>{validemail}</span>
          </div>
          <div className='col col-6'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Phone" aria-label="default input example" onChange={(e) => setPhone(e.target.value)} value={phone} required />
              <label>Phone</label>
            </div>
            <span className='span-tag'>{validphone}</span>
            <div className='form-floating mb-2'>
              <select className='form-select' onChange={(e) => setStatus(e.target.value)} value={status} required>
                <option value="" disabled>Choose any</option>
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
              <label>Status</label>
            </div>
          </div>
        </div>
        <p className='text-center'>
          <input type='submit' value="Update" className='btn btn-success my-3' />
        </p>
      </form>
    </>
  )
}

export default EditDepartment