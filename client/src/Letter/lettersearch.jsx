import React from 'react';
import { useLocation } from 'react-router-dom';
import Navl from '../nav and fot/navlog';

const Lsearch = () => {
    const location = useLocation();
    const fileData = location.state || []; // Receives data passed via navigate

    // Define inline styles for table and button
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#E3F2FD', // Light blue background for the table
    };

    const thStyle = {
        padding: '10px',
        borderBottom: '1px solid #90CAF9', // Light blue border
        textAlign: 'left',
        backgroundColor: '#BBDEFB', // Slightly darker light blue for the header
        color: '#0D47A1', // Dark blue text color
    };

    const tdStyle = {
        padding: '10px',
        borderBottom: '1px solid #90CAF9', // Light blue border
        color: '#0D47A1', // Dark blue text color
    };

    const buttonStyle = {
        backgroundColor: '#BBDEFB', // Light blue button background
        color: '#0D47A1', // Dark blue text color
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    };

    return (
        <>
            <Navl />
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>#</th>
                        <th style={thStyle}>TITLE</th>
                        <th style={thStyle}>CASE TYPE</th>
                        <th style={thStyle}>LETTER NUMBER</th>
                        <th style={thStyle}>NAME OF ORG</th>
                    </tr>
                </thead>
                <tbody>
                    {fileData.map((item, index) => (
                        <tr key={index}>
                            <td style={tdStyle}>{index + 1}</td>
                            <td style={tdStyle}>{item.title}</td>
                            <td style={tdStyle}>{item.caseType}</td>
                            <td style={tdStyle}>{item.letterNumber}</td>
                            <td style={tdStyle}>{item.nameOfOrg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button style={buttonStyle}>Submit</button>
        </>
    );
};

export default Lsearch;
