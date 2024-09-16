import React from 'react'

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
                <p>{message}</p>
                <div className='d-flex justify-content-between w-75'>
                    <p className='confirm-p '><button className="btn btn-primary w-100" onClick={onConfirm}>Yes</button></p>
                    <p className='confirm-p'>
                    <button className="btn btn-secondary w-100" onClick={onCancel}>No</button>
                    </p>
                </div>               
            </div>
        </div>
    )
}

export default ConfirmationDialog