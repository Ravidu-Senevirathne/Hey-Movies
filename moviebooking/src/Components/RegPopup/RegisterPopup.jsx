import React, { useState, useRef, useEffect } from 'react';
import './RegisterPopup.css';
import { registerUser, API_ENDPOINTS } from '../../api';
import { useNavigate } from 'react-router-dom';

const RegisterPopup = ({ onClose, onSwitchToLogin }) => {
  const popupRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
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
    // Clear error when user starts typing
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;
      
      await registerUser(dataToSend);
      alert('Registration successful!');
      onClose();
    } catch (err) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-popup">
      <form ref={popupRef} className="register-popup-container" onSubmit={handleSubmit}>
        <div className="register-popup-inputs">
          <input name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
          <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          {errors.password && <span className="error">{errors.password}</span>}
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}

        <div className="register-popup-condition">
          <input type="checkbox" required />
          <p>
            By Continuing, I agree to the terms of use & privacy policy. <br />
            If you already have an account, <a href="#" onClick={onSwitchToLogin}><b>Click Here</b></a> to Sign In.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPopup;