// Nav.jsx
import { Link } from 'react-router-dom';
import './nav.css'; // Ensure this file contains your styles

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav-logo">
                <img 
                    src="https://www.ette.com.et/ettetheme/uploads/2021/07/logo.png" 
                    alt="logo of ette" 
                    className="logo" 
                />
            </div>
            <div className="nav-text">
                <h2>Archive System</h2>
            </div>
            <div className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/" className="nav-link">Login</Link>
                {/* Add more links as needed */}
            </div>
        </div>
    );
}

export default Nav;
