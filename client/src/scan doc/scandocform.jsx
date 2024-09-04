import { useState } from "react";
import Nav from "../nav and fot/navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Scandoc = () => {
    const [volumenum, setVolumenum] = useState("");
    const [doctype, setDoctype] = useState('choose');
    const [content, setContent] = useState('');
    const [keyword, setKeyword] = useState('');
    const [addinfo, setAddinfo] = useState('');

    const navigate = useNavigate();

    const handleSave = async () => {
        const data = { volumenum, doctype, content, keyword, addinfo };

        try {
            const result = await axios.post("http://localhost:3000/S", data);
            if (result.data.message === "success") {
                alert("Saved correctly");
                handleRefresh()
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefresh = async () => {
        setVolumenum("");
        setDoctype("choose");
        setContent("");
        setKeyword("");
        setAddinfo("");
    };

    const handleSearch = async () => {
        try {
            const result = await axios.post("http://localhost:3000/Searchscan", { volumenumber: volumenum });
            if (result.data.message === "success") {
                navigate('/scansearch', { state: { files: result.data.data } });
            } else {
                alert("No data found.");
            }
        } catch (error) {
            console.error("Error during search:", error);
        }
    };
    

    // Inline styles
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f4f7f6', // Light background color
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    };

    const buttonGroupStyle = {
        textAlign: 'center',
        marginBottom: '20px'
    };

    const actionButtonStyle = {
        margin: '10px',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#1787fe',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px'
    };

    const formContainerStyle = {
        padding: '20px'
    };

    const formTableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const formTableCellStyle = {
        padding: '10px'
    };

    const formLabelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const formInputStyle = {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const formTextareaStyle = {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    return (
        <>
            <Nav />
            <div style={containerStyle}>
                <div style={buttonGroupStyle}>
                    <button style={actionButtonStyle} onClick={handleRefresh}>NEW</button>
                    <button style={actionButtonStyle} onClick={handleSave}>SAVE</button>
                    <button style={actionButtonStyle} onClick={handleSearch}>SEARCH</button>
                </div>
                <div style={formContainerStyle}>
                    <table style={formTableStyle}>
                        <tbody>
                            <tr>
                                <td style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Volume Number</label>
                                    <input type="number" value={volumenum} onChange={(e) => setVolumenum(e.target.value)} style={formInputStyle} />
                                </td>
                                <td colSpan={2} style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Document Type</label>
                                    <select value={doctype} onChange={(e) => setDoctype(e.target.value)} style={formInputStyle}>
                                        <option value="choose">Choose</option>
                                        <option value="type1">Type 1</option>
                                        <option value="type2">Type 2</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Content</label>
                                    <textarea value={content} onChange={(e) => setContent(e.target.value)} style={formTextareaStyle}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Keywords</label>
                                    <textarea value={keyword} onChange={(e) => setKeyword(e.target.value)} style={formTextareaStyle}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={formTableCellStyle}>
                                    <label style={formLabelStyle}>Additional Info</label>
                                    <textarea value={addinfo} onChange={(e) => setAddinfo(e.target.value)} style={formTextareaStyle}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Scandoc;
