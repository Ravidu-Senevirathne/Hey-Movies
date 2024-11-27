import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';
import { loginUser } from '../../api';

const LoginPopup = ({ onClose, onSwitchToRegister }) => {
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Clear any existing user data
      localStorage.removeItem('user'); 
      
      // Attempt login
      const userData = await loginUser(formData); 
      
      console.log('User data from backend:', userData); // Debugging log

      if (userData.username) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData)); 
        
        alert(`Welcome, ${userData.username}!`);
        onClose();
        navigate('/welcome');
      } else {
        setErrors({ general: 'Unexpected response format. Please try again.' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ general: err.message || 'Login failed. Please check your username and password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form ref={popupRef} className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-inputs">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By Continuing, I agree to the terms of use & privacy policy. <br />
            If you don't have an account, <a href="#" onClick={onSwitchToRegister}><b>Click Here</b></a> to Register.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
