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
import Pagination from '../../../shared/pagination'; 

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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}user/dokter/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    nama: debouncedFilters.nama,
                    spesialisasi: debouncedFilters.spesialisasi,
                    alamat: debouncedFilters.alamat,
                    page, limit: 20
                }
            });
            if (!response.data.data.data) {
                setError('Tidak dapat mengambil data, coba muat ulang laman');
            } else {
                setData(response.data.data.data);
                setTotalPages(response.data.data.totalPages);
                setCurrentPage(page);
                setLoading(false);
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [debouncedFilters, token, currentPage]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setCurrentPage(1);
    };

    const handleEditClick = (doctor) => {
        setSelectedDoctor({ ...doctor });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedDoctor) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}user/all/${updatedDoctor.id}`, updatedDoctor, {
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
            const response = await axios.post(`${port}user/all`, newDoctor, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.status === 500) {
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
            const response = await axios.delete(`${port}user/all/${selectedDoctor._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 500) {
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
        setSelectedDoctor(null);
    };

    const handleCloseAddDoctorModal = () => {
        setShowAddDoctorModal(false);
        setError('');
        setSuccess('');
    };

    const handleScheduleClick = (schedule) => {                
        setSelectedSchedule(schedule);
        setShowScheduleModal(true);
    };

    const handleCloseScheduleModal = () => {
        setShowScheduleModal(false);
        setSelectedSchedule([]);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedDoctor(null);
        setError('');
        setSuccess('');
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
        fetchData(page);
    };
    
    return (
        <Fragment>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <h1 className="mb-4">Filter</h1>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-3">
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
                                <div className="col-12 col-sm-6 col-md-3">
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
                                <div className="col-12 col-sm-6 col-md-3">
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
                                <div className="col-12 col-sm-6 col-md-3">
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
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Usia</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Username</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Email</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Spesialisasi</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Alamat</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Jadwal Kerja</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        <tr>
                                        </tr>
                                    ) : (
                                        data.map((doctor, index) => (
                                            <tr key={doctor._id}>
                                                <td style={{ textAlign: 'center', fontWeight: 'normal', fontSize: '18px'}}>{index + 1 + (currentPage - 1) * 20}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.nama}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.usia}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.username}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.email}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.spesialisasi}</td>
                                                <td style={{ fontWeight: 'normal', fontSize: '18px' }}>{doctor.alamat}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <FaFileAlt style={{ cursor: 'pointer',fontWeight: 'normal', fontSize: '18px' }} onClick={() => handleScheduleClick(doctor.jadwal)} />
                                                </td>
                                                <td style={{ textAlign: 'center',fontWeight: 'normal', fontSize: '18px' }}>
                                                    <FaEdit
                                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                                        onClick={() => handleEditClick(doctor)}
                                                    />
                                                    <FaTrashAlt
                                                        style={{ cursor: 'pointer', color: '#B22222' }}
                                                        onClick={() => handleDeleteClick(doctor)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="py-1"></div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                        <div className="py-3"></div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            {showEditModal && (
                <EditModal
                    show={showEditModal}
                    handleClose={handleCloseModal}
                    schedule={selectedSchedule}
                    handleSave={handleSaveChanges}
                    data = {selectedDoctor}
                />
            )}
            {showAddDoctorModal && (
                <AddDoctorModal
                    show={showAddDoctorModal}
                    handleClose={handleCloseAddDoctorModal}
                    handleSave={handleSaveNewDoctor}
                />
            )}
            {showScheduleModal && (
                <ScheduleModal
                    show={showScheduleModal}
                    handleClose={handleCloseScheduleModal}
                    schedule={selectedSchedule}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    handleDelete={handleDeleteDoctor}
                    data={selectedDoctor?.nama}
                />
            )}
        </Fragment>
    );
};

export default Dokter;
