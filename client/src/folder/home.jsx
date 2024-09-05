import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../nav and fot/navbar'; // Adjust import as needed
import axios from "axios";

const HomePage = () => {
    const location = useLocation();
    const { userId } = location.state || {}; 
    const [userName, setUserName] = React.useState('');
    const [folders, setFolders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    console.log("File data:", folders);

    const navigate = useNavigate();


    React.useEffect(() => {
        const fetchUserNameAndFolders = async () => {
            try {
                if (!userId) {
                    throw new Error("No userId provided.");
                }

                const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
                if (userResponse.status !== 200) {
                    throw new Error('Failed to fetch user');
                }
                const userData = userResponse.data;
                setUserName(userData.name);

                const foldersResponse = await axios.get(`http://localhost:3000/users/${userId}/folders`);
                if (foldersResponse.status !== 200) {
                    throw new Error('Failed to fetch folders');
                }
                const foldersData = foldersResponse.data;
                setFolders(foldersData.folderDetails || []); 
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserNameAndFolders();
        } else {
            setError('No user found.');
            setLoading(false);
        }
    }, [userId, refresh]);

    const handleDel = async (index) => {
        try {
            const folderId = folders[index]._id;
            const result = await axios.delete(`http://localhost:3000/users/${userId}/folders/${folderId}`);
    
            if (result.data.message === 'success') {
                setRefresh(prev => !prev); 
            }
        } catch (error) {
            console.error('Failed to delete folder:', error);
            setError('Failed to delete folder.');
        }
    };

    const handleEdit = (index) => {
        const folderId = folders[index]._id;
        navigate('/folderEdit', { state: { folderId, userId } });
    };

    const addNew = () => {
        navigate(`/folderDetails/${userId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (folders.length === 0) return <p>No folder data available</p>;

    const cellStyle = { border: '1px solid black', padding: '8px', textAlign: 'left' };
    const headerStyle = { ...cellStyle, backgroundColor: 'rgb(23, 140, 235)' };

    return (
        <>
            <Nav />
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    backgroundColor: '#b0d4f1',  // Darker blue background
                    padding: '15px 20px',         // Padding for better spacing
                    marginTop: '10px',            // Small margin on top to separate from the navbar
                }}>
                    <h1>Folder Details</h1>
                    <button 
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px', // Added right margin
                        }} 
                        onClick={addNew}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        NEW
                    </button>
                </div>
                
                <h2>NAME: {userName}</h2>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Room Number</th>
                            <th style={headerStyle}>Shelf Number</th>
                            <th style={headerStyle}>Lateral Number</th>
                            <th style={headerStyle}>Volume Number</th>
                            <th style={headerStyle}>File Cabinet Number</th>
                            <th style={headerStyle}>Date Opened</th>
                            <th style={headerStyle}>Date Closed</th>
                            <th style={headerStyle}>Remark</th>
                            <th style={headerStyle}>Actions</th>
                            <th style={headerStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'white' }}>
                        {folders.map((folder, index) => (
                            <tr key={index}>
                                <td style={cellStyle}>{folder.roomNumber}</td>
                                <td style={cellStyle}>{folder.shelfNumber}</td>
                                <td style={cellStyle}>{folder.lateralNumber}</td>
                                <td style={cellStyle}>{folder.volumeNumber}</td>
                                <td style={cellStyle}>{folder.fileCabinetNumber}</td>
                                <td style={cellStyle}>{new Date(folder.dateOpened).toLocaleDateString()}</td>
                                <td style={cellStyle}>{folder.dateClosed ? new Date(folder.dateClosed).toLocaleDateString() : 'N/A'}</td>
                                <td style={cellStyle}>{folder.remark}</td>
                                <td style={cellStyle}>
                                    <button 
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
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HomePage;
