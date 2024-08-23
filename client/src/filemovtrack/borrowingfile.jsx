import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for React Router v6
import Nav from "../nav and fot/navbar";
import "./borrowstyle.css";

const Fileborrw = () => {
    const [receiverName, setReceiverName] = useState('');
    const [requestorName, setRequestorName] = useState('');
    const navigate = useNavigate(); // Correct hook for navigation in React Router v6

    const handleSearch = async () => {
        const nameParts = requestorName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1] || '';
        const grandfatherName = nameParts[2] || '';

        // Navigate to the desired route with state
        navigate('/fbn', { state: { name, fatherName, grandfatherName } });
    };

    const handleSearch2 = async () => {
        const nameParts = receiverName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1] || '';
        const grandfatherName = nameParts[2] || '';

        // Navigate to the desired route with state
        navigate('/fbn', { state: { name, fatherName, grandfatherName } });
    };

    return (
        <>
            <Nav />
            <div className="file-borrow-container">
                <div className="button-group">
                    <button type="button" onClick={handleSave}>SAVE</button>
                    <button type="button" onClick={handleDelete}>NEW</button>
                </div>
               
                <form className="file-borrow-form">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>File Number</label>
                                    <input type="number" />
                                    <button type="button" onClick={handleSearch}>Search</button>
                                </td>
                                <td colSpan="3">
                                    <label>Owner of Folder</label>
                                    <input 
                                        type="text" 
                                        value={receiverName} 
                                        onChange={(e) => setReceiverName(e.target.value)} 
                                    />
                                    <button type="button" onClick={handleSearch2}>Search</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Volume</label>
                                    <input type="number" />
                                </td>
                                <td>
                                    <label>Name of Receiver</label>
                                    <input 
                                        type="text" 
                                        value={receiverName} 
                                        onChange={(e) => setReceiverName(e.target.value)} 
                                    />
                                    <button type="button" onClick={handleSearch2}>Search</button>
                                </td>
                                <td>
                                    <label>Name of Requestor</label>
                                    <input 
                                        type="text" 
                                        value={requestorName} 
                                        onChange={(e) => setRequestorName(e.target.value)} 
                                    />
                                    <button type="button" onClick={handleSearch}>Search</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Borrowing Date</label>
                                    <input type="date" />
                                </td>
                                <td>
                                    <label>Page of Folder</label>
                                    <input type="number" />
                                </td>
                                <td>
                                    <label>Returning Date</label>
                                    <input type="date" />
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <label>Number of Returned Pages</label>
                                    <input type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <label>Review</label>
                                    <textarea placeholder="Reviews"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default Fileborrw;
