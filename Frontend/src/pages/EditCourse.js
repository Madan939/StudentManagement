import React, { useContext, useEffect, useState } from 'react'
import { API, IMAGEURL } from '../components/CommonRoute';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';

const EditCourse = () => {
  const [showDepartment, setShowDepartment] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);
  const[storename,setstore]=useState('');
  const { id } = useParams();
  const { getToken, logOut } = useContext(AuthContext);
  let [validName, setValidName] = useState('');
  let [validPrice, setValidPrice] = useState('');
  const navigate = useNavigate();
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
        setShowDepartment(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };
  useEffect(() => {
    getAllDepartment();
    getAllCourse();
    if (id) {
      let token = getToken();
      if (!token) {
        logOut();
      }
      axios.get(`${API}course/editCourse/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setName(res.data.name);
          setstore(res.data.name);
          setPrice(res.data.price);
          setDuration(res.data.duration);
          setDepartment(res.data.department);
          setImageUrl(res.data.image);
          setDescription(res.data.description);
        })
    }

  }, [id, getToken, logOut]);
  const imageUpload = e => {
    setImageUrl(null)
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  };
  function updateCourse(e) {
    e.preventDefault();
    const nameregex = /^[A-Za-z\s]+$/;
    if (!nameregex.test(name)) {
      setValidName("Numbers are not allowed");
      return false;
    }
    const cname = allCourse.find(c => c.name.toLowerCase()=== name.toLowerCase());
    if (cname && storename!=name) {
      setValidName("Course name is already taken");
      return false;
    }
    setValidName("");
    const priceregex = /^-?\d+(\.\d+)?$/;
    if (!priceregex.test(price)) {
      setValidPrice("alphabets are not allowed");
      return false;
    }
    if (price < 0) {
      setValidPrice("Price should not be in minus");
      return false;
    }
    if (price == 0) {
      setValidPrice("Price should not be zero");
      return false;
    }
    setValidPrice("");
    const form = new FormData();
    form.append('id', id)
    form.append('name', name)
    form.append('duration', duration)
    form.append('price', price)
    form.append('department', department)
    form.append('description', description)
    if (image) {
      form.append('image', image)
    }
    else {
      form.append('image', imageUrl)
    }
    let token = getToken();
    if (!token) {
      logOut();
    }
    axios.post(`${API}course/updateCourse`, form, {
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
      {/* {console.log(imageUrl)} */}
      <Link to="/allcourse" className='btn btn-secondary btn-sm mx-2 mt-2'>Back</Link>
      <form className='mx-2 mb-1 shadow' onSubmit={updateCourse}>
        <p className='h3 text-center text-success'>Edit Course</p>
        <div className='row mx-3'>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Course Name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} />
              <label>Course Name</label>
            </div>
            <span className='span-tag'>{validName}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Course Price" aria-label="default input example" onChange={(e) => setPrice(e.target.value)} value={price} />
              <label>Course Price</label>
            </div>
            <span className='span-tag'>{validPrice}</span>
            <div className="form-floating mt-2">
              <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{ height: "200px" }} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
              <label>Description</label>
            </div>
          </div>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="" aria-label="default input example" onChange={(e) => setDuration(e.target.value)} value={duration} />
              <label>Duration</label>
            </div>
            <div className='form-floating'>
              <select
                className="form-select mt-3"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
              >
                <option value="" disabled>
                  select any Department
                </option>
                {showDepartment && showDepartment.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label>Department</label>
            </div>
            <div className="input-group mb-3 mt-3">
              <input type="file" className="form-control" id="inputGroupFile02" accept="image/*"
                onChange={imageUpload}
              />
            </div>

            <div className='my-2'>
              {imageUrl ? (
                <img src={`${IMAGEURL}${imageUrl}`} alt='' style={{ width: '200px', height: 'auto' }} />
              ) : (

                <img src={imagePreview} alt="" style={{ width: '200px', height: 'auto' }} />
              )}
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

export default EditCourse