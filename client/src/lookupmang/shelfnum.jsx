import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropd from "../nav and fot/drop";
import Nav from "../nav and fot/navbar";

const ShelfNum = () => {
    const [roomData, setRoomData] = useState({
        worktype: '',
        roomnum: '',
        shelfnum: '',  // Add shelfnum field
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
            shelfnum: '',  // Reset shelfnum field
            remark: ''
        });
    };

    return (
        <>
            <Nav />
            <Dropd />
            <div className="">
                <div className="header">
                    <button onClick={handleRefresh}>NEW</button>
                    <button onClick={handleSave}>Save</button>
                </div>
                <div className="p">
                    <span>
                        <label>Type of Working</label>
                        <input type="text" name="worktype" value={roomData.worktype} onChange={handleChange} />
                    </span>
                    <span>
                        <label>Room Number</label>
                        <input type="number" name="roomnum" value={roomData.roomnum} onChange={handleChange} />
                    </span>
                    <span>
                        <label>Shelf Number</label>  {/* Add Shelf Number input */}
                        <input type="number" name="shelfnum" value={roomData.shelfnum} onChange={handleChange} />
                    </span>
                    <span>
                        <label>Remark</label>
                        <input type="text" name="remark" value={roomData.remark} onChange={handleChange} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default ShelfNum;
