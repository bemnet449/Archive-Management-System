import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";

const SendLetter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [employee, setEmployee] = useState('');
    const [decisionDate, setDecisionDate] = useState('');
    const [decision, setDecision] = useState('');
    const [decisionDescription, setDecisionDescription] = useState('');
    const [remark, setRemark] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state && location.state.id) {
            setId(location.state.id);
        }
    }, [location.state]);

    const handleSave = async () => {
        if (loading) return; // Prevent multiple submissions

        setLoading(true);
        const data = { employee, decisionDate, decision, decisionDescription, remark };

        try {
            const result = await axios.post(`http://localhost:3000/sendLetter/${id}`, data);
            if (result.data.message === "success") {
                alert("Letter sent successfully");
                // Navigate back to Lsearch and refresh the table
                navigate('/lsearch', { state: { update: true } });
            } else {
                alert("Failed to save the letter.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while saving. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '1000px',
        padding: '20px',
        margin: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    };
    const buttonGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    };
    const actionButtonStyle = {
        backgroundColor: '#1787fe',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    const formContainerStyle = {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    };
    const formTableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    const formTableCellStyle = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };
    const formLabelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };
    const formInputStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };
    const formTextareaStyle = {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        minHeight: '100px',
    };

    return (
        <>
            <Nav />
            <div style={containerStyle}>
                <div style={buttonGroupStyle}>
                    <button style={actionButtonStyle} onClick={() => navigate(-1)}>Back</button>
                    <button style={actionButtonStyle} onClick={handleSave} disabled={loading}>SAVE</button>
                </div>
                <div style={formContainerStyle}>
                    <table style={formTableStyle}>
                        <tbody>
                            <tr>
                                <td style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Employee</label>
                                    <input type="text" value={employee} onChange={(e) => setEmployee(e.target.value)} style={formInputStyle} />
                                </td>
                                <td style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Decision Date</label>
                                    <input type="date" value={decisionDate} onChange={(e) => setDecisionDate(e.target.value)} style={formInputStyle} />
                                </td>
                            </tr>
                            <tr>
                                <td style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Decision</label>
                                    <input type="text" value={decision} onChange={(e) => setDecision(e.target.value)} style={formInputStyle} />
                                </td>
                                <td style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Decision Description</label>
                                    <textarea value={decisionDescription} onChange={(e) => setDecisionDescription(e.target.value)} style={formTextareaStyle}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Remark</label>
                                    <textarea value={remark} onChange={(e) => setRemark(e.target.value)} style={formTextareaStyle}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SendLetter;
