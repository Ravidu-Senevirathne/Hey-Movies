// Header.jsx
import React from 'react';
import './Header.css';

import user from '../../assets/User.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        {/* <img src={logo} alt="Admin Panel Logo" className="logo" /> */}
      </div>
      <div className="header-center">
      
      </div>
      <div className="header-right">
        <div className="profile">
          <img src={user} alt="User Avatar" className="user-avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
