import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../components/CommonRoute';
import ConfirmationDialog from '../components/ConfirmationDialog';

const Access = () => {
    const [allUser, setAllUser] = useState([]);
    const login = JSON.parse(localStorage.getItem("USER"));
    const [ids, setIds] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const getAllUser = () => {
        axios.get(`${API}user/getUser`)
            .then(res => {
                setAllUser(res.data);
            })
            .catch(err => {
                alert("No user found");
                console.error(err);
            });
    };
    function handleAccess(id) {
        setIds(id);
        setShowDialog(true);
    }
    const handleConfirm = () => {
        if (ids) {
            handleRoleChange(ids);
        }
        setShowDialog(false);
    };

    const handleCancel = () => {
        setIds(null);
        setShowDialog(false);
    };

    const handleRoleChange = (userId) => {
        let data = {
            admin_id: login.user._id,
            user_id: userId,
        }
        axios.post(`${API}user/updateRole`, data)
            .then(() => {
                localStorage.removeItem("USER")
                window.location.reload()
            })
            .catch(err => {
                alert("Failed to update role");
                console.error(err);
            });
    };

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <>
            {allUser.length > 0 ? (
                <>
                    <p className='mt-3 mb-2 text-primary h4'>List of Users</p>
                    <table className='container-fluid table text-center border'>
                        <thead className='table-light'>
                            <tr>
                                <th>SN</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Settings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUser.map((item, idx) => (
                                <tr key={item._id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={item.role === "Admin"}
                                            onChange={() => handleAccess(item._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showDialog && (
                        <ConfirmationDialog
                            message="Are you sure you want to give admin access to this user?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
                </>
            ) : (
                <p>No users found</p>
            )}
        </>
    );
};

export default Access;
