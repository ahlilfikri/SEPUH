import React, { Fragment } from 'react';
import Gambar1 from '/warning.png';
import Gambar2 from '/success.png';

const Modal = ({data, status}) => {
    return (
        <Fragment>
            <div className="modal d-block loading-modal" tabIndex="1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center">
                        <div className="modal-body p-4">
                            {status == 'error' && <img src={Gambar1} className="img-fluid" style={{ width:'250px' }} alt="Loading" />}
                            {status == 'success' && <img src={Gambar2} className="img-fluid" style={{ width:'250px' }} alt="Loading" />}
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
