import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const login = JSON.parse(localStorage.getItem("USER"));
  return (
    <>
      {login.user.role === "Admin" ? (
        <>
          {/* <div className=" my-2">
            <div className=" mt-2 " style={{ height: "100vh" }}>
              <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex="0">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search students" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </div> */}
          <div className='home-card my-2 mx-3'>
            <Link to="/studentProfile" className='folder'>
              <p className='m-auto mt-2'>
                <img src="/assets/image/file.jpg" alt='' style={{ height: "90px", width: "80%" }} />
              </p>
              <p className='card-text'>Students</p>
            </Link>
            <Link to="/courseInfo" className='folder'>
              <p className='m-auto mt-2'>
                <img src="/assets/image/file.jpg" alt='' style={{ height: "90px", width: "80%" }} />
              </p>
              <p className='card-text'>Courses</p>
            </Link>
            <Link to="departmentList" className='folder'>
              <p className='m-auto mt-2'>
                <img src="/assets/image/file.jpg" alt='' style={{ height: "90px", width: "80%" }} />
              </p>
              <p className='card-text'>Departments</p>
            </Link>
            <Link to="/paymentdetails" className='folder'>
              <p className='m-auto mt-2'>
                <img src="/assets/image/file.jpg" alt='' style={{ height: "90px", width: "80%" }} />
              </p>
              <p className='card-text'>Payment Details</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='m-3'>
            <div className=''>
              <img src="/assets/image/pp2.jpg" className='w-100 ' alt='' style={{ height: "500px" }} />
              <p className='h6'></p>
            </div>
            <div className='border my-2'>
              <p className='h4 text-center text-primary'>What we believe</p>
              <div className='row my-2 mx-2'>
                <div className='col col-6 '>
                  <img src="/assets/image/pp.jpg" className='w-100' style={{ height: "350px" }} alt='' />
                  <p> The education system is a structured set of educational institutions and practices designed to facilitate the learning and development of individuals. It encompasses all the organized and systematic efforts to educate the population, from early childhood education to higher education and beyond.</p>
                </div>
                <div className='col col-6 '>
                  <img src="/assets/image/pp1.jpg" className='w-100' style={{ height: "350px" }} alt='' />
                  <p>The term education system generally refers to public schooling, not private schooling, and more commonly to kindergarten through high school programs. Schools or school districts are typically the smallest recognized form of “education system” and countries are the largest. States are also considered to have education systems.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default HomePage;
