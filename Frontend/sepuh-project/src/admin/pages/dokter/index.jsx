import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFileAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddDoctorModal from './component/modalAdd';
import ScheduleModal from './component/modalDetail';
import DeleteModal from '../../../shared/modalDelete';
import useDebounce from '../../../shared/debouncedValue';

const Dokter = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [filters, setFilters] = useState({ nama: '', spesialisasi: '', alamat: '' });
    const debouncedFilters = useDebounce(filters, 1500);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}dokter/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    nama: debouncedFilters.nama,
                    spesialisasi: debouncedFilters.spesialisasi,
                    alamat: debouncedFilters.alamat
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data, coba muat ulang laman');
            } else {
                setData(response.data.data.data);
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [debouncedFilters, token]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = (doctor) => {
        setSelectedDoctor({ ...doctor });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedDoctor) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}dokter/${updatedDoctor.id}`, updatedDoctor, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menyimpan perubahan, coba lagi');
            } else {
                setSuccess('Data berhasil diperbarui');
            }
        } catch (error) {
            setError('Tidak dapat menyimpan perubahan, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleAddDoctorClick = () => {
        setShowAddDoctorModal(true);
    };

    const handleSaveNewDoctor = async (newDoctor) => {
        setShowAddDoctorModal(false);
        setLoading(true);
        try {
            const response = await axios.post(`${port}dokter`, newDoctor, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status == 500) {
                setError('Tidak dapat menambahkan dokter, coba lagi');
            } else {
                setSuccess('Dokter berhasil ditambahkan');
            }
        } catch (error) {
            setError('Tidak dapat menambahkan dokter, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleDeleteClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowDeleteModal(true);
    };

    const handleDeleteDoctor = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${port}dokter/${selectedDoctor._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status == 500) {
                setError('Tidak dapat menghapus dokter, coba lagi');
            } else {
                setSuccess('Dokter berhasil dihapus');
            }
        } catch (error) {
            setError('Tidak dapat menghapus dokter, coba lagi');
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            fetchData();
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setError('');
        setSuccess('');
    };

    const handleCloseAddDoctorModal = () => {
        setShowAddDoctorModal(false);
    };

    const handleScheduleClick = (schedule) => {
        setSelectedSchedule(schedule);
        setShowScheduleModal(true);
    };

    const handleCloseScheduleModal = () => {
        setShowScheduleModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <Fragment>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <h1 className="mb-4">Filter</h1>
                            <div className="row">
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="nama"
                                            className="form-control"
                                            placeholder="Nama"
                                            value={filters.nama}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="spesialisasi"
                                            className="form-control"
                                            placeholder="Spesialisasi"
                                            value={filters.spesialisasi}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="alamat"
                                            className="form-control"
                                            placeholder="Alamat"
                                            value={filters.alamat}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success" onClick={fetchData}>Filter</button>
                                        <button className="btn btn-danger" onClick={() => setFilters({ nama: '', spesialisasi: '', alamat: '' })}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Dokter</p>
                    <button className="btn btn-success" onClick={handleAddDoctorClick}>Tambah Dokter</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Nama</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Spesialisasi</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Alamat</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Jadwal Kerja</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error === '' && data.map((dokter, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: '18px', fontWeight: '400', maxWidth: '10%' }}>{index + 1}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400', maxWidth: '20%' }}>{dokter.nama}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400', maxWidth: '30%' }}>{dokter.spesialisasi}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400', maxWidth: '30%' }}>{dokter.alamat}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400', maxWidth: '10%' }} className="text-center">
                                                <div className="btn" onClick={() => handleScheduleClick(dokter.jadwal)}>
                                                    <FaFileAlt style={{ color: '#FFD700', cursor: 'pointer' }} />
                                                </div>
                                            </td>
                                            <td style={{ fontSize: '18px', maxWidth: '5%' }} className="text-center">
                                                <div className="btn m-1" onClick={() => handleEditClick(dokter)}>
                                                    <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                </div>
                                                <FaTrashAlt className='m-1' style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(dokter)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleCloseModal} />}
            {success && <Modal data={success} status={'success'} onClose={handleCloseModal} />}
            <EditModal
                show={showEditModal}
                handleClose={handleCloseModal}
                data={selectedDoctor}
                handleSave={handleSaveChanges}
            />
            <AddDoctorModal
                show={showAddDoctorModal}
                handleClose={handleCloseAddDoctorModal}
                handleSave={handleSaveNewDoctor}
            />
            <ScheduleModal
                show={showScheduleModal}
                handleClose={handleCloseScheduleModal}
                schedule={selectedSchedule}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteDoctor}
                data={selectedDoctor?.nama}
            />
        </Fragment>
    );
};

export default Dokter;
