import React, { useState, useEffect } from 'react';
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
            <div className="room-details">
                <table>
                    <thead>
                        <tr>
                            <th>Type of Working</th>
                            <th>Room Number</th>
                            <th>Remark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomList.map(room => (
                            <tr key={room._id}>
                                <td>{room.worktype}</td>
                                <td>{room.roomnum}</td>
                                <td>{room.remark}</td>
                                <td>
                                    <button
                                        style={{ color: 'red', cursor: 'pointer' }}
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

export default RoomDetails;
