import React, { useState } from 'react';
import Nav from "../nav and fot/navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LetterForm = () => {
    const [formData, setFormData] = useState({
        fileNumber: '',
        volumeNumber: '',
        nameOfOrg: '',
        correspondenceType: 'IN (ENTERING)',
        receiverSenderName: '',
        archiveEmployeeName: '',
        title: '',
        letterNumber: '',
        attachmentNumber: '',
        className: 'type 1',
        caseType: 'type 1',
        language: 'ENGLISH',
        urgencyLevel: 'regular',
        contentOfLetter: '',
        writtenDate: '',
        entryDate: '',
        time: '',
        wayOfDelivery: 'post office',
        reviews: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = async () => {
        try {
            const result = await axios.post('http://localhost:3000/save', formData); 
            if(result.data.message === "success"){
                alert("Saved successfully");
                navigate('/');
            } else {
                console.error('Error:', result.data.message);
            }
        } catch (error) {
            console.error('Error saving letter:', error);
        }
    };

    const handleRefresh = () => {
        setFormData({
            fileNumber: '',
            volumeNumber: '',
            nameOfOrg: '',
            correspondenceType: 'IN (ENTERING)',
            receiverSenderName: '',
            archiveEmployeeName: '',
            title: '',
            letterNumber: '',
            attachmentNumber: '',
            className: 'type 1',
            caseType: 'type 1',
            language: 'ENGLISH',
            urgencyLevel: 'regular',
            contentOfLetter: '',
            writtenDate: '',
            entryDate: '',
            time: '',
            wayOfDelivery: 'post office',
            reviews: '',
        });
    };

    const handleSearch1 = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:3000/search1", { fileNumber: formData.fileNumber });
            if(result.data.message === "success"){
                navigate("/lsearch",{state:result.data.fileData})
            } else {
                console.error("Search failed:", result.data.message);
            }
        } catch (error) {
            console.error("An error occurred during the search:", error);
        }
    };

    const handleSearch2 = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:3000/search2", { nameOfOrg: formData.nameOfOrg });
            if(result.data.message === "success"){
                navigate("/lnsearch",{state:result.data.fileData})
            } else {
                console.error("Search failed:", result.data.message);
            }
        } catch (error) {
            console.error("An error occurred during the search:", error);
        }
    };

    return (
        <>
            <Nav />
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',backgroundColor:"white" }}>
                <button style={{ margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: ' #1787fe', color: 'white' }} onClick={handleRefresh}>New</button>
                <button style={{ margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: ' #1787fe', color: 'white' }} onClick={handleSave}>Save</button>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>File Number</label>
                                <input
                                    type="number"
                                    name="fileNumber"
                                    value={formData.fileNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                                <button style={{ padding: '8px 16px', backgroundColor: ' #1787fe', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleSearch1}>Search</button>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Name of Org /employee</label>
                                <input
                                    type="text"
                                    name="nameOfOrg"
                                    value={formData.nameOfOrg}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                                <button style={{ padding: '8px 16px', backgroundColor: ' #1787fe', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleSearch2}>Search</button>
                            </td>
                            <td>
                            <label>volume Number</label>
                                <input
                                    type="number"
                                    name="volumeNumber"
                                    value={formData.volumeNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Letter Type</label>
                                <select
                                    name="correspondenceType"
                                    value={formData.correspondenceType}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="IN (ENTERING)">IN (ENTERING)</option>
                                    <option value="OUT (leaving)">OUT (leaving)</option>
                                </select>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Name of Receiver/Sender</label>
                                <input
                                    type="text"
                                    name="receiverSenderName"
                                    value={formData.receiverSenderName}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Name of Archive Employee</label>
                                <input
                                    type="text"
                                    name="archiveEmployeeName"
                                    value={formData.archiveEmployeeName}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Letter Number</label>
                                <input
                                    type="number"
                                    name="letterNumber"
                                    value={formData.letterNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Attachment Number</label>
                                <input
                                    type="number"
                                    name="attachmentNumber"
                                    value={formData.attachmentNumber}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Class Name</label>
                                <select
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="type 1">Type 1</option>
                                    <option value="type 2">Type 2</option>
                                    <option value="type 3">Type 3</option>
                                </select>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Case Type</label>
                                <select
                                    name="caseType"
                                    value={formData.caseType}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="type 1">Type 1</option>
                                    <option value="type 2">Type 2</option>
                                    <option value="type 3">Type 3</option>
                                </select>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="ENGLISH">ENGLISH</option>
                                    <option value="AMHARIC">AMHARIC</option>
                                    <option value="ARABIC">ARABIC</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Urgency Level</label>
                                <select
                                    name="urgencyLevel"
                                    value={formData.urgencyLevel}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="regular">Regular</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="immediate">Immediate</option>
                                </select>
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Way of Delivery</label>
                                <select
                                    name="wayOfDelivery"
                                    value={formData.wayOfDelivery}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                >
                                    <option value="post office">Post Office</option>
                                    <option value="fax">Fax</option>
                                    <option value="email">Email</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Content of the Letter</label>
                                <textarea
                                    name="contentOfLetter"
                                    value={formData.contentOfLetter}
                                    onChange={handleChange}
                                    rows="4"
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Written Date</label>
                                <input
                                    type="date"
                                    name="writtenDate"
                                    value={formData.writtenDate}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Entry Date</label>
                                <input
                                    type="date"
                                    name="entryDate"
                                    value={formData.entryDate}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <label>Reviews</label>
                                <textarea
                                    name="reviews"
                                    value={formData.reviews}
                                    onChange={handleChange}
                                    rows="4"
                                    style={{ width: '100%', padding: '8px', margin: '5px 0', boxSizing: 'border-box' }}
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LetterForm;
