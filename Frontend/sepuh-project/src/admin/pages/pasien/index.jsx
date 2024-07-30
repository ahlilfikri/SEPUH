import React, { Fragment, useState } from 'react';

const Pasien = () => {
    const [nama, setNama] = useState('');
    const [usia, setUsia] = useState('');
    const [alamat, setAlamat] = useState('');

    const handleFilter = () => {
        // Handle filter logic here
        console.log('Filter applied:', { nama, usia, alamat });
    };

    const handleClear = () => {
        // Clear filter fields
        setNama('');
        setUsia('');
        setAlamat('');
    };

    const styles = {
        filterContainer: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '400px',
            margin: 'auto',
        },
        filterField: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '15px',
        },
        label: {
            fontSize: '20px',
            marginBottom: '5px',
        },
        input: {
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        filterButtons: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            fontSize: '20px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        filterButton: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        clearButton: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        filterButtonHover: {
            backgroundColor: '#218838',
        },
        clearButtonHover: {
            backgroundColor: '#c82333',
        }
    };

    return (
        <Fragment>
            <div style={styles.filterContainer}>
                <h3>Filter</h3>
                <div style={styles.filterField}>
                    <label htmlFor="nama" style={styles.label}>Nama:</label>
                    <input
                        type="text"
                        id="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.filterField}>
                    <label htmlFor="usia" style={styles.label}>Usia:</label>
                    <input
                        type="number"
                        id="usia"
                        value={usia}
                        onChange={(e) => setUsia(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.filterField}>
                    <label htmlFor="alamat" style={styles.label}>Alamat:</label>
                    <input
                        type="text"
                        id="alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.filterButtons}>
                    <button
                        className="filter-button"
                        onClick={handleFilter}
                        style={{ ...styles.button, ...styles.filterButton }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.filterButtonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.filterButton.backgroundColor}
                    >
                        Filter
                    </button>
                    <button
                        className="clear-button"
                        onClick={handleClear}
                        style={{ ...styles.button, ...styles.clearButton }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.clearButtonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.clearButton.backgroundColor}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Pasien;
