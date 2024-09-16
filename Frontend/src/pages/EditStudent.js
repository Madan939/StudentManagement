import React, { useContext, useEffect, useState } from 'react';
import { API, IMAGEURL } from '../components/CommonRoute';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';

const EditStudent = () => {
  const [allCourse, setAllCourse] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [advancefee, setAdfee] = useState('');
  const [course, setCourse] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [paddress, setPaddress] = useState('');
  const [taddress, setTaddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [Validname, setValidName] = useState('');
  const [Validemail, setValidEmail] = useState('');
  const [Validphone, setValidPhone] = useState('');
  const [Validadvancefee, setValidAdfee] = useState('');
  const [Validdob, setValidDob] = useState('');
  const [Validpaddress, setValidPaddress] = useState('');
  const [Validtaddress, setValidTaddress] = useState('');
  const { getToken, logOut } = useContext(AuthContext);
  const getAllCourse = () => {
    const token = getToken();
    if (!token) {
      logOut();
    }
    axios.get(`${API}course/getCourse`,{
      headers:{
        'Authorization':`Bearer ${token}`
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
    getAllCourse();
    if (id) {
      let token=getToken();
      if(!token){
        logOut();
      }
      axios.get(`${API}student/editStudent/${id}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
        .then(res => {
          const studentData = res.data;
          setName(studentData.name || '');
          setGrade(studentData.grade || '');
          setPhone(studentData.phone || '');
          setDob(studentData.dob || '');
          setTaddress(studentData.address.map((item) => item.taddress).join(', ') || '');
          setPaddress(studentData.address.map((item) => item.paddress).join(', ') || '');
          setEmail(studentData.email || '');
          setDescription(studentData.description || '');
          setGender(studentData.gender || '');
          setImageUrl(studentData.image || '');
          setCourse(studentData.course ||'');
          setAdfee(studentData.advancefee ||'');
        });
    }

  }, [id]);

  const imageUpload = (e) => {
    setImageUrl(null)
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  };
  function updateStudent(e) {
    e.preventDefault();
    const nameregex = /^[A-Za-z\s]+$/;
    const addressregex=/^[a-zA-Z0-9\s,.'-]{3,}$/;
    const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const todaydob = new Date().toISOString().split('T')[0]; 
    const phoneregex=/^[0-9-+]+$/;
    const advfeeregex = /^-?\d+(\.\d+)?$/;
    if(!nameregex.test(name)){
      setValidName("Name not Valid ");
      return false;
    }
    if(name.length<=2){
      setValidName("Invalid length of name ");
      return false;
    }
    setValidName("");
    if(!phoneregex.test(phone)){
      setValidPhone("invalid Format");
      return false;
    }
    if(phone.length<10){
      setValidPhone("Invalid length of phone numbers");
      return false;
    }
    setValidPhone("");
    if(todaydob<=dob){
      setValidDob("Invalid date of birth");
      return false;
    }
    setValidDob("");
    if(!emailregex.test(email)){
      setValidEmail("format doesnot match");
      return false;
    }
    setValidEmail("");
    if(!advfeeregex.test(advancefee)){
      setValidAdfee("Invalid Characters");
      return false;
    }
    if(advancefee<0){
      setValidAdfee("Amount cannot be less than zero");
      return false;
    }
    setValidAdfee("");
    if(!addressregex.test(paddress)){
      setValidPaddress("Invalid permanent address");
      return false;
    }
    if(paddress.length<3){
      setValidPaddress("Invalid length of permanent address ");
      return false;
    }
    setValidPaddress("");
    if(!addressregex.test(taddress)){
      setValidTaddress("Invalid temporary address");
      return false;
    }
    if(taddress.length<3){
      setValidTaddress("Invalid length of temporary address ");
      return false;
    }
    setValidTaddress("");
  
    let form = new FormData();
    form.append('id', id);
    form.append('name', name);
    form.append('grade', grade);
    form.append('phone', Number(phone));
    form.append('email', email);
    form.append('dob', dob);
    form.append('taddress', taddress);
    form.append('paddress', paddress);
    if (image) {
      form.append('image', image);
    }
    form.append('image', imageUrl);
    form.append('gender', gender);
    form.append('course', course);
    form.append('advancefee', advancefee);
    form.append('description', description);
    const token = getToken();
    if (!token) {
      logOut();
    }
    axios.post(`${API}student/updateStudent`, form,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res => {
        toast.success(res.data.message);
        navigate('/allStudent')
      }))
      .catch((err => {
        console.log(err)
      }))
  }
  return (
    <>
    <Link to="/allStudent" className='btn btn-secondary btn-sm mx-2 mt-2 mb-1'>Back...</Link>
      <form className='mx-2 my-3 shadow' onSubmit={updateStudent}>
        <p className='h3 text-center text-primary'>Edit Student</p>
        {/* <div className='row mx-2'>
          <div className='col'>
            <input
              className="form-control my-3"
              type="text"
              placeholder="Student Name"
              aria-label="default input example"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              className="form-control my-3"
              type="text"
              placeholder="Grade"
              aria-label="default input example"
              onChange={(e) => setGrade(e.target.value)}
              value={grade}
            />
            <input
              className="form-control my-3"
              type="email"
              placeholder="Email"
              aria-label="default input example"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Gender:</label>
            <input
              className="form-check-input mx-1"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'Male'}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">Male</label>
            <input
              className="form-check-input mx-1"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'Female'}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">Female</label>
            <input
              className="form-check-input mx-1"
              type="radio"
              name="exampleRadios"
              id="exampleRadios3"
              value="others"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === 'others'}
            />
            <label className="form-check-label" htmlFor="exampleRadios3">Others</label>
            <div className="input-group mb-3 mt-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                accept="image/*"
                onChange={imageUpload}
              />
            </div>
            {imageUrl ? (
              <img src={`${IMAGEURL}${imageUrl}`} alt='' style={{ width: '200px', height: '190px' }} />
            ) : (
              <img src={imagePreview} alt="" style={{ width: '200px', height: '190px' }} />
            )}
          </div>
          <div className='col'>
            <input
              className="form-control my-3"
              type="text"
              placeholder="Phone"
              aria-label="default input example"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <input
              className="form-control my-3"
              type="date"
              placeholder="Dob"
              aria-label="default input example"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
            <input
              className="form-control  my-3"
              type="text"
              placeholder="Advance Fee"
              aria-label="default input example"
              onChange={(e) => setAdfee(e.target.value)}
              value={advancefee}
            />
            <input
              className="form-control my-3"
              type="text"
              placeholder="Permanent Address"
              aria-label="default input example"
              onChange={(e) => setPaddress(e.target.value)}
              value={paddress}
            />
            <input
              className="form-control my-3"
              type="text"
              placeholder="Temporary Address"
              aria-label="default input example"
              onChange={(e) => setTaddress(e.target.value)}
              value={taddress}
            />
            <select
              className="form-select my-2"
              aria-label="Small select example"
              onChange={(e) => setCourse(e.target.value)}
              value={course}
            >
              <option value="" disabled>Course</option>
              {allCourse && allCourse.map((item) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))}
            </select>
            <div className="mt-2">
              <textarea
                className="form-control"
                placeholder="Write something about student"
                id="floatingTextarea2"
                style={{ height: "150px" }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
          </div>
        </div> */}
         <div className='row mx-2'>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Student Name" aria-label="default input example" onChange={(e) => setName(e.target.value)} value={name} required />
              <label>Student Name</label>
            </div>
            <span className='span-tag'>{Validname}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Grade" aria-label="default input example" onChange={(e) => setGrade(e.target.value)} value={grade} required />
              <label>Student Grade</label>
            </div>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="email" placeholder="Email" aria-label="default input example" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <label>Student Email</label>
            </div>
            <span className='span-tag'>{Validemail}</span>
            <label>Gender:</label>
            <input className="form-check-input mx-1 " type="radio" name="exampleRadios" id="exampleRadios1" value="Male" onChange={(e) => setGender(e.target.value)} checked={gender === 'Male'} />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Male
            </label>
            <input className="form-check-input mx-1" type="radio" name="exampleRadios" id="exampleRadios2" value="Female" onChange={(e) => setGender(e.target.value)} checked={gender === 'Female'} />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Female
            </label>
            <input className="form-check-input mx-1" type="radio" name="exampleRadios" id="exampleRadios3" value="others" onChange={(e) => setGender(e.target.value)} checked={gender === 'others'} />
            <label className="form-check-label" htmlFor="exampleRadios3">
              others
            </label>
            <div className="form-floating mb-3 mt-3">
              <input type="file" className="form-control" id="inputGroupFile02" accept="image/*"
                onChange={imageUpload}
                
              />
              <label>Photo</label>
            </div>
           {imageUrl ? (
              <img src={`${IMAGEURL}${imageUrl}`} alt='' style={{ width: '200px', height: '190px' }} />
             ) : (
              <img src={imagePreview} alt="" style={{ width: '200px', height: '190px' }} />
             )}
          </div>
          <div className='col'>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Phone" aria-label="default input example" onChange={(e) => setPhone(e.target.value)} value={phone} required />
              <label>Phone</label>
            </div>
            <span className='span-tag'>{Validphone}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="date" placeholder="Dob" aria-label="default input example" onChange={(e) => setDob(e.target.value)} value={dob} required />
              <label>Date of birth</label>
            </div>
            <span className='span-tag'>{Validdob}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Advance Fee" aria-label="default input example" onChange={(e) => setAdfee(e.target.value)} value={advancefee} required />
              <label>Advance Fee</label>
            </div>
            <span className='span-tag'>{Validadvancefee}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Permanent Address" aria-label="default input example" onChange={(e) => setPaddress(e.target.value)} value={paddress} required />
              <label>Permanent Address</label>
            </div>
            <span className='span-tag'>{Validpaddress}</span>
            <div className='form-floating mb-2'>
              <input className="form-control  my-3" type="text" placeholder="Temporary Address" aria-label="default input example" onChange={(e) => setTaddress(e.target.value)} value={taddress} required />
              <label>Temporary Address</label>
            </div>
            <span className='span-tag'>{Validtaddress}</span>
            <div className='form-floating'>
              <select className="form-control my-2" aria-label="Small select example" onChange={(e) => setCourse(e.target.value)} value={course}>
                <option value="" disabled>Choose any</option>
                {allCourse && allCourse.map((item) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
              <label>Course</label>
            </div>
            <div className="form-floating mt-2">
              <textarea className="form-control" placeholder="Write something about student" id="floatingTextarea2" style={{ height: "150px" }} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
              <label>Something About student...</label>
            </div>
          </div>
        </div> 
        <p className='text-center'>
          <input type='submit' value="Update" className='btn btn-success my-3' />
        </p>
      </form>
    </>
  );
}

export default EditStudent;
