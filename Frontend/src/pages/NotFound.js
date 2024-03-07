import React from 'react';

const NotFound = () => (
    <div
        className="w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
    >
        <img
            src="/NotFound.svg"
            alt="Not found"
            style={{ maxWidth: '50%', maxHeight: '50%' }}
        />
    </div>
);

export default NotFound;