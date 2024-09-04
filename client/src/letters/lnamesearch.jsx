import React from 'react';
import Nav from "../nav and fot/navbar";
import { useLocation } from 'react-router-dom';

const Lnsearch = () => {
    const location = useLocation();
    const fileData = location.state || [];

    return (
        <>
            <Nav />
            <div className="search-results-container">
                {fileData.length > 0 ? (
                    <table>
                        <tbody>
                            {fileData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nameOfOrg}</td>
                                    <td>{item.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No matching record found</p>
                )}
            </div>
        </>
    );
};

export default Lnsearch;
