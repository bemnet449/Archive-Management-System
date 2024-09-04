import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from "../nav and fot/navbar";

const Lsearch = () => {
    const location = useLocation();
    const fileData = location.state || []; // Receives data passed via navigate

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
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((item, index) => (
                            <tr key={index}>
                                <td style={styles.tableTd}>{index + 1}</td>
                                <td style={styles.tableTd}>{item.title}</td>
                                <td style={styles.tableTd}>{item.caseType}</td>
                                <td style={styles.tableTd}>{item.letterNumber}</td>
                                <td style={styles.tableTd}>{item.nameOfOrg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1787fe'}
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Lsearch;
