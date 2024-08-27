import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";

const Fbn = () => {
    const location = useLocation();
    const { name, fatherName, grandfatherName } = location.state || {};

    const [userData, setUserData] = useState({
        name: name  ||'',
        fatherName: fatherName ||  '',
        grandfatherName: grandfatherName  ||''
    });

    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        setUserData({
            name: name || '',
            fatherName: fatherName || '',
            grandfatherName: grandfatherName || ''
        });
    }, [name, fatherName, grandfatherName]);

    const handleSearch = async () => {
        try {
            const result = await axios.post('http://localhost:3000/searchFileMovements', userData);

            if (result.data.message === 'success') {
                setTableData(result.data.data);
                setError('');
            } else {
                setTableData([]);
                setError('No records found');
            }
        } catch (error) {
            console.error('Error searching for file movements:', error);
            setError('An error occurred while searching.');
        }
    };

    const styles = {
        container: {
            padding: '20px',
            width: '100%',
            margin: '0 auto',
        },
        formTable: {
            width: '90%',
            marginBottom: '20px',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '15px',
            border: '2px solid black',
        },
        formTableTd: {
            padding: '10px',
            textAlign: 'left',
            backgroundColor: 'white',
            border: 'none',
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
            textAlign: 'left',
            backgroundColor: 'rgb(23, 140, 235)',
            color: 'white',
        },
        tableTd: {
            padding: '10px',
            textAlign: 'left',
            backgroundColor: 'white',
            borderBottom: '1px solid black',
            borderRight: '2px solid black',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
        },
        buttonHover: {
            backgroundColor: '#0069d9',
        },
        headerContainer: {
            height: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            backgroundColor: 'rgb(23, 140, 235)',
            padding: '15px 20px',
            margin: '10px 0',
        },
        headerButton: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            marginTop: '10px',
        }
    };
    return (
        <>
            <Nav />
            <div style={styles.container}>
                <table style={styles.formTable}>
                    <tbody>
                        <tr>
                            <td style={styles.formTableTd}>
                                <label>NAME</label><br />
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </td>
                            <td style={styles.formTableTd}>
                                <label>FNAME</label><br />
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={userData.fatherName}
                                    onChange={(e) => setUserData({ ...userData, fatherName: e.target.value })}
                                />
                            </td>
                            <td style={styles.formTableTd}>
                                <label>GFNAME</label><br />
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={userData.grandfatherName}
                                    onChange={(e) => setUserData({ ...userData, grandfatherName: e.target.value })}
                                />
                            </td>
                            <td style={styles.formTableTd}>
                                <button 
                                    style={styles.button}
                                    onClick={handleSearch}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                                >
                                    Search
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {error && <div style={styles.error}>{error}</div>}
                <div style={styles.headerContainer}>
                    <h2>Search Results</h2>
                </div>
                <div className="list">
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableTh}>NAME</th>
                                <th style={styles.tableTh}>FATHER NAME</th>
                                <th style={styles.tableTh}>G.FATHER NAME</th>
                                <th style={styles.tableTh}>ORGANIZATION NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((data, index) => (
                                    <tr key={index}>
                                        <td style={styles.tableTd}>{data.requesterName}</td>
                                        <td style={styles.tableTd}>{data.fatherName}</td>
                                        <td style={styles.tableTd}>{data.grandfatherName}</td>
                                        <td style={styles.tableTd}>{data.organizationName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={styles.tableTd}>No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
            </div>
        </>
    );
};

export default Fbn;