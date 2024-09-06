import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";

const RoomDetails = () => {
    const location = useLocation();
    const { rooms = [] } = location.state || {};

    const [roomList, setRoomList] = useState(rooms);
    const navigate = useNavigate();

    const handleDelete = async (roomId) => {
        try {
            const result = await axios.delete(`http://localhost:3000/Rdelete/${roomId}`);
            if (result.data.message === "success") {
                alert("Deleted successfully");
                setRoomList(roomList.filter(room => room._id !== roomId)); // Update the state to remove the deleted room
            }
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    return (
        <>
            <Nav />
            <div style={{
                width: '80%', 
                margin: '0 auto', 
                padding: '20px', 
                backgroundColor: 'white', // Main div background
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
            }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/roomnumber')} // Assuming this navigates to an add room page
                        style={{
                            backgroundColor: '#1787fe', // Button background color
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        New Room
                    </button>
                </div>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={thStyle}>Type of Working</th>
                            <th style={thStyle}>Room Number</th>
                            <th style={thStyle}>Remark</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomList.map(room => (
                            <tr key={room._id} style={trStyle}>
                                <td style={tdStyle}>{room.worktype}</td>
                                <td style={tdStyle}>{room.roomnum}</td>
                                <td style={tdStyle}>{room.remark}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleDelete(room._id)}
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

const thStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f4f4f4'
};

const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center'
};

const trStyle = {
    backgroundColor: '#fff',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer'
};

export default RoomDetails;
