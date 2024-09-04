import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../nav and fot/navbar';
import Dropd from '../nav and fot/drop';

const Case = () => {
    const [caseData, setCaseData] = useState({
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
        setCaseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handelRefresh = () => {
        setCaseData({
            amharic: '',
            english: '',
            tigrigna: '',
            oromic: '',
            somali: '',
            afar: '',
            remark: ''
        });
    };

    const handelSave = async () => {
        try {
            const result = await axios.post("http://localhost:3000/Csave", { data: caseData });
            if (result.data.message === "success") {
                alert("saved succusfully")
                navigate('/caseshow', { state: { data: caseData } });
            } else {
                // Handle error case
            }
        } catch (error) {
            console.error("Error saving case:", error);
            // Handle error case
        }
    };

    return (
        <>
        <Nav/>
        <Dropd/>
            <div style={{ width: '80%' }}>
                <div className="header">
                    <button onClick={handelRefresh}>New</button>
                    <button onClick={handelSave}>Save</button>
                </div>
                <div className="main">
                    {['amharic', 'english', 'tigrigna', 'oromic', 'somali', 'afar'].map((language, index) => (
                        <span key={index}>
                            <label>{`CASE(${language.toUpperCase()})`}</label>
                            <input
                                type="text"
                                name={language}
                                value={caseData[language]}
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
                            value={caseData.remark}
                            onChange={handleInputChange}
                            style={{ width: '80%' }}
                        />
                    </span>
                </div>
            </div>
        </>
    );
};

export default Case;
