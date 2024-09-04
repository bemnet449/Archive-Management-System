import React, { useState, useEffect } from 'react';
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

    return (
        <>
            <Nav />
            <div className="">
                <table>
                    <thead>
                        <tr>
                            <th>Decision (Amharic)</th>
                            <th>Decision (English)</th>
                            <th>Decision (Tigrigna)</th>
                            <th>Decision (Oromic)</th>
                            <th>Decision (Somali)</th>
                            <th>Decision (Afar)</th>
                            <th>Remark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileList.map(file => (
                            <tr key={file._id}>
                                <td>{file.amharic}</td>
                                <td>{file.english}</td>
                                <td>{file.tigrigna}</td>
                                <td>{file.oromic}</td>
                                <td>{file.somali}</td>
                                <td>{file.afar}</td>
                                <td>{file.remark}</td>
                                <td>
                                    <button
                                        style={{ color: 'red', cursor: 'pointer' }}
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
