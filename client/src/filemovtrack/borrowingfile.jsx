import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";
import "./borrowstyle.css";

const Fileborrw = () => {
    const [fileNumber, setFileNumber] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [volumeNumber, setVolumeNumber] = useState('');
    const [requestorName, setRequestorName] = useState('');
    const [requestorFatherName, setRequestorFatherName] = useState('');
    const [requestorGrandfatherName, setRequestorGrandfatherName] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverFatherName, setReceiverFatherName] = useState('');
    const [receiverGrandfatherName, setReceiverGrandfatherName] = useState('');
    const [borrowingDate, setBorrowingDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [pagesWhenBorrowed, setPagesWhenBorrowed] = useState('');
    const [pagesWhenReturned, setPagesWhenReturned] = useState('');
    const [remarks, setRemarks] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const nameParts = requestorName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1]  ||'';
        const grandfatherName = nameParts[2]  || '';

        navigate('/fbn', { state: { name, fatherName, grandfatherName } });
    };

    const handleSearch2 = () => {
        const nameParts = receiverName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1] || '';
        const grandfatherName = nameParts[2] || '';

        navigate('/fbn', { state: { name, fatherName, grandfatherName } });
    };

    const handleSearch3 = async () => {
        try {
            const result = await axios.post('http://localhost/search-file', { fileNumber });
            console.log(result.data);
        } catch (error) {
            console.error("There was an error searching for the file", error);
        }
    };

    const handleSave = async () => {
        const requestorNameParts = requestorName.trim().split(' ');
        const requestorFirstName = requestorNameParts[0] || '';
        const requestorFatherName = requestorNameParts[1] || '';
        const requestorGrandfatherName = requestorNameParts[2] ||  '';
    
        const receiverNameParts = receiverName.trim().split(' ');
        const receiverFirstName = receiverNameParts[0] || '';
        const receiverFatherName = receiverNameParts[1] || '';
        const receiverGrandfatherName = receiverNameParts[2] ||  '';
    
        const filedetails = {
            fileNumber,
            organizationName,
            volumeNumber,
            requestorName: requestorFirstName,
            requestorFatherName,
            requestorGrandfatherName,
            receiverName: receiverFirstName,
            receiverFatherName,
            receiverGrandfatherName,
            borrowingDate,
            returnDate,
            pagesWhenBorrowed,
            pagesWhenReturned,
            remarks
        };
    
        try {
            const result = await axios.post('http://localhost:3000/Arv', filedetails);
            if (result.data.message === "success") {
                navigate('/folder');
            }
        } catch (error) {
            console.error("There was an error saving the file details", error);
        }
    };
    const handleDelete = () => {
        // Implement delete functionality
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
                                    <input 
                                        type="number" 
                                        value={fileNumber} 
                                        onChange={(e) => setFileNumber(e.target.value)} 
                                    />
                                    <button type="button" onClick={handleSearch3}>Search</button>
                                </td>
                                <td colSpan={'3'}>
                                    <label>Organization Name</label>
                                    <input 
                                        type="text" 
                                        value={organizationName} 
                                        onChange={(e) => setOrganizationName(e.target.value)} 
                                    />
                                </td>         
                            </tr>
                            <tr>
                            <td>
                                    <label>Volume Number</label>
                                    <input 
                                        type="number" 
                                        value={volumeNumber} 
                                        onChange={(e) => setVolumeNumber(e.target.value)} 
                                    />
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
                                <td>
                                    <label>Name of Receiver</label>
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
                                    <label>Borrowing Date</label>
                                    <input 
                                        type="date" 
                                        value={borrowingDate} 
                                        onChange={(e) => setBorrowingDate(e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <label>Page of Folder</label>
                                    <input 
                                        type="number" 
                                        value={pagesWhenBorrowed} 
                                        onChange={(e) => setPagesWhenBorrowed(e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <label>Returning Date</label>
                                    <input 
                                        type="date" 
                                        value={returnDate} 
                                        onChange={(e) => setReturnDate(e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <label>Number of Returned Pages</label>
                                    <input 
                                        type="number" 
                                        value={pagesWhenReturned} 
                                        onChange={(e) => setPagesWhenReturned(e.target.value)} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <label>Remarks</label>
                                    <textarea 
                                        placeholder="Reviews" 
                                        value={remarks} 
                                        onChange={(e) => setRemarks(e.target.value)}
                                    ></textarea>
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