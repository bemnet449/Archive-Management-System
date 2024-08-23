import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../nav and fot/navbar';
import axios from 'axios';

const FDedit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { folderId, userId } = location.state;

    const [roomNumber, setRoomNumber] = useState('');
    const [shelfNumber, setShelfNumber] = useState('');
    const [lateralNumber, setLateralNumber] = useState('');
    const [volumeNumber, setVolumeNumber] = useState('');
    const [fileCabinetNumber, setFileCabinetNumber] = useState('');
    const [dateOpened, setDateOpened] = useState('');
    const [dateClosed, setDateClosed] = useState('');
    const [remark, setRemark] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchFolderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/folder/${folderId}`);
                const folder = response.data;

                // Assuming dates are in ISO format
                setRoomNumber(folder.roomNumber || '');
                setShelfNumber(folder.shelfNumber || '');
                setLateralNumber(folder.lateralNumber || '');
                setVolumeNumber(folder.volumeNumber || '');
                setFileCabinetNumber(folder.fileCabinetNumber || '');
                setDateOpened(folder.dateOpened ? new Date(folder.dateOpened).toISOString().split('T')[0] : '');
                setDateClosed(folder.dateClosed ? new Date(folder.dateClosed).toISOString().split('T')[0] : '');
                setRemark(folder.remark || '');
            } catch (err) {
                setError('Failed to fetch folder details.');
            }
        };

        fetchFolderDetails();
    }, [folderId]);

    const handleSave = async () => {
        try {
            const updatedFolder = {
                roomNumber,
                shelfNumber,
                lateralNumber,
                volumeNumber,
                fileCabinetNumber,
                dateOpened,
                dateClosed,
                remark,
            };
    
            await axios.put(`http://localhost:3000/folders/${folderId}`, updatedFolder); // Updated URL
    
            setSuccessMessage('Folder details updated successfully.');
            setError('');
            navigate('/home', { state: { userId } }); // Pass userId to navigate
        } catch (err) {
            setError('Failed to save folder details.');
            setSuccessMessage('');
        }
    };
    

    return (
        <>
            <Nav />
            <style>
                {`
                    .fdetails-form {
                        background-color: white;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        margin: 20px;
                    }
                    form {
                        width: 100%;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .fdetails-header {
                        text-align: right;
                        margin-bottom: 20px;
                    }
                    .fdetails-header button {
                        background-color: #007BFF; /* Blue background */
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                    .fdetails-form table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .fdetails-form td {
                        padding: 10px;
                    }
                    .fdetails-form input, .fdetails-form textarea {
                        width: 100%;
                        padding: 8px;
                        border-radius: 4px;
                        border: 1px solid #ccc;
                    }
                    .fdetails-form textarea {
                        resize: vertical;
                    }
                    .fdetails-form label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    .fdetails-form .fdetails-row1,
                    .fdetails-form .fdetails-row2,
                    .fdetails-form .fdetails-row3,
                    .fdetails-form .fdetails-row4,
                    .fdetails-form .fdetails-row5 {
                        margin-bottom: 15px;
                    }
                `}
            </style>
            <form>
                <div className="fdetails-header">
                    <button type="button" onClick={handleSave}>SAVE</button>
                </div>
                <div className="fdetails-form">
                    <table>
                        <tbody>
                            <tr className="fdetails-row1">
                                <td className="fdetails-field">
                                    <label htmlFor="roomNumber">Room Number</label>
                                    <input
                                        id="roomNumber"
                                        type="number"
                                        value={roomNumber}
                                        onChange={(e) => setRoomNumber(e.target.value)}
                                        required
                                    />
                                </td>
                                <td className="fdetails-field">
                                    <label htmlFor="shelfNumber">Shelf Number</label>
                                    <input
                                        id="shelfNumber"
                                        type="number"
                                        value={shelfNumber}
                                        onChange={(e) => setShelfNumber(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="fdetails-row2">
                                <td className="fdetails-field">
                                    <label htmlFor="lateralNumber">Lateral Number</label>
                                    <input
                                        id="lateralNumber"
                                        type="number"
                                        value={lateralNumber}
                                        onChange={(e) => setLateralNumber(e.target.value)}
                                        required
                                    />
                                </td>
                                <td className="fdetails-field">
                                    <label htmlFor="volumeNumber">Volume Number</label>
                                    <input
                                        id="volumeNumber"
                                        type="number"
                                        value={volumeNumber}
                                        onChange={(e) => setVolumeNumber(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="fdetails-row3">
                                <td className="fdetails-field">
                                    <label htmlFor="fileCabinetNumber">File Cabinet Number</label>
                                    <input
                                        id="fileCabinetNumber"
                                        type="number"
                                        value={fileCabinetNumber}
                                        onChange={(e) => setFileCabinetNumber(e.target.value)}
                                        required
                                    />
                                </td>
                                <td className="fdetails-field">
                                    <label htmlFor="dateOpened">Date Opened</label>
                                    <input
                                        id="dateOpened"
                                        type="date"
                                        value={dateOpened}
                                        onChange={(e) => setDateOpened(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="fdetails-row4">
                                <td className="fdetails-field">
                                    <label htmlFor="dateClosed">Date Closed</label>
                                    <input
                                        id="dateClosed"
                                        type="date"
                                        value={dateClosed}
                                        onChange={(e) => setDateClosed(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="fdetails-row5">
                                <td className="fdetails-field">
                                    <label htmlFor="remark">Remark</label>
                                    <textarea
                                        id="remark"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        required
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </>
    );
};

export default FDedit;
