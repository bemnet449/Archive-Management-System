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
        <Nav/>
        <Dropd/>
            <div style={{ width: '80%' }}>
                <div className="header">
                    <button onClick={handleRefresh}>New</button>
                    <button onClick={handleSave}>Save</button>
                </div>
                <div className="main">
                    {['amharic', 'english', 'tigrigna', 'oromic', 'somali', 'afar'].map((language, index) => (
                        <span key={index}>
                            <label>{`DECISION(${language.toUpperCase()})`}</label>
                            <input
                                type="text"
                                name={language}
                                value={decisionData[language]}
                                onChange={handleInputChange}
                                style={{ width: '80%' }}
                            />
                        </span>
                    ))}
                    <span>
                        <label>REMARK</label>
                        <input
                            type="text"
                            name="remark"
                            value={decisionData.remark}
                            onChange={handleInputChange}
                            style={{ width: '80%' }}
                        />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Decision;
