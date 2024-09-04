// Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './dashboard.css'; // Dashboard-specific styles
import Nav from "../nav and fot/navbar";

const Dashboard = () => {
    return (
        <>
        <Nav/>
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome to the Archive System Dashboard</h1>
                <p>Manage your files, track movements, handle correspondence, and more.</p>
            </div>
            <div className="dashboard-list">
                {/** Functionality Item */}
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>File Management</h3>
                        <p>Create, edit, and manage case and personal files.</p>
                    </div>
                    <Link to="/file-management" className="dashboard-button">Go to File Management</Link>
                </div>
                {/** Additional Items */}
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>File Movement Tracking</h3>
                        <p>Track the borrowing and returning of files.</p>
                    </div>
                    <Link to="/file-tracking" className="dashboard-button">Go to File Tracking</Link>
                </div>
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>Correspondence Management</h3>
                        <p>Manage all incoming and outgoing letters.</p>
                    </div>
                    <Link to="/correspondence" className="dashboard-button">Manage Correspondence</Link>
                </div>
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>Scanned Document Management</h3>
                        <p>View, edit, and delete scanned documents.</p>
                    </div>
                    <Link to="/scanned-documents" className="dashboard-button">Manage Documents</Link>
                </div>
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>File Transfer</h3>
                        <p>Transfer files between locations or organizations.</p>
                    </div>
                    <Link to="/file-transfer" className="dashboard-button">Transfer Files</Link>
                </div>
                <div className="dashboard-item">
                    <div className="item-content">
                        <h3>Report Management</h3>
                        <p>Generate and print various reports.</p>
                    </div>
                    <Link to="/reports" className="dashboard-button">Generate Reports</Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
