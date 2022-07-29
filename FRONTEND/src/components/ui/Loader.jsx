import React from 'react'

export const Loader = () => {

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-grow text-primary ml-3" role="status" />
            <div className="spinner-grow text-secondary ml-3" role="status" />
            <div className="spinner-grow text-success ml-3" role="status" />
            <div className="spinner-grow text-danger ml-3" role="status" />
            <div className="spinner-grow text-warning ml-3" role="status" />
            <div className="spinner-grow text-info ml-3" role="status" />
            <div className="spinner-grow text-light ml-3" role="status" />
            <div className="spinner-grow text-dark ml-3" role="status" />
            <span className="sr-only">Loading...</span>
        </div>
    )
}
