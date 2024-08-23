import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./foldercss.css";
import axios from "axios";
import Nav from "../nav and fot/navbar";

const Folder = () => {
    const [folderNumber, setFolderNumber] = useState('');
    const [folderType, setFolderType] = useState('');
    const [organizationName, setOrganizationName] = useState('ETTE');
    const [folderStatus, setFolderStatus] = useState('Active');
    const [caseType, setCaseType] = useState('Salary Study');
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [grandfatherName, setGrandfatherName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/search', { folderNumber });
            
            if (response.data.status === "success") {
                navigate('/u', { state: { users: response.data.users } });
            } else {
                console.error("Search failed:", response.data.message);
                // Handle unsuccessful search
            }
        } catch (error) {
            console.error("An error occurred during the search:", error);
            // Handle error case
        }
    };
    
    const handleSearch2 = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/search2',{name,fatherName,grandfatherName})

            if (response.data.status === "success") {
                navigate('/results', { state: { userId: response.data.id } });
            } else {
                console.error("Search failed:", response.data.message);
                // Handle unsuccessful search
            }

        } catch(error){
            console.error("An error occurred during the search:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
      
        if (!folderNumber || !name || !fatherName || !grandfatherName) {
            setError('Please fill in all required fields');
            return;
        }
      
        const folderData = {
          folderNumber,
          folderType,
          organizationName,
          folderStatus,
          caseType,
          name,
          fatherName,
          grandfatherName,
          remarks,
        };
      
        try {
          const result = await axios.post("http://localhost:3000/foldersave", folderData);
      
          if (result.data.status === "success") {
            const userId = result.data.userId;
            navigate(`/fd/${userId}`);
          } else {
            setError(result.data.message);
          }
        } catch (error) {
          setError('An error occurred while saving the data');
          console.error(error);
        }
    };
      
    const handleDelete = (e) => {
        e.preventDefault();
        // Delete functionality here
    };

    return (
        <>
        <Nav/>
        <div className="folder-container">
            <form>
                <div className="folder-header">
                    <button type="button" onClick={handleSave}>SAVE</button>
                    <button type="button" onClick={handleDelete}>DELETE</button>
                </div>
                <div className="form">
                    <table>
                        <tbody>
                            <tr className="row1">
                                <td className="form-row1">
                                    <label htmlFor="folderNumber">Folder Number</label><br />
                                    <input
                                        id="folderNumber"
                                        type="number"
                                        value={folderNumber}
                                        onChange={(e) => setFolderNumber(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={handleSearch}>Search</button>
                                </td>
                                <td className="form-row2">
                                    <label htmlFor="folderType">Folder Type</label><br />
                                    <input
                                        id="folderType"
                                        type="text"
                                        placeholder="folder type"
                                        value={folderType}
                                        onChange={(e) => setFolderType(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="row2">
                                <td className="form-row3">
                                    <label htmlFor="organizationName">Organization Name</label><br />
                                    <select
                                        id="organizationName"
                                        value={organizationName}
                                        onChange={(e) => setOrganizationName(e.target.value)}
                                    >
                                        <option>ETTE</option>
                                        <option>Other</option>
                                    </select>
                                </td>
                                <td className="form-row4">
                                    <label htmlFor="folderStatus">Folder Status</label><br />
                                    <select
                                        id="folderStatus"
                                        value={folderStatus}
                                        onChange={(e) => setFolderStatus(e.target.value)}
                                    >
                                        <option>Active</option>
                                        <option>Semiactive</option>
                                        <option>Dead</option>
                                    </select>
                                </td>
                                <td className="form-row5">
                                    <label htmlFor="caseType">Case Type</label><br />
                                    <select
                                        id="caseType"
                                        value={caseType}
                                        onChange={(e) => setCaseType(e.target.value)}
                                    >
                                        <option>Salary Study</option>
                                        <option>Type 2</option>
                                        <option>Type 3</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-row6 name-row">
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="fatherName">Father's Name</label>
                            <input
                                id="fatherName"
                                type="text"
                                required
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="grandfatherName">Grandfather's Name</label>
                            <input
                                id="grandfatherName"
                                type="text"
                                required
                                value={grandfatherName}
                                onChange={(e) => setGrandfatherName(e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={handleSearch2}>Search</button>
                    </div>
                    <div className="form-row remarks-row">
                        <label htmlFor="remarks">REMARK :</label><br />
                        <textarea
                            id="remarks"
                            placeholder="REMARKS"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
        </div>
        </>
    );
};

export default Folder;
