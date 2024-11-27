import React, { useState } from 'react';
import './Navbar.css';
import search_icon from '../../assets/search_icon.png';
import RegisterPopup from '../RegPopup/RegisterPopup';
import LoginPopup from '../RegPopup/LoginPopup';

const Navbar = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const openRegisterPopup = () => {
    setActivePopup('register');
  };

  const openLoginPopup = () => {
    setActivePopup('login');
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleSearchIconClick = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    if (!searchText) {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className='navbar'>
      <h1 className='logo'>Hey Movies</h1>
      <ul className="navbar-menu">
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Movies</a>
        <a href='#'>Contact Us</a>
      </ul>
      <div className="navbar-right">
        {isSearching ? (
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Search..."
          />
        ) : (
          <img src={search_icon} alt="Search" onClick={handleSearchIconClick} />
        )}
        <button onClick={openLoginPopup}>Sign In</button>
      </div>
      {activePopup === 'register' && (
        <RegisterPopup onClose={closePopup} onSwitchToLogin={openLoginPopup} />
      )}
      {activePopup === 'login' && (
        <LoginPopup onClose={closePopup} onSwitchToRegister={openRegisterPopup} />
      )}
    </div>
  );
}

export default Navbar;