import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../nav and fot/navbar'; // Adjust the import path as necessary

const FileSearch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data: initialData } = location.state || { data: [] }; // Default to an empty array if no data
    const [data, setData] = useState(initialData);

    // Function to handle deleting a file movement
    const handleDelete = async (index) => {
        try {
            const Id = data[index]._id;  
            

            // Make a DELETE request to the backend with the file's unique ID
            const response = await axios.delete(`http://localhost:3000/file-movements/delete/${Id}`);
    
            if (response.status === 200) {
                alert('File movement deleted successfully.');

                // Update the state to remove the deleted entry from the UI
                setData(prevData => prevData.filter((_, i) => i !== index));
            } else {
                alert('Failed to delete file movement.');
            }
        } catch (error) {
            console.error('Error deleting file movement:', error.response?.data || error.message);
            alert('An error occurred while deleting the file movement.');
        }
    };

    const handleReturn = (index) => {
        const Id = data[index]._id;
        navigate('/file-movement-edit', { state: { Id } });
    };
    
    const addNew = () => {
        navigate(`/file-tracking`);
    };
    
    // Styling for the component
    const styles = {
        container: {
            padding: '20px',
            width: '100%',
            margin: '0 auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            border: '2px solid black',
        },
        tableTh: {
            borderBottom: '2px solid black',
            borderRight: '2px solid black',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'rgb(23, 140, 235)',
            color: 'white',
        },
        tableTd: {
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'white',
            borderBottom: '1px solid black',
            borderRight: '2px solid black',
        },
        button: {
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: '#1787fe',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <Nav />
            <div style={styles.container}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    backgroundColor: '#b0d4f1',
                    padding: '15px 20px',
                    marginTop: '10px',
                }}>
                    <h1>Folder Movements</h1>
                    <button 
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }} 
                        onClick={addNew}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        NEW
                    </button>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableTh}>File Number</th>
                            <th style={styles.tableTh}>Organization Name</th>
                            <th style={styles.tableTh}>Volume Number</th>
                            <th style={styles.tableTh}>Requestor Name</th>
                            <th style={styles.tableTh}>Receiver Name</th>
                            <th style={styles.tableTh}>Page of the Folder</th>
                            <th style={styles.tableTh}>Borrowing Date</th>
                            <th style={styles.tableTh}>Page of the Returned Folder</th>
                            <th style={styles.tableTh}>Return Date</th>
                            <th style={styles.tableTh}>Remarks</th>
                            <th style={styles.tableTh}>Approval Reason</th>
                            <th style={styles.tableTh} colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((fm, index) => (
                            <tr key={fm._id}>
                                <td style={styles.tableTd}>{fm.fileNumber}</td>
                                <td style={styles.tableTd}>{fm.organizationName}</td>
                                <td style={styles.tableTd}>{fm.volumeNumber}</td>
                                <td style={styles.tableTd}>{`${fm.requestorName} ${fm.requestorFatherName} ${fm.requestorGrandfatherName}`}</td>
                                <td style={styles.tableTd}>{`${fm.receiverName} ${fm.receiverFatherName} ${fm.receiverGrandfatherName}`}</td>
                                <td style={styles.tableTd}>{fm.pagesWhenBorrowed}</td>
                                <td style={styles.tableTd}>{new Date(fm.borrowingDate).toLocaleDateString()}</td>
                                <td style={styles.tableTd}>{fm.pagesWhenReturned}</td>
                                <td style={styles.tableTd}>
                                    {fm.returnDate ? new Date(fm.returnDate).toLocaleDateString() : 'Not Returned'}
                                </td>
                                <td style={styles.tableTd}>{fm.remarks}</td>
                                <td style={styles.tableTd}>{fm.approvalReason || 'None'}</td>
                                <td style={styles.tableTd}>
                                    {/* Conditionally render the Return button */}
                                    {!fm.returnDate && (
                                        <button style={styles.button} onClick={() => handleReturn(index)}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}>
                                            Return
                                        </button>
                                    )}
                                </td>
                                <td style={styles.tableTd}>
                                    <button 
                                        style={{ ...styles.button, backgroundColor: 'red' }} 
                                        onClick={() => handleDelete(index)}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkred'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileSearch;
