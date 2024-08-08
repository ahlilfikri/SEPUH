import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFileAlt } from 'react-icons/fa';
import Loading from '../../../shared/loading';
import Modal from '../../../shared/modal';
import EditModal from './component/modalEdit';
import AddObatModal from './component/modalAdd';
import DeleteModal from '../../../shared/modalDelete';
import useDebounce from '../../../shared/debouncedValue';
import Pagination from '../../../shared/pagination'; 

const Obat = () => {
    const port = `${import.meta.env.VITE_BASE_URL}`;
    const [data, setData] = useState([]);
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedObat, setSelectedObat] = useState(null);
    const [showAddObatModal, setShowAddObatModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({
        nama: '',
        stok: '',
        harga: ''
    });
    const debouncedFilters = useDebounce(filters, 1500);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 10; 

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${port}obat/filter`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    nama: debouncedFilters.nama,
                    stok: debouncedFilters.stok,
                    harga: debouncedFilters.harga,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            
            if (response.data.status === 500) {
                setError('Tidak dapat mengambil data obat, coba muat ulang laman');
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

    const handleEditClick = (obat) => {
        setSelectedObat({ ...obat });
        setShowEditModal(true);
    };

    const handleSaveChanges = async (updatedObat) => {
        setShowEditModal(false);
        setLoading(true);
        console.log(updatedObat);
        
        try {
            const response = await axios.put(`${port}user/all/${updatedObat.id}`, updatedObat, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            
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

    const handleAddObatClick = () => {
        setShowAddObatModal(true);
    };

    const handleSaveNewObat = async (newObat) => {
        setShowAddObatModal(false);
        setLoading(true);
        
        try {
            const response = await axios.post(`${port}user/all`, newObat, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.status === 500) {
                setError('Tidak dapat menambahkan obat, coba lagi');
            } else {
                setSuccess('Obat berhasil ditambahkan');
            }
        } catch (error) {
            setError('Tidak dapat menambahkan obat, coba lagi');
        } finally {
            setLoading(false);
            fetchData();
        }
    };

    const handleDeleteClick = (obat) => {
        setSelectedObat(obat);
        setShowDeleteModal(true);
    };

    const handleDeleteObat = async () => {
        setShowDeleteModal(false);
        setLoading(true);
        try {
            const response = await axios.delete(`${port}user/all/${selectedObat._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });            
            if (response.data.status === 500) {
                setError('Tidak dapat menghapus obat, coba lagi');
            } else {
                setSuccess('Obat berhasil dihapus');
            }
        } catch (error) {
            setError('Tidak dapat menghapus obat, coba lagi');
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

    const handleCloseAddObatModal = () => {
        setShowAddObatModal(false);
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
        setFilters({ nama: '', stok: '', harga: '' });
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
                                        <input type="number" className="form-control" placeholder="Stok" name="stok" value={filters.stok} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Harga" name="harga" value={filters.harga} onChange={handleInputChange} />
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
                    <p className="mb-0 text-light" style={{ fontWeight: 'bold' }}>Daftar Obat</p>
                    <button className="btn btn-success" onClick={handleAddObatClick}>Tambah Obat</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered bg-white rounded shadow-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>No</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Nama</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Stok</th>
                                        <th scope="col" style={{ fontWeight: 'normal', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error === '' && data.map((obat, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{index + 1}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{obat.nama}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{obat.stok}</td>
                                            <td style={{ fontSize: '18px', fontWeight: '400' }}>{obat.harga}</td>
                                            <td style={{ fontSize: '18px' }} className="text-center">
                                                <div className="btn m-1" onClick={() => handleEditClick(obat)}>
                                                    <FaEdit style={{ cursor: 'pointer', marginRight: '10px', color: '#000' }} />
                                                </div>
                                                <FaTrashAlt className="m-1" style={{ cursor: 'pointer', color: '#B22222' }} onClick={() => handleDeleteClick(obat)} />
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
                data={selectedObat}
                handleSave={handleSaveChanges}
            />
            <AddObatModal
                show={showAddObatModal}
                handleClose={handleCloseAddObatModal}
                handleSave={handleSaveNewObat}
            />
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDeleteObat}
                data={selectedObat?.nama}
            />
        </Fragment>
    );
};

export default Obat;
