import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../nav and fot/navbar'; // Adjust the import path as necessary

const FileSearch = () => {
    const location = useLocation();
    const { data } = location.state || { data: [] }; // Default to an empty array if no data

    const handleDel=()=>{
        
    }
    const handleEdit=()=>{

    }

    const styles = {
        container: {
            padding: '20px',
            width: '90%',
            margin: '0 auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            border: '2px solid black', // Outer border for the table
        },
        tableTh: {
            borderBottom: '2px solid black', // Inner border for table header cells
            borderRight: '2px solid black',
            padding: '10px',
            textAlign: 'left',
            backgroundColor: 'rgb(23, 140, 235)',
            color: 'white',
        },
        tableTd: {
            padding: '10px',
            textAlign: 'left',
            backgroundColor: 'white',
            borderBottom: '1px solid black', // Inner border for table cells
            borderRight: '2px solid black',
        },
        headerContainer: {
            marginBottom: '20px',
        }
    };

    return (
        <div>
            <Nav /> {/* Add the Nav component here */}
            <div style={styles.container}>
                <h1>File Movements</h1>
                <div style={styles.headerContainer}>
                    {/* You can add any additional header content or styling here */}
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableTh}>File Number</th>
                            <th style={styles.tableTh}>Sender Name</th>
                            <th style={styles.tableTh}>Receiver Name</th>
                            <th style={styles.tableTh}>Borrowing Date</th>
                            <th style={styles.tableTh}>Return Date</th>
                            <th style={styles.tableTh}>Remarks</th>
                            <th style={styles.tableTh}>Organization Name</th>
                            <th style={styles.tableTh}>Volume Number</th>
                            <th style={styles.tableTh}>action</th>
                            <th style={styles.tableTh}>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.data && data.data.map((fm, index) => (
                            <tr key={index}>
                                <td style={styles.tableTd}>{fm.fileNumber}</td>
                                <td style={styles.tableTd}>{fm.senderName}</td>
                                <td style={styles.tableTd}>{fm.receiverName}</td>
                                <td style={styles.tableTd}>{new Date(fm.borrowingDate).toLocaleDateString()}</td>
                                <td style={styles.tableTd}>{new Date(fm.returnDate).toLocaleDateString()}</td>
                                <td style={styles.tableTd}>{fm.remarks}</td>
                                <td style={styles.tableTd}>{fm.organizationName}</td>
                                <td style={styles.tableTd}>{fm.volumeNumber}</td>
                                <td> <button 
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginRight: '5px',
                                        }}
                                        onClick={() => handleDel(index)}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkred'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td style={cellStyle}>
                                    <button 
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEdit(index)}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                                    >
                                        EDIT
                                    </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileSearch;
