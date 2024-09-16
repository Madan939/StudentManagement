import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import ConfirmationDialog from './ConfirmationDialog';

const Sidebar = () => {
    const [openSection, setOpenSection] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const location = useLocation();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/allStudent") || path.includes("/addStudent") || path.includes("/studentProfile")) {
            setOpenSection('students');
        } else if (path.includes("/allCourse") || path.includes("/addCourse") || path.includes("/courseInfo")) {
            setOpenSection('courses');
        } else if (path.includes("/departmentList") || path.includes("/addDepartment")) {
            setOpenSection('department');
        } else if (path.includes("/addpayments") || path.includes("/updatepayment") || path.includes("/paymentDetails")) {
            setOpenSection('accounts');
        } else {
            setOpenSection(null);
        }
    }, [location]);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handleLogOutClick = () => {
        setShowDialog(true);
    };

    const handleConfirm = () => {
        setShowDialog(false);
        logOut();
        window.location.reload();
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <>
            <div className='sidebar'>
                <div className='d-flex mt-2 justify-content-center w-100'>
                    <p className='h2 mx-2'><i className="grad fa-solid text-primary fa-graduation-cap fa-lg"></i></p>
                    <p className='h2 text-primary'>EDS</p>
                </div>
                <br />
                <NavLink  to="/"className='Linkss text-decoration-none d-flex w-100 h6 justify-content-between'>
                    <div className='d-flex container w-100'>
                        <p className='mx-2'><i className="fa-solid fa-house"></i></p>
                        <p  className=' text-decoration-none w-100'>Homepage</p>
                    </div>
                </NavLink>
                <NavLink to="/access" className='Linkss text-decoration-none d-flex w-100 h6 justify-content-between'>
                    <div className='d-flex container w-100'>
                        <p className='mx-2'><i className="fa-solid fa-universal-access"></i></p>
                        <p  className='h6  w-100'>Access</p>
                    </div>
                </NavLink>
                {/* <div className='profe d-flex w-100 h6 justify-content-between'>
                    <div className='d-flex container w-100'>
                        <p className='mx-2'><i className="fa-solid fa-file-invoice"></i></p>
                        <Link to="/accounts" className='Links text-decoration-none w-100'>Accounts</Link>
                    </div>
                </div> */}
                <div>
                    <div className="profe d-flex w-100 h6 justify-content-between" onClick={() => toggleSection('students')} role="button">
                        <div className='d-flex container'>
                            <p><i className="fa-solid fa-graduation-cap mx-2"></i></p>
                            <p className="">Students</p>
                        </div>
                        <div>
                            <i className={`fa-solid ${openSection === 'students' ? 'fa-chevron-down' : 'fa-less-than'}`}></i>
                        </div>
                    </div>
                    <div className={`collapse ${openSection === 'students' ? 'show' : ''}`} id="collapseExample1">
                        <div className="coll-exg container mx-3">
                            <p><NavLink to="/allStudent" className='Links text-decoration-none'>All Students</NavLink></p>
                            <p><NavLink to="/addStudent" className='Links text-decoration-none'>Add Student</NavLink></p>
                            <p><NavLink to="/studentProfile" className='Links text-decoration-none'>Student Profile</NavLink></p>
                        </div>
                    </div>
                </div>
            
                <div>
                    <div className="profe d-flex w-100 h6 justify-content-between" onClick={() => toggleSection('courses')} role="button">
                        <div className='d-flex container'>
                            <p className='mx-2'><i className="fa-regular fa-newspaper"></i></p>
                            <p className="">Courses</p>
                        </div>
                        <div>
                            <i className={`fa-solid ${openSection === 'courses' ? 'fa-chevron-down' : 'fa-less-than'}`}></i>
                        </div>
                    </div>
                    <div className={`collapse ${openSection === 'courses' ? 'show' : ''}`} id="collapseExample2">
                        <div className="coll-exg mx-3 container">
                            <p><NavLink to="/allCourse" className='Links text-decoration-none'>All Courses</NavLink></p>
                            <p><NavLink to="/addCourse" className='Links text-decoration-none'>Add Course</NavLink></p>
                            <p><NavLink to="/courseInfo" className='Links text-decoration-none'>Course Info</NavLink></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="profe d-flex w-100 h6 justify-content-between" onClick={() => toggleSection('department')} role="button">
                        <div className='d-flex container'>
                            <p className='mx-2'><i className="fa-solid fa-medal"></i></p>
                            <p className="">Department</p>
                        </div>
                        <div>
                            <i className={`fa-solid ${openSection === 'department' ? 'fa-chevron-down' : 'fa-less-than'}`}></i>
                        </div>
                    </div>
                    <div className={`collapse ${openSection === 'department' ? 'show' : ''}`} id="collapseExample3">
                        <div className="coll-exg mx-3 container">
                            <p><NavLink to="/departmentList" className='Links text-decoration-none'>Department Lists</NavLink></p>
                            <p><NavLink to="/addDepartment" className='Links text-decoration-none'>Add Department</NavLink></p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="profe d-flex w-100 h6 justify-content-between" onClick={() => toggleSection('accounts')} role="button">
                        <div className='d-flex container'>
                            <p className='mx-2'><i className="fa-solid fa-file-invoice"></i></p>
                            <p className="">Accounts</p>
                        </div>
                        <div>
                            <i className={`fa-solid ${openSection === 'accounts' ? 'fa-chevron-down' : 'fa-less-than'}`}></i>
                        </div>
                    </div>
                    <div className={`collapse ${openSection === 'accounts' ? 'show' : ''}`} id="collapseExample2">
                        <div className="coll-exg mx-3 container">
                            <p><NavLink to="/addpayments" className='Links text-decoration-none'>Add Payment</NavLink></p>
                            <p><NavLink to="/updatepayment" className='Links text-decoration-none'>Update Payment</NavLink></p>
                            <p><NavLink to="/paymentDetails" className='Links text-decoration-none'>Payment Details</NavLink></p>
                        </div>
                    </div>
                </div>
                <div className="profe d-flex w-100 h6 justify-content-between" onClick={handleLogOutClick}>
                    <div className='d-flex container'>
                        <p className='mx-2'><i className="fa-solid fa-right-from-bracket"></i></p>
                        <p>Log Out</p>
                    </div>
                </div>
            </div>
            {showDialog && (
                <ConfirmationDialog
                    message="Are you sure you want to log out?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default Sidebar;

