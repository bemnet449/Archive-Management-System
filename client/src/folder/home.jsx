import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../nav and fot/navbar'; // Adjust import as needed
import axios from "axios";

const HomePage = () => {
    const location = useLocation();
    console.log("Location state:", location.state); // Debug log
    const { userId } = location.state || {}; // Correct destructuring
    const [userName, setUserName] = React.useState('');
    const [folders, setFolders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [refresh, setRefresh] = React.useState(false); // State for refreshing the data

    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchUserNameAndFolders = async () => {
            console.log("Fetching data..."); // Debug log
            try {
                if (!userId) {
                    throw new Error("No userId provided.");
                }

                const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user');
                }
                const userData = await userResponse.json();
                console.log("User data:", userData); // Debug log
                setUserName(userData.name);

                const foldersResponse = await fetch(`http://localhost:3000/users/${userId}/folders`);
                if (!foldersResponse.ok) {
                    throw new Error('Failed to fetch folders');
                }
                const foldersData = await foldersResponse.json();
                console.log("Folders data:", foldersData); // Debug log
                setFolders(foldersData.folderDetails || []); // Ensure an empty array if no data
            } catch (error) {
                setError('Error fetching data: ' + error.message);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserNameAndFolders();
        } else {
            setError('No user found.'); // Display this when userId is not provided
            setLoading(false);
        }
    }, [userId, refresh]); // Added refresh as a dependency

    const handleDel = async (index) => {
        try {
            const folderId = folders[index]._id;
            const result = await axios.delete(`http://localhost:3000/users/${userId}/folders/${folderId}`); // Correct URL construction
    
            if (result.data.message === 'success') {
                setRefresh(prev => !prev); // Trigger a refresh to fetch updated data
            }
        } catch (error) {
            console.error('Failed to delete folder:', error);
            setError('Failed to delete folder.');
        }
    };

    const handleEdit = (index) => {
        const folderId = folders[index]._id;
        navigate('/fdedit', { state: { folderId, userId } });
    };

    const addNew = () => {
        navigate(`/fd/${userId}`); // Correct URL construction
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (folders.length === 0) return <p>No folder data available</p>;

    const cellStyle = { border: '1px solid black', padding: '8px', textAlign: 'left' };
    const headerStyle = { ...cellStyle, backgroundColor: 'rgb(23, 140, 235)', textAlign: 'center' };
    return (
        <>
            <Nav />
            <div>
                <h1>Folder Details</h1>
                <button onClick={addNew}>NEW</button>
                <hr />
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
                            <th colSpan={2} style={headerStyle} >Actions</th>
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
                                    <button onClick={() => handleDel(index)}>Delete</button>
                                </td>
                                <td style={cellStyle}>
                                    <button onClick={() => handleEdit(index)}>EDIT</button>
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