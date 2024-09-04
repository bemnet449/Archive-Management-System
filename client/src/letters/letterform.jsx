import React, { useState } from 'react';
import Nav from "../nav and fot/navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './letterform.css'; 

const LetterForm = () => {
    const [formData, setFormData] = useState({
        fileNumber: '',
        volumeNumber: '',
        nameOfOrg: '',
        correspondenceType: 'IN (ENTERING)',
        receiverSenderName: '',
        receiverSenderFatherName: '',
        receiverSenderGrandfatherName: '',
        archiveEmployeeName: '',
        archiveEmployeeFatherName: '',
        archiveEmployeeGrandfatherName: '',
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
                handleRefresh();
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
            receiverSenderFatherName: '',
            receiverSenderGrandfatherName: '',
            archiveEmployeeName: '',
            archiveEmployeeFatherName: '',
            archiveEmployeeGrandfatherName: '',
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
                navigate("/letter-search", { state: result.data.data });
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
                navigate("/lettern-search", { state: result.data.data });
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
            <div className="letter-form-container">
                <div className="button-group">
                    <button onClick={handleRefresh}>New</button>
                    <button onClick={handleSave}>Save</button>
                </div>
                <table className="file-borrow-form">
                    <tbody>
                        <tr>
                            <td>
                                <label>File Number</label>
                                <input
                                    type="number"
                                    name="fileNumber"
                                    value={formData.fileNumber}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSearch1}>Search</button>
                            </td>
                            <td>
                                <label>Name of Org /employee</label>
                                <input
                                    type="text"
                                    name="nameOfOrg"
                                    value={formData.nameOfOrg}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSearch2}>Search</button>
                            </td>
                            <td>
                                <label>Volume Number</label>
                                <input
                                    type="number"
                                    name="volumeNumber"
                                    value={formData.volumeNumber}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Letter Type</label>
                                <select
                                    name="correspondenceType"
                                    value={formData.correspondenceType}
                                    onChange={handleChange}
                                >
                                    <option value="IN (ENTERING)">IN (ENTERING)</option>
                                    <option value="OUT (LEAVING)">OUT (LEAVING)</option>
                                </select>
                            </td>
                            <td>
                                <label>Name of Receiver/Sender</label>
                                <input
                                    type="text"
                                    name="receiverSenderName"
                                    value={formData.receiverSenderName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="receiverSenderFatherName"
                                    placeholder="Father's Name"
                                    value={formData.receiverSenderFatherName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="receiverSenderGrandfatherName"
                                    placeholder="Grandfather's Name"
                                    value={formData.receiverSenderGrandfatherName}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>Name of Archive Employee</label>
                                <input
                                    type="text"
                                    name="archiveEmployeeName"
                                    value={formData.archiveEmployeeName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="archiveEmployeeFatherName"
                                    placeholder="Father's Name"
                                    value={formData.archiveEmployeeFatherName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="archiveEmployeeGrandfatherName"
                                    placeholder="Grandfather's Name"
                                    value={formData.archiveEmployeeGrandfatherName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>Letter Number</label>
                                <input
                                    type="number"
                                    name="letterNumber"
                                    value={formData.letterNumber}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>Attachment Number</label>
                                <input
                                    type="number"
                                    name="attachmentNumber"
                                    value={formData.attachmentNumber}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Class Name</label>
                                <select
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                >
                                    <option value="type 1">Type 1</option>
                                    <option value="type 2">Type 2</option>
                                    <option value="type 3">Type 3</option>
                                </select>
                            </td>
                            <td>
                                <label>Case Type</label>
                                <select
                                    name="caseType"
                                    value={formData.caseType}
                                    onChange={handleChange}
                                >
                                    <option value="type 1">Type 1</option>
                                    <option value="type 2">Type 2</option>
                                    <option value="type 3">Type 3</option>
                                </select>
                            </td>
                            <td>
                                <label>Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                >
                                    <option value="ENGLISH">ENGLISH</option>
                                    <option value="AMHARIC">AMHARIC</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Urgency Level</label>
                                <select
                                    name="urgencyLevel"
                                    value={formData.urgencyLevel}
                                    onChange={handleChange}
                                >
                                    <option value="regular">Regular</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="very urgent">Very Urgent</option>
                                </select>
                            </td>
                            <td colSpan="2">
                                <label>Content of Letter</label>
                                <textarea
                                    name="contentOfLetter"
                                    value={formData.contentOfLetter}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Written Date</label>
                                <input
                                    type="date"
                                    name="writtenDate"
                                    value={formData.writtenDate}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>Entry Date</label>
                                <input
                                    type="date"
                                    name="entryDate"
                                    value={formData.entryDate}
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <label>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Way of Delivery</label>
                                <select
                                    name="wayOfDelivery"
                                    value={formData.wayOfDelivery}
                                    onChange={handleChange}
                                >
                                    <option value="post office">Post Office</option>
                                    <option value="courier">Courier</option>
                                    <option value="email">Email</option>
                                </select>
                            </td>
                            <td colSpan="2">
                                <label>Reviews</label>
                                <input
                                    type="text"
                                    name="reviews"
                                    value={formData.reviews}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LetterForm;
