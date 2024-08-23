import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../nav and fot/navbar';

const ResultsPage = () => {
    const location = useLocation();
    const { users } = location.state || { users: [] }; // Default to empty array if no users are passed

    return (
        <>
            <Nav />
            <div>
                <h1>Search Results</h1>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead style={{ backgroundColor: 'gray', color: 'white' }}>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Father's Name</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Grandfather's Name</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'white' }}>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.fatherName}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{user.grandfatherName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ResultsPage;
