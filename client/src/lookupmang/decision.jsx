import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav and fot/navbar';
import Dropd from '../nav and fot/drop';

const Decision = () => {
    const [decisionData, setDecisionData] = useState({
        amharic: '',
        english: '',
        tigrigna: '',
        oromic: '',
        somali: '',
        afar: '',
        remark: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDecisionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRefresh = () => {
        setDecisionData({
            amharic: '',
            english: '',
            tigrigna: '',
            oromic: '',
            somali: '',
            afar: '',
            remark: ''
        });
    };

    const handleSave = async () => {
        try {
            const result = await axios.post("http://localhost:3000/Dsave", { data: decisionData });
            if (result.data.message === "success") {
                alert("Saved successfully");
                navigate('/decisionshow', { state: { data: decisionData } });
            } else {
                // Handle error case
            }
        } catch (error) {
            console.error("Error saving decision:", error);
            // Handle error case
        }
    };

    return (
        <>
            <Nav />
            <Dropd />
            <div style={{ 
                width: '80%', 
                margin: '0 auto', 
                padding: '20px', 
                backgroundColor: 'white', // Set the background color to white
                borderRadius: '10px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
            }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button 
                        onClick={handleRefresh} 
                        style={{ 
                            backgroundColor: '#1787fe', // Button background color
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer' 
                        }}
                    >
                        New
                    </button>
                    <button 
                        onClick={handleSave} 
                        style={{ 
                            backgroundColor: '#1787fe', // Button background color
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
                <div className="main" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {['amharic', 'english', 'tigrigna', 'oromic', 'somali', 'afar'].map((language, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>{`DECISION (${language.toUpperCase()})`}</label>
                            <input
                                type="text"
                                name={language}
                                value={decisionData[language]}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                    ))}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>REMARK</label>
                        <input
                            type="text"
                            name="remark"
                            value={decisionData.remark}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Decision;
