import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFileAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddApotekerModal from './component/modalAdd';
import DeleteModal from '../../../shared/modalDelete';
import useDebounce from '../../../shared/debouncedValue';
import Pagination from '../../../shared/pagination'; 

const Apoteker = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedApoteker, setSelectedApoteker] = useState(null);
    const [showAddApotekerModal, setShowAddApotekerModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({
        nama: '',
        usia: '',
        alamat: ''
    });
    const debouncedFilters = useDebounce(filters, 1500);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 10; 

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}user/apoteker/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    nama: debouncedFilters.nama,
                    usia: debouncedFilters.usia,
                    alamat: debouncedFilters.alamat,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data apoteker, coba muat ulang laman');
            } else {
                setData(response.data.data.data);
                setTotalPages(response.data.data.totalPages); 
            }
        } catch (error) {
            setError('Tidak dapat mengambil data, coba muat ulang laman');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, debouncedFilters, currentPage]); 

    const handleEditClick = (apoteker) => {
        setSelectedApoteker({ ...apoteker });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedApoteker) => {
        setShowEditModal(false);
        setLoading(true);
        try {
            const response = await axios.put(`${port}user/all/${updatedApoteker.id}`, updatedApoteker, {
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

    const handleAddApotekerClick = () => {
        setShowAddApotekerModal(true);
    };

    const handleSaveNewApoteker = async (newApoteker) => {
        setShowAddApotekerModal(false);
        setLoading(true);
        
        try {
            const response = await axios.post(`${port}user/all`, newApoteker, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.status === 500) {
                setError('Tidak dapat menambahkan apoteker, coba lagi');
            } else {
                setSuccess('Apoteker berhasil ditambahkan');
            }
        } catch (error) {
            setError('Tidak dapat menambahkan apoteker, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleDeleteClick = (apoteker) => {
        setSelectedApoteker(apoteker);
        setShowDeleteModal(true);
    };

    const handleDeleteApoteker = async () => {
        setShowDeleteModal(false);
        setLoading(true);
        try {
            const response = await axios.delete(`${port}user/all/${selectedApoteker._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });            
            if (response.data.status === 500) {
                setError('Tidak dapat menghapus apoteker, coba lagi');
            } else {
                setSuccess('Apoteker berhasil dihapus');
            }
        } catch (error) {
            setError('Tidak dapat menghapus apoteker, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setError('');
        setSuccess('');
    };

    const handleCloseAddApotekerModal = () => {
        setShowAddApotekerModal(false);
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
        setFilters({ nama: '', usia: '', alamat: '' });
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
                                        <input type="text" className="form-control" placeholder="Nama" name="nama" value={filters.nama} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="number" className="form-control" placeholder="Usia" name="usia" value={filters.usia} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Alamat" name="alamat" value={filters.alamat} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success" onClick={fetchData}>Filter</button>
                                        <button className="btn btn-danger" onClick={handleClearFilters}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 mt-5">
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Apoteker</p>
                    <button className="btn btn-success" onClick={handleAddApotekerClick}>Tambah Apoteker</button>
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
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Alamat</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Username</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Email</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error === '' && data.map((apoteker, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{index + 1}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{apoteker.nama}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{apoteker.usia}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{apoteker.alamat}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{apoteker.username}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{apoteker.email}</td>
                                            <td style={{ fontSize: '18px' }} className="text-center">
                                                <div className="btn m-1" onClick={() => handleEditClick(apoteker)}>
                                                    <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                </div>
                                                <FaTrashAlt className="m-1" style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(apoteker)} />
                                            </td>
                                        </tr>
                                    ))}
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
            <EditModal
                show={showEditModal}
                handleClose={handleCloseModal}
                data={selectedApoteker}
                handleSave={handleSaveChanges}
            />
            <AddApotekerModal
                show={showAddApotekerModal}
                handleClose={handleCloseAddApotekerModal}
                handleSave={handleSaveNewApoteker}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteApoteker}
                data={selectedApoteker?.nama}
            />
        </Fragment>
    );
};

export default Apoteker;
