import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./borrowstyle.css";
import axios from 'axios';

const ReturnFile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { Id } = location.state || {}; // Use default empty object to avoid destructuring errors

    const [borrowedDetails, setBorrowedDetails] = useState({});
    const [returnDate, setReturnDate] = useState('');
    const [pagesWhenReturned, setPagesWhenReturned] = useState('');
    const [approvalReason, setApprovalReason] = useState('');
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (!Id) {
            alert('File movement ID is missing');
            return;
        }

        const fetchBorrowedDetails = async () => {
            try {
                console.log(`Fetching details for file movement ID: ${Id}`); // Debugging log
                const response = await axios.get(`http://localhost:3000/file-movements/${Id}`);
                if (response.status === 200) {
                    setBorrowedDetails(response.data);
                    setReturnDate(response.data.returnDate ? new Date(response.data.returnDate).toISOString().split('T')[0] : '');
                    setPagesWhenReturned(response.data.pagesWhenReturned || '');
                    setApprovalReason(response.data.approvalReason || '');
                } else {
                    alert('Failed to fetch borrowed file details.');
                }
            } catch (error) {
                console.error('Error fetching borrowed file details:', error);
                alert(`An error occurred while fetching borrowed file details: ${error.response?.data?.message || error.message}`);
            }
        };

        fetchBorrowedDetails();
    }, [Id]);

    const handleSave = async () => {
        if (!returnDate || !pagesWhenReturned) {
            setError('Please fill all fields.');
            return;
        }
    
        if (parseInt(pagesWhenReturned) < borrowedDetails.pagesWhenBorrowed) {
            setWarning('The returned pages are less than what was borrowed. Please provide a reason for approval.');
            if (!approvalReason) {
                return;
            }
        }
    
        try {
            const response = await axios.put(`http://localhost:3000/file-movements/return/${Id}`, {
                returnDate,
                pagesWhenReturned,
                approvalReason: approvalReason || null,
            });
    
            if (response.status === 200) {
                alert('File returned successfully.');
    
                // Navigate back to the search page and pass the updated data as state
                navigate('/file-tracking'); 
            } else {
                alert('Failed to return the file.');
            }
        } catch (error) {
            console.error('Error returning file:', error.response?.data || error.message);
            alert('An error occurred while returning the file.');
        }
    };
    
    return (
        <div className="file-borrow-container">
            <h1>Return Borrowed File</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {warning && <p style={{ color: 'orange' }}>{warning}</p>}
            <div className="file-borrow-form">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>File Number:</label>
                                <input type="text" value={borrowedDetails.fileNumber || ''} readOnly />
                            </td>
                            <td>
                                <label>Organization Name:</label>
                                <input type="text" value={borrowedDetails.organizationName || ''} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Requester Name:</label>
                                <input 
                                    type="text" 
                                    value={`${borrowedDetails.requestor?.name || ''} ${borrowedDetails.requestor?.fatherName || ''} ${borrowedDetails.requestor?.grandfatherName || ''}`} 
                                    readOnly 
                                />
                            </td>
                            <td>
                                <label>Receiver Name:</label>
                                <input 
                                    type="text" 
                                    value={`${borrowedDetails.receiver?.name || ''} ${borrowedDetails.receiver?.fatherName || ''} ${borrowedDetails.receiver?.grandfatherName || ''}`} 
                                    readOnly 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Pages When Borrowed:</label>
                                <input type="number" value={borrowedDetails.pagesWhenBorrowed || ''} readOnly />
                            </td>
                            <td>
                                <label>Borrowing Date:</label>
                                <input type="text" value={borrowedDetails.borrowingDate ? new Date(borrowedDetails.borrowingDate).toLocaleDateString() : ''} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Return Date:</label>
                                <input 
                                    type="date" 
                                    value={returnDate} 
                                    onChange={(e) => setReturnDate(e.target.value)} 
                                />
                            </td>
                            <td>
                                <label>Pages When Returned:</label>
                                <input 
                                    type="number" 
                                    value={pagesWhenReturned} 
                                    onChange={(e) => setPagesWhenReturned(e.target.value)} 
                                />
                            </td>
                        </tr>
                        {parseInt(pagesWhenReturned) < borrowedDetails.pagesWhenBorrowed && (
                            <tr>
                                <td colSpan="2">
                                    <label>Approval Reason (Required if pages are less):</label>
                                    <textarea 
                                        value={approvalReason} 
                                        onChange={(e) => setApprovalReason(e.target.value)} 
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="button-group">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => navigate('/file-search')}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ReturnFile;
