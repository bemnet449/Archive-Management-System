import React from 'react';
import { useLocation } from "react-router-dom";
import Nav from "../nav and fot/navbar"; // Import the Nav component

const SdS = () => {
    const location = useLocation();
    const { scanfile = {} } = location.state || {}; // Destructure with a default empty object

    // Log the location and scanfile to debug
    console.log('Location state:', location.state);
    console.log('Scanfile:', scanfile);

    return (
        <>
            <Nav /> {/* Add the Nav component */}
            <div>
                <h2>Scanned Document Details</h2>
                {scanfile && Object.keys(scanfile).length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', border: '2px solid black' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f0f0', color: '#333', fontWeight: 'bold', borderBottom: '2px solid black' }}>
                                <th style={{ border: '1px solid black' }}>Volume Number</th>
                                <th style={{ border: '1px solid black' }}>Document Type</th>
                                <th style={{ border: '1px solid black' }}>Content</th>
                                <th style={{ border: '1px solid black' }}>Keywords</th>
                                <th style={{ border: '1px solid black' }}>Additional Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black' }}>{scanfile.volumenum || 'N/A'}</td>
                                <td style={{ border: '1px solid black' }}>{scanfile.doctype || 'N/A'}</td>
                                <td style={{ border: '1px solid black' }}>{scanfile.content || 'N/A'}</td>
                                <td style={{ border: '1px solid black' }}>{scanfile.keyword || 'N/A'}</td>
                                <td style={{ border: '1px solid black' }}>{scanfile.addinfo || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No scan file data available.</p>
                )}
            </div>
        </>
    );
};

export default SdS;
