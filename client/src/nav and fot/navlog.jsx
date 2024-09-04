import React from 'react'; // Ensure to import React
import { Link } from 'react-router-dom';
import './nav.css';

const Navl = () => {
  return (
    <>
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

        </div>
      </div>
    </>
  );
};

export default Navl;
