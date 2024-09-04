import { useNavigate, useLocation } from "react-router-dom";
import Navl from "../nav and fot/navlog";
import { useState } from "react";
import axios from "axios";

const Lnsearch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileData = location.state || {};

    const sendername = fileData.nameOfOrg;
    const id = fileData.id;

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [decision, setDecision] = useState('');
    const [decisiond, setDecisiond] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleSave = async () => {
        const data = {
            name,
            date,
            decision,
            decisiond,
            remarks
        };

        try {
            const result = await axios.post(`http://localhost:3000/savedetail/${id}`, data);
            if (result.data.message === "success") {
                navigate("/"); // Navigate to a success page or another route
            } else {
                console.error("Error saving details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Navl />

            <div className="">
                <button onClick={handleSave}>Save</button>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Letter for</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#1787fe',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                    onClick={handleSave}
                                >
                                    Search
                                </button>
                            </td>
                            <td>
                                <label>Decision Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </td>
                            <td>
                                <label>Decision</label>
                                <input
                                    type="text"
                                    value={decision}
                                    onChange={(e) => setDecision(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <label>Decision Description</label>
                                <input
                                    type="text"
                                    value={decisiond}
                                    onChange={(e) => setDecisiond(e.target.value)}
                                    style={{ width: '100%' }} // Full width input
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <label>Remarks</label>
                                <input
                                    type="text"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    style={{ width: '100%' }} // Full width input
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Lnsearch;
