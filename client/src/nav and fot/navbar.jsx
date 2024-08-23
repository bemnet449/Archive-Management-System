import { Link } from 'react-router-dom';
import './nav.css'; // Ensure this file contains your styles

const Nav = () => {
    return (
        <div className="nav">
            <img 
                src="https://www.ette.com.et/ettetheme/uploads/2021/07/logo.png" 
                alt="logo of ette" 
                className="logo" 
            />
            <div className="nav-text">
                <h2>Archive system</h2>
            </div>
            <div className="nav-links">
                <Link to="/s" className="sign-up">Sign Up</Link>
                <Link to="/folder" className="folder-link">Folder</Link> {/* Added Link */}
            </div>
        </div>
    );
}

export default Nav;
