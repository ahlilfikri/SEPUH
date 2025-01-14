import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddJadwalModal from './component/modalAdd';
import DeleteModal from '../../../shared/modalDelete';
import useDebounce from '../../../shared/debouncedValue';
import Pagination from '../../../shared/pagination'; 

const Jadwal = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const token = sessionStorage.getItem('token');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    const [showAddJadwalModal, setShowAddJadwalModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({
        pasien: '',
        dokter: '',
        status: ''
    });
    const debouncedFilters = useDebounce(filters, 1500);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 10; 

    const fetchData = async () => {
        setLoading(true);
        try {            
            const response = await axios.get(`${port}jadwal/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    pasien: debouncedFilters.pasien,
                    dokter: debouncedFilters.dokter,
                    status: debouncedFilters.status,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });

            if (!response.data.data) {
                setError('Tidak dapat mengambil data, coba muat ulang laman');
            } else {
                setData(response.data.data.data);
                setTotalPages(response.data.data.totalPages); 
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [debouncedFilters, token, currentPage]);

    const handleEditClick = (jadwal) => {
        setSelectedJadwal({ ...jadwal });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedJadwal) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}jadwal/${updatedJadwal.id}`, updatedJadwal, {
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

    const handleAddJadwalClick = () => {
        setShowAddJadwalModal(true);
    };

    const handleSaveNewJadwal = async (newJadwal) => {        
        setShowAddJadwalModal(false);
        setLoading(true);
        try {
            const response = await axios.post(`${port}jadwal`, newJadwal, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.status === 500) {
                setError('Tidak dapat menambahkan jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil ditambahkan');
            }
        } catch (error) {
            console.error('Add Error:', error);
            setError('Tidak dapat menambahkan jadwal, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleDeleteClick = (jadwal) => {
        setSelectedJadwal(jadwal);
        setShowDeleteModal(true);
    };

    const handleDeleteJadwal = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${port}jadwal/${selectedJadwal._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.status === 500) {
                setError('Tidak dapat menghapus jadwal, coba lagi');
            } else {
                setSuccess('Jadwal berhasil dihapus');
            }
        } catch (error) {
            console.error('Delete Error:', error);
            setError('Tidak dapat menghapus jadwal, coba lagi');
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

    const handleCloseAddJadwalModal = () => {
        setShowAddJadwalModal(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleInputChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleClearFilters = () => {
        setFilters({ pasien: '', dokter: '', status: '' });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                                        <input type="text" className="form-control" placeholder="Pasien" name="pasien" value={filters.pasien} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Dokter" name="dokter" value={filters.dokter} onChange={handleInputChange} />
                                    </div>
                                </div>
                                {/* <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <select className="form-control" name="status" value={filters.status} onChange={handleInputChange}>
                                            <option value="">Pilih Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Finished">Finished</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success" onClick={() => fetchData()}>Filter</button>
                                        <button className="btn btn-danger" onClick={handleClearFilters}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Jadwal</p>
                    <button className="btn btn-success" onClick={handleAddJadwalClick}>Tambah Jadwal</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Pasien</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Dokter</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Waktu</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Status</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <Loading />
                                            </td>
                                        </tr>
                                    ) : (
                                        data.length > 0 ? (
                                            data.map((jadwal, index) => (
                                                <tr key={jadwal._id}>
                                                    <th scope="row" style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>{index + 1}</th>
                                                    <td style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>{jadwal?.pasien?.nama}</td>
                                                    <td style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>{jadwal?.dokter?.nama}</td>
                                                    <td style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>{jadwal?.waktu?.hari}, {jadwal?.waktu?.jamMulai}-{jadwal?.waktu?.jamSelesai}</td>
                                                    <td style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>{jadwal?.status ? 'Finished' : 'Active'}</td>
                                                    <td style={{ fontSize: '16px', fontWeight: 'normal', textAlign: 'center' }}>
                                                        {/* <button className="btn btn-sm me-2" onClick={() => handleEditClick(jadwal)}>
                                                            <FaEdit />
                                                        </button> */}
                                                        <button className="btn btn-sm" onClick={() => handleDeleteClick(jadwal)}>
                                                            <FaTrashAlt style={{ color:'#B22222' }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="py-1"></div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <div className="py-3"></div>
            </div>
            {loading && <Loading />}
            {error && <Modal data={error} status={'error'} onClose={handleCloseModal} />}
            {success && <Modal data={success} status={'success'} onClose={handleCloseModal} />}
            {/* <EditModal
                show={showEditModal}
                handleClose={handleCloseModal}
                data={selectedJadwal}
                handleSave={handleSaveChanges}
            /> */}

            <AddJadwalModal
                show={showAddJadwalModal}
                handleClose={handleCloseAddJadwalModal}
                handleSave={handleSaveNewJadwal}
            />

            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteJadwal}
                data="ini"
            />
        </Fragment>
    );
};

export default Jadwal;
