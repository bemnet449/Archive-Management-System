import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './details.css';
import Nav from '../nav and fot/navbar';

const Fdetails = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [roomNumber, setRoomNumber] = useState('');
  const [shelfNumber, setShelfNumber] = useState('');
  const [lateralNumber, setLateralNumber] = useState('');
  const [volumeNumber, setVolumeNumber] = useState('');
  const [fileCabinetNumber, setFileCabinetNumber] = useState('');
  const [dateOpened, setDateOpened] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setName(response.data.name); // Adjust based on your API response
      } catch (error) {
        console.error('Error fetching user name:', error);
        setError('Failed to fetch user name.');
      }
    };

    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!roomNumber || !shelfNumber || !lateralNumber || !volumeNumber || !fileCabinetNumber || !dateOpened) {
      setError('Please fill in all required fields');
      return;
    }

    const folderData = {
      roomNumber,
      shelfNumber,
      lateralNumber,
      volumeNumber,
      fileCabinetNumber,
      dateOpened,
      dateClosed,
      remark,
    };

    try {
      const result = await axios.post(`http://localhost:3000/users/${userId}`, { folderDetails: [folderData] });

      if (result.data.status === 'success') {
        setSuccessMessage('Folder details saved successfully');
        setTimeout(() => navigate('/fullNameSearchResults', { state: { folderData, userId } }), 1000);
      } else {
        setError(result.data.message || 'Failed to save folder details.');
      }
    } catch (error) {
      setError('An error occurred while saving the folder details');
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div className="fdetails-container">
        <h1>{name}</h1>
        <form>
          <div className="fdetails-header">
            <button type="button" onClick={handleSave}>SAVE</button>
          </div>
          <div className="fdetails-form">
            <table>
              <tbody>
                <tr className="fdetails-row1">
                  <td className="fdetails-field">
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      id="roomNumber"
                      type="number"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                    />
                  </td>
                  <td className="fdetails-field">
                    <label htmlFor="shelfNumber">Shelf Number</label>
                    <input
                      id="shelfNumber"
                      type="number"
                      value={shelfNumber}
                      onChange={(e) => setShelfNumber(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr className="fdetails-row2">
                  <td className="fdetails-field">
                    <label htmlFor="lateralNumber">Lateral Number</label>
                    <input
                      id="lateralNumber"
                      type="number"
                      value={lateralNumber}
                      onChange={(e) => setLateralNumber(e.target.value)}
                      required
                    />
                  </td>
                  <td className="fdetails-field">
                    <label htmlFor="volumeNumber">Volume Number</label>
                    <input
                      id="volumeNumber"
                      type="number"
                      value={volumeNumber}
                      onChange={(e) => setVolumeNumber(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr className="fdetails-row3">
                  <td className="fdetails-field">
                    <label htmlFor="fileCabinetNumber">File Cabinet Number</label>
                    <input
                      id="fileCabinetNumber"
                      type="number"
                      value={fileCabinetNumber}
                      onChange={(e) => setFileCabinetNumber(e.target.value)}
                      required
                    />
                  </td>
                  <td className="fdetails-field">
                    <label htmlFor="dateOpened">Date Opened</label>
                    <input
                      id="dateOpened"
                      type="date"
                      value={dateOpened}
                      onChange={(e) => setDateOpened(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr className="fdetails-row4">
                  <td className="fdetails-field">
                    <input
                      id="dateClosedCheckbox"
                      type="checkbox"
                      checked={dateClosed !== ''}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDateClosed(dateOpened);
                        } else {
                          setDateClosed('');
                        }
                      }}
                    />
                    <label htmlFor="dateClosedCheckbox">Date Closed</label>
                    <input
                      id="dateClosed"
                      type="date"
                      value={dateClosed}
                      onChange={(e) => setDateClosed(e.target.value)}
                      disabled={dateClosed === ''}
                    />
                  </td>
                </tr>
                <tr className="remarks-row">
                  <td colSpan="2" className="fdetails-field">
                    <label htmlFor="remark">Remark</label>
                    <textarea
                      id="remark"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Fdetails;
