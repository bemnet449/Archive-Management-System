import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";

const ShowD = () => {
    const location = useLocation();
    const { files = [] } = location.state || {};

    const [fileList, setFileList] = useState(files);

    const handleDelete = async (fileId) => {
        try {
            const result = await axios.delete(`http://localhost:3000/Ddelete/${fileId}`);
            if (result.data.message === "success") {
                alert("Deleted successfully");
                setFileList(fileList.filter(file => file._id !== fileId)); // Update the state to remove the deleted file
            }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };
    const thStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        fontWeight: 'bold',
        textAlign: 'center'
    };
    
    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center'
    };
    
    const trStyle = {
        backgroundColor: '#fff',
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
        textAlign: 'center'
    };

    return (
        <>
            <Nav />
            <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                            <th style={thStyle}>Decision (Amharic)</th>
                            <th style={thStyle}>Decision (English)</th>
                            <th style={thStyle}>Decision (Tigrigna)</th>
                            <th style={thStyle}>Decision (Oromic)</th>
                            <th style={thStyle}>Decision (Somali)</th>
                            <th style={thStyle}>Decision (Afar)</th>
                            <th style={thStyle}>Remark</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileList.map(file => (
                            <tr key={file._id} style={trStyle}>
                                <td style={tdStyle}>{file.amharic}</td>
                                <td style={tdStyle}>{file.english}</td>
                                <td style={tdStyle}>{file.tigrigna}</td>
                                <td style={tdStyle}>{file.oromic}</td>
                                <td style={tdStyle}>{file.somali}</td>
                                <td style={tdStyle}>{file.afar}</td>
                                <td style={tdStyle}>{file.remark}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: 'red',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                        onClick={() => handleDelete(file._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowD;