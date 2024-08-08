import React, { Fragment } from 'react';

const ModalDetail = ({ show, handleClose, riwayat }) => {
    if (!show) return null;
    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detail Riwayat</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            {riwayat.length > 0 ? (
                                <ul className="list-group">
                                    {riwayat.map((item, index) => (
                                        <li style={{ fontSize:'18px' }} key={index} className="list-group-item">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ fontSize:'18px' }}>No riwayat available.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalDetail;


