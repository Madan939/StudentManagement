import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { API } from '../components/CommonRoute';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const AddCourse = () => {
  const [showDepartment, setShowDepartment] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);
  let [validName, setValidName] = useState('');
  let [validPrice, setValidPrice] = useState('');
  const navigate = useNavigate();
  const { getToken, logOut } = useContext(AuthContext);
  const [allCourse, setAllCourse] = useState([]);
  const getAllCourse = () => {
    let token = getToken();
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
  const getAllDepartment = async () => {
    await axios.get(`${API}department/getDepartment`)
      .then(res => {
        // console.log(res.data)
        setShowDepartment(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };
  useEffect(() => {
    getAllDepartment();
    getAllCourse();
  }, []);
  const imageUpload = e => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  };
  function courseForm(e) {
    e.preventDefault();
    const nameregex = /^[A-Za-z\s]+$/;
    if (!nameregex.test(name)) {
      setValidName("Numbers are not allowed");
      return false;
    }
   
    const priceregex = /^-?\d+(\.\d+)?$/;
    if (!priceregex.test(price)) {
      setValidPrice("alphabets are not allowed");
      return false;
    }
    const cname = allCourse.find(c => c.name.toLowerCase()=== name.toLowerCase());
    if (cname) {
      setValidName("Course name is already taken");
      return false;
    }
    if (price < 0) {
      setValidPrice("Price should not be in minus");
      return false;
    }
    if (price === 0) {
      setValidPrice("Price should not be zero");
      return false;
    }
    setValidName("");
    setValidPrice("");
    let form = new FormData();
    form.append('name', name);
    form.append('price', Number(price));
    form.append('duration', duration)
    form.append('description', description);
    form.append('department', department);
    form.append('image', image);
    const token = getToken();
    if (!token) {
      logOut();
    }
    axios.post(`${API}course/addCourse`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        toast.success(res.data.message);
        navigate('/allCourse')
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <>
      <form className='mx-2 my-4 shadow' onSubmit={courseForm}>
        <p className='h3 text-center text-primary'>Add Course</p>
        <div className='row mx-3'>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Course Name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} required />
              <label htmlFor=''>Course Name</label>
            </div>
            <span className='span-tag'>{validName}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Course Price" aria-label="default input example" onChange={(e) => setPrice(e.target.value)} value={price} required />
              <label htmlFor=''>Course Price</label>
            </div>
            <span className='span-tag'>{validPrice}</span>
            <div className="form-floating mt-2">
              <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{ height: "200px" }} onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
              <label>Description</label>
            </div>
          </div>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Course Duration" aria-label="default input example" onChange={(e) => setDuration(e.target.value)} value={duration} required />
              <label htmlFor=''>Duration</label>
            </div>
            <div class="form-floating">
              <select
                id="floatingSelectGrid"
                className="form-select mt-3"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                required
              >
                <option value="" disabled>Choose any Department</option>
                {showDepartment && showDepartment.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelectGrid">Department</label>
            </div>
            <div className="input-group mb-3 mt-3">
              <input type="file" className="form-control" id="inputGroupFile02" accept="image/*"
                onChange={imageUpload}
              />
            </div>
            {imagePreview &&
              <div className='my-2'>
                <img src={imagePreview} alt="" style={{ width: '200px', height: 'auto' }} />
              </div>}
          </div>
        </div>
        <p className='text-center'>
          <input type='submit' value="Submit" className='btn btn-primary my-3' />
        </p>
      </form>
    </>
  )
}

export default AddCourse