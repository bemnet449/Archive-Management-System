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
        <div style={{ width: '100%',marginBottom:'15px' }}>
            <div style={{ width: '100%', backgroundColor: 'lightblue', padding: '10px' }}>
                <select 
                    style={{ 
                        width: '60%', 
                        height: '40px', // Adding height to the dropdown
                        backgroundColor: 'black', // Setting background to black
                        color: 'white', // Text color white
                        borderRadius: '5px', // Rounded corners
                        padding: '5px', // Adding padding inside the select
                        cursor: 'pointer', // Change cursor to pointer
                    }}
                    onChange={handleChange}
                >
                    <option value="">Select a Look-up option</option>
                    <option value="/lookup-management">Case</option>
                    <option value="/decision">Decision</option>
                    <option value="/roomnumber">Room Number</option>
                    <option value="/shelfnumber">Shelf Number</option>
                </select>
            </div>

            <style>
                {`
                    select option:hover {
                        background-color: blue; /* Blue background on hover */
                        color: white; /* White text on hover */
                    }
                `}
            </style>
        </div>
    );
};

export default Dropd;
