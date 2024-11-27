import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../api';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      fetchUserData();
    }, []);
    
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user'); // Retrieve the user object
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser); // Parse the user object
          const username = parsedUser.username;
          console.log('localStorage username:', username); // Log the parsed username
          
          const userData = await getUser(username); // Fetch from backend using the username
          console.log('User data from backend:', userData); // Debugging log
          setFormData(prevState => ({
            ...prevState,
            username: userData.username || '',
            email: userData.email || '',
            name: userData.name || ''
          }));
        } catch (error) {
          console.error('Error parsing or fetching user data:', error);
          setMessage('Failed to load user data.');
        }
      } else {
        setMessage('No user found in local storage.');
      }
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
      const newErrors = {};
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      try {
        const dataToSend = { ...formData };
        // Encode password
        
        
        delete dataToSend.confirmPassword;

        const updatedUser = await updateUser(dataToSend);
        setMessage('Profile updated successfully!');
        localStorage.setItem('username', updatedUser.username);
      } catch (error) {
        setMessage(`Error updating profile: ${error.response ? error.response.data : error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="settings-container">
        <h1>Account Settings</h1>
        {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
        <form onSubmit={handleFormSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave blank to keep current password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}

          </button>
          <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
        </form>
      </div>
    );
};

export default Settings;
