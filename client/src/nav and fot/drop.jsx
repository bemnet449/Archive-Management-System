import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Dropd = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        if (value) {
            navigate(value);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', backgroundColor: '#f0f0f0', padding: '10px' }}>
                <select 
                    style={{ width: '40%' }} 
                    onChange={handleChange}
                >
                    <option value="">Select an option</option>
                    <option value="/lookup">LookUp</option>
                    <option value="/case">Case</option>
                    <option value="/decision">Decision</option>
                    <option value="/roomnumber">Room Number</option>
                    <option value="/shelfnumber">Shelf Number</option>
                </select>
            </div>
        </div>
    );
};

export default Dropd;
