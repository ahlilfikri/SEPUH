import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const ModalEdit = ({ show, handleClose, handleSave, data }) => {
    const [formData, setFormData] = useState({
        pasien: '',
        dokter: '',
        waktu: '',
    });

    const [errors, setErrors] = useState({});
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/pasien',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setPatients(response.data.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/dokter',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setDoctors(response.data.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchPatients();
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (data) {
            setFormData({
                pasien: data.pasien.nama || '',
                dokter: data.dokter.nama || '',
                waktu: data.waktu || '',
                id: data._id || '',
            });
        }
    }, [data]);

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
            pasien: 'Pasien',
            dokter: 'Dokter',
            waktu: 'Waktu',
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
        if (!formData.pasien) newErrors.pasien = 'Pasien is required';
        if (!formData.dokter) newErrors.dokter = 'Dokter is required';
        if (!formData.waktu) newErrors.waktu = 'Waktu is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleSave(formData);
        }
    };

    if (!show) return null;

    return (
        <Fragment>
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Jadwal</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            <form>
                                <div className="form-group">
                                    <label>Pasien</label>
                                    <select
                                        name="pasien"
                                        className="form-control"
                                        value={formData.pasien}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih Pasien</option>
                                        {patients.map((patient, value) => (
                                            <option key={value} value={patient.user.nama}>
                                                {patient.user.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.pasien && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.pasien}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Dokter</label>
                                    <select
                                        name="dokter"
                                        className="form-control"
                                        value={formData.dokter}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih Dokter</option>
                                        {doctors.map((doctor,value) => (
                                            <option key={value} value={doctor.nama}>
                                                {doctor.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.dokter && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.dokter}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Waktu</label>
                                    <input
                                        type="datetime-local"
                                        name="waktu"
                                        className="form-control"
                                        value={formData.waktu}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.waktu && <div className="text-danger mt-2" style={{ fontSize: '12px' }}>{errors.waktu}</div>}
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

export default ModalEdit;
