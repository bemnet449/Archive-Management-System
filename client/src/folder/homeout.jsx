import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../nav and fot/navbar';

const HomePage1 = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [userName, setUserName] = React.useState('');
  const [folders, setFolders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchUserNameAndFolders = async () => {
      try {
        // Fetch user name
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await userResponse.json();
        setUserName(userData.name);

        // Fetch folder details
        const foldersResponse = await fetch(`http://localhost:3000/users/${userId}/folders`);
        if (!foldersResponse.ok) {
          throw new Error('Failed to fetch folders');
        }
        const foldersData = await foldersResponse.json();
        setFolders(foldersData.folderDetails || []);
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserNameAndFolders();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (folders.length === 0) {
    return <p>No folder data available</p>;
  }

  const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f0f0f0', // Light gray background for table header
  };

  return (
    <>
      <Nav />
      <div>
        <h1>Folder Details</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage1;
