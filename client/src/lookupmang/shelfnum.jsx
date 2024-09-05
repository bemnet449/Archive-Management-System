import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropd from "../nav and fot/drop";
import Nav from "../nav and fot/navbar";

const ShelfNum = () => {
    const [roomData, setRoomData] = useState({
        worktype: '',
        roomnum: '',
        shelfnum: '',
        remark: ''
    });

    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const result = await axios.post("http://localhost:3000/Ssave", { data: roomData });
            navigate("/sdetail", { state: { rooms: result.data.rooms } });
        } catch (error) {
            console.error("Error saving room data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRefresh = () => {
        setRoomData({
            worktype: '',
            roomnum: '',
            shelfnum: '',
            remark: ''
        });
    };

    return (
        <>
            <Nav />
            <Dropd />
            <div style={{
                width: '80%',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button 
                        onClick={handleRefresh} 
                        style={{
                            backgroundColor: '#1787fe',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        NEW
                    </button>
                    <button 
                        onClick={handleSave} 
                        style={{
                            backgroundColor: '#1787fe',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Save
                    </button>
                </div>
                <div className="p" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Type of Working</label>
                        <input 
                            type="text" 
                            name="worktype" 
                            value={roomData.worktype} 
                            onChange={handleChange} 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }} 
                        />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Room Number</label>
                        <input 
                            type="number" 
                            name="roomnum" 
                            value={roomData.roomnum} 
                            onChange={handleChange} 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }} 
                        />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Shelf Number</label>
                        <input 
                            type="number" 
                            name="shelfnum" 
                            value={roomData.shelfnum} 
                            onChange={handleChange} 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }} 
                        />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Remark</label>
                        <input 
                            type="text" 
                            name="remark" 
                            value={roomData.remark} 
                            onChange={handleChange} 
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }} 
                        />
                    </span>
                </div>
            </div>
        </>
    );
};

export default ShelfNum;
