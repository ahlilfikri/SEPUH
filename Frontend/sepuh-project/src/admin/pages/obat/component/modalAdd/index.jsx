import React, { Fragment, useState } from 'react';

const ModalAdd = ({ show, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        nama: '',
        stok: '',
        harga: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        const fieldNames = {
            nama: 'Nama',
            stok: 'Stok',
            harga: 'Harga',
        };

        if (!value) {
            newErrors[name] = `${fieldNames[name]} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama) newErrors.nama = 'Nama is required';
        if (!formData.stok) newErrors.stok = 'Stok is required';
        if (!formData.harga) newErrors.harga = 'Harga is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
            setFormData({
                nama: '',
                stok: '',
                harga: '',
            });
            setErrors({});
        }
    };

    if (!show) return null;

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tambah Obat</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label>Nama</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        className="form-control"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.nama && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.nama}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Stok</label>
                                    <input
                                        type="number"
                                        name="stok"
                                        className="form-control"
                                        value={formData.stok}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.stok && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.stok}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Harga</label>
                                    <input
                                        type="number"
                                        name="harga"
                                        className="form-control"
                                        value={formData.harga}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.harga && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.harga}</div>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </Fragment>
    );
};

export default ModalAdd;
