import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <button
                className="btn btn-primary"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ fontSize: '18px' }}
            >
                Previous
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={`btn ${currentPage === page ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => onPageChange(page)}
                    style={{ margin: '0 5px', fontSize: '18px' }}
                >
                    {page}
                </button>
            ))}
            <button
                className="btn btn-primary"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ fontSize: '18px' }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
