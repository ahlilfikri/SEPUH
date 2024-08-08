import React, { Fragment, useState } from 'react';

const ModalAdd = ({ show, handleClose, handleSave }) => {
    const [formData, setFormData] = useState({
        nama: '',
        usia: '',
        alamat: '',
        username: '',
        email: '',
        password: 'pasien123',
        riwayat: []
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

    const handleRiwayatChange = (index, value) => {
        const updatedRiwayat = [...formData.riwayat];
        updatedRiwayat[index] = value;
        setFormData({
            ...formData,
            riwayat: updatedRiwayat,
        });
        validateField(`riwayat_${index}`, value);
    };

    const handleAddRiwayat = () => {
        setFormData({
            ...formData,
            riwayat: [...formData.riwayat, '']
        });
    };

    const handleRemoveRiwayat = (index) => {
        const updatedRiwayat = formData.riwayat.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            riwayat: updatedRiwayat,
        });
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        const fieldNames = {
            nama: 'Nama',
            usia: 'Usia',
            alamat: 'Alamat',
            username: 'Username',
            email: 'Email'
        };

        const riwayatFieldName = 'Riwayat';

        if (name.startsWith('riwayat_')) {
            const [ , index ] = name.split('_');
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                newErrors[name] = 'Invalid email address';
            } else {
                delete newErrors[name];
            }
        } else if (!value) {
            newErrors[name] = `${fieldNames[name]} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama) newErrors.nama = 'Nama is required';
        if (!formData.usia) newErrors.usia = 'Usia is required';
        if (!formData.alamat) newErrors.alamat = 'Alamat is required';
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
            setFormData({
                nama: '',
                usia: '',
                alamat: '',
                username: '',
                email: '',
                password: 'pasien123',
                riwayat: []
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
                            <h5 className="modal-title">Tambah Pasien</h5>
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
                                    <label>Usia</label>
                                    <input
                                        type="number"
                                        name="usia"
                                        className="form-control"
                                        value={formData.usia}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.usia && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.usia}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Alamat</label>
                                    <input
                                        type="text"
                                        name="alamat"
                                        className="form-control"
                                        value={formData.alamat}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.alamat && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.alamat}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.username && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Riwayat</label>
                                    {formData.riwayat.map((item, index) => (
                                        <div key={index} className="d-flex mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={item}
                                                onChange={(e) => handleRiwayatChange(index, e.target.value)}
                                                placeholder="Riwayat"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger ml-2"
                                                onClick={() => handleRemoveRiwayat(index)}
                                            >
                                                Remove
                                            </button>
                                            {errors[`riwayat_${index}`] && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors[`riwayat_${index}`]}</div>}
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={handleAddRiwayat}>
                                        Add Riwayat
                                    </button>
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
