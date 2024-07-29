import React, { Fragment } from 'react';
import Gambar1 from '/warning.png';
import Gambar2 from '/success.png';

const Modal = ({ data, status, onClose }) => {
    return (
        <Fragment>
            <div className="modal d-block loading-modal" tabIndex="1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center">
                        <div className="modal-body p-4 position-relative">
                        <button type="button" style={{ border : 'none', fontSize:'30px' }} className="close position-absolute top-0 end-0 m-3" aria-label="Close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {status === 'error' && <img src={Gambar1} className="img-fluid" style={{ width: '250px' }} alt="Error" />}
                            {status === 'success' && <img src={Gambar2} className="img-fluid" style={{ width: '250px' }} alt="Success" />}
                            <p>{data}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default Modal;
