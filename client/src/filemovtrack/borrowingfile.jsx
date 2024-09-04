import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav and fot/navbar";
import "./borrowstyle.css";

const Fileborrw = () => {
    const [fileNumber, setFileNumber] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [volumeNumber, setVolumeNumber] = useState('');
    const [requesterName, setRequesterName] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [borrowingDate, setBorrowingDate] = useState('');
    const [returnDate, setReturnDate] = useState(null); // Use null to represent not returned
    const [pagesWhenBorrowed, setPagesWhenBorrowed] = useState('');
    const [pagesWhenReturned, setPagesWhenReturned] = useState(0); // Default to 0
    const [remarks, setRemarks] = useState('');
    const navigate = useNavigate();

    const handleSearch3 = async () => {
        try {
            const result = await axios.post('http://localhost:3000/search-file', { fileNumber });
            if (result.data.message === "success") {
                navigate('/file-borrowed', { state: { data: result.data.data } });
            } else {
                console.error("No records found");
            }
        } catch (error) {
            console.error("There was an error searching for the file:", error);
        }
    };

    const handleSave = async () => {
        // Split the requester and receiver names
        const requesterNameParts = requesterName.trim().split(' ');
        const requesterFirstName = requesterNameParts[0] || '';
        const requesterFatherName = requesterNameParts[1] || '';
        const requesterGrandfatherName = requesterNameParts[2] || '';

        const receiverNameParts = receiverName.trim().split(' ');
        const receiverFirstName = receiverNameParts[0] || '';
        const receiverFatherName = receiverNameParts[1] || '';
        const receiverGrandfatherName = receiverNameParts[2] || '';

        // Create the file details object
        const filedetails = {
            fileNumber,
            organizationName,
            volumeNumber,
            requesterName: requesterFirstName,
            requesterFatherName: requesterFatherName,
            requesterGrandfatherName: requesterGrandfatherName,
            receiverName: receiverFirstName,
            receiverFatherName: receiverFatherName,
            receiverGrandfatherName: receiverGrandfatherName,
            borrowingDate,
            returnDate: returnDate || null, // Use null if not returned
            pagesWhenBorrowed,
            pagesWhenReturned, // Default to 0
            remarks,
        };

        try {
            const saveResult = await axios.post('http://localhost:3000/Arv', filedetails);
            if (saveResult.data.message === "success") {
                handleSearch3(); // Call search after saving to display all records
            }
        } catch (error) {
            console.error("There was an error saving the file details or fetching data", error);
        }
    };

    const handleSearch = () => {
        const nameParts = requesterName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1] || '';
        const grandfatherName = nameParts[2] || '';

        navigate('/fbn', { state: { name, fatherName, grandfatherName, isRequester: true } });
    };

    const handleSearch2 = () => {
        const nameParts = receiverName.trim().split(' ');
        const name = nameParts[0] || '';
        const fatherName = nameParts[1] || '';
        const grandfatherName = nameParts[2] || '';

        navigate('/fbn', { state: { name, fatherName, grandfatherName, isRequester: false } });
    };

    return (
        <>
            <Nav />
            <div className="file-borrow-container">
                <div className="button-group">
                    <button type="button" onClick={handleSave}>BORROW</button>
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
                                    <label>Fullname of Requestor</label>
                                    <input
                                        type="text"
                                        value={requesterName}
                                        onChange={(e) => setRequesterName(e.target.value)}
                                    />
                                    <button type="button" onClick={handleSearch}>Search</button>
                                </td>
                                <td>
                                    <label>Fullname of Receiver</label>
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
                                        type="text"
                                        value={returnDate ? returnDate : "Not Returned"} // Display "Not Returned" if returnDate is null
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <label>Page of Returned Folder</label>
                                    <input
                                        type="text"
                                        value={pagesWhenReturned !== 0 ? pagesWhenReturned : "0"} // Display 0 if pagesWhenReturned is 0
                                        readOnly
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
