import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';

const Header = () => {
    const name = JSON.parse(localStorage.getItem("USER"));
    const [showDialog, setShowDialog] = useState(false);

    const handleLogOutClick = () => {
        setShowDialog(true);
    };

    const handleConfirm = () => {
        setShowDialog(false);
        localStorage.removeItem("USER");
        window.location.reload(); 
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    return (
        <>
            {name && name.user && name.user.role === "Admin" ? (
                <>
                    <header className='header p-3 shadow'>
                        <div className='header-nav1'></div>
                        <div className='header-nav2'>
                            <strong className=''>{name.user.name}</strong>
                        </div>
                    </header>
                </>
            ) : (
                <>
                    <header className='header bg-primary p-3 align-items-center justify-content-between'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <p className='h2 mx-2'><i className="grad fa-solid fa-graduation-cap fa-lg text-light"></i></p>
                            <p className='h2 text-light'>EDS</p>
                        </div>
                        <div className='header-nav1'>
                            <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Home</Link></div>
                            <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Notices</Link></div>
                            <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Results</Link></div>
                            <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Registration Form</Link></div>
                            <div className='h5 mx-2'><Link className='text-light text-decoration-none' to="/">Scholarships Form</Link></div>
                        </div>
                        <div className='header-nav2 text-light d-flex'>
                            <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <i className="fa-solid fa-bars fa-xl text-light"></i>
                            </button>
                            <div className="offcanvas-1 offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div className="mt-2 d-flex justify-content-between">
                                    <p className='w-25'>
                                        <button type="button" className="btn btn-light" data-bs-dismiss="offcanvas" aria-label="Close">
                                            <i className="fa-solid fa-arrow-left fa-lg text-secondary"></i>
                                        </button>
                                    </p>
                                    <p className='w-75 text-center h2 text-primary'>
                                        {name && name.user && name.user.name}
                                    </p>
                                </div>
                                <hr />
                                <div className="users-offcanvas">
                                    <div className='px-3'>Profile</div>
                                    <div className='px-3'>Account Centre</div>
                                    <div className='px-3'>Your Form</div>
                                    <div className='px-3'>Academic Information</div>
                                    <div className='px-3'>Reports</div>
                                    <div className='px-3'>Help</div>
                                    <div className='px-3'>Privacy Centre</div>
                                    <div className='px-3'>Account Status</div>
                                    <div className='px-3' onClick={handleLogOutClick}>Log Out</div>
                                    {showDialog && (
                                        <ConfirmationDialog
                                            message="Are you sure you want to log out?"
                                            onConfirm={handleConfirm}
                                            onCancel={handleCancel}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                </>
            )}
        </>
    );
};

export default Header;
