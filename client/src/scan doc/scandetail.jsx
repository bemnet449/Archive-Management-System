import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Nav from "../nav and fot/navbar";

const Scandet = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const { files = [] } = location.state || {}; // Ensure files has a default empty array

    useEffect(() => {
        if (Array.isArray(files)) {
            setFileList(files);
        }
    }, [files]);

    const handleShow = (file) => {
        navigate('/sds', { state: { scanfile: file } }); // Pass scanfile instead of file
    };

    const handleDelete = async (fileId) => {
        try {
            const result = await axios.delete(`http://localhost:3000/delete/${fileId}`);
            if (result.data.message === "success") {
                alert("Deleted successfully");
                setFileList(fileList.filter(file => file._id !== fileId)); // Update the state to remove the deleted file
            }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    // Inline styles
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
        border: '2px solid black' // Outer border
    };

    const headerStyle = {
        backgroundColor: '#f0f0f0', // Gray background for header
        color: '#333', // Darker text color for contrast
        fontWeight: 'bold',
        borderBottom: '2px solid black' // Border below header
    };

    const rowStyle = {
        backgroundColor: 'white', // White background for rows
        borderBottom: '1px solid #ddd' // Light border for rows
    };

    const cellStyle = {
        border: '1px solid black' // Inner borders for cells
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center', // Center the buttons horizontally
        gap: '10px' // Space between buttons
    };

    const buttonStyle = {
        padding: '8px 16px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        cursor: 'pointer'
    };

    const showButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#1787fe'
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'red'
    };

    return (
        <>
            <Nav />
            <div>
                <table style={tableStyle}>
                    <thead>
                        <tr style={headerStyle}>
                            <th style={cellStyle}>Document Type</th>
                            <th style={cellStyle}>Document</th>
                            <th style={cellStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(fileList) && fileList.map((file, index) => (
                            <tr key={index} style={rowStyle}>
                                <td style={cellStyle}>{file.documenttype}</td>
                                <td style={cellStyle}>{file.content}</td>
                                <td style={cellStyle}>
                                    <div style={buttonContainerStyle}>
                                        <button
                                            style={showButtonStyle}
                                            onClick={() => handleShow(file)}
                                        >
                                            Show
                                        </button>
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => handleDelete(file._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Scandet;
