import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from "../nav and fot/navbar";

const Lsearch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialFileData = location.state || []; // Receives data passed via navigate
    const [fileData, setFileData] = useState(initialFileData); // State to manage the datas

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
            backgroundColor: '#1787fe',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            marginRight: '10px',
        },
        deleteButton: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        sendButton: {
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '10px',
        },
    };

    // Function to handle deletion
    const handleDelete = async (index) => {
        try {
            const id = fileData[index]._id; // Updated to _id
            // Make a DELETE request to the backend
            const response = await axios.delete(`http://localhost:3000/Ldelete/${id}`);
            if (response.data.message === 'success') {
                alert("Deleted successfully");

                // Remove the deleted item from the state
                setFileData(fileData.filter(item => item._id !== id));
            } else {
                alert("Failed to delete the case.");
            }
        } catch (error) {
            console.error("Error deleting case:", error.response?.data?.message || error.message);
            alert("An error occurred while deleting. Please try again.");
        }
    };

    // Function to handle navigation
    const handleSend = (item) => {
        const id = item._id; // Get the _id of the item
        navigate('/send-letter', { state: { id } });
    };

    return (
        <>
            <Nav />
            <div style={styles.container}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    backgroundColor: '#b0d4f1',
                    padding: '15px 20px',
                }}>
                    <h1>Search Results</h1>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableTh}>#</th>
                            <th style={styles.tableTh}>TITLE</th>
                            <th style={styles.tableTh}>CASE TYPE</th>
                            <th style={styles.tableTh}>LETTER NUMBER</th>
                            <th style={styles.tableTh}>NAME OF ORG</th>
                            <th style={styles.tableTh}>EMPLOYEE</th>
                            <th style={styles.tableTh}>DECISION</th>
                            <th style={styles.tableTh}>DECISION DATE</th>
                            <th style={styles.tableTh}>DECISION DESCRIPTION</th>
                            <th style={styles.tableTh}>REMARK</th>
                            <th colSpan={2} style={styles.tableTh}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((item, index) => (
                            <tr key={item._id}> {/* Updated to _id */}
                                <td style={styles.tableTd}>{index + 1}</td>
                                <td style={styles.tableTd}>{item.title}</td>
                                <td style={styles.tableTd}>{item.caseType}</td>
                                <td style={styles.tableTd}>{item.letterNumber}</td>
                                <td style={styles.tableTd}>{item.nameOfOrg}</td>
                                <td style={styles.tableTd}>{item.employee || 'N/A'}</td>
                                <td style={styles.tableTd}>{item.decision || 'N/A'}</td>
                                <td style={styles.tableTd}>{item.decisionDate ? new Date(item.decisionDate).toLocaleDateString() : 'N/A'}</td>
                                <td style={styles.tableTd}>{item.decisionDescription || 'N/A'}</td>
                                <td style={styles.tableTd}>{item.remark || 'N/A'}</td>
                                <td style={styles.tableTd}>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td style={styles.tableTd}>
                                    {item.decision ? (
                                        <button
                                            style={{ ...styles.sendButton, backgroundColor: '#9e9e9e', cursor: 'not-allowed' }} // Disabled style
                                            disabled
                                        >
                                            Sent
                                        </button>
                                    ) : (
                                        <button
                                            style={styles.sendButton}
                                            onClick={() => handleSend(item)}
                                        >
                                            Send Letter
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Lsearch;
