import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !newPassword || !confirmPassword) {
    setError('All fields are required.');
    return;
  }

  if (newPassword !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    const response = await axios.post("http://localhost:3002/Blog/ForgotPassword", {
      Email: email,
      Password: newPassword
    });

    setMessage(response.data.message || 'Password reset successful!');
    setError('');
    setTimeout(() => navigate('/login'), 2000);
  } catch (err) {
    setError(err.response?.data?.message || 'Error resetting password');
    setMessage('');
  }
};


  return (
    <div className="reset-password-container">
  <div className="reset-password-card">
    <h3 className="reset-password-title">Reset Password</h3>

    {error && <div className="alert alert-danger">{error}</div>}
    {message && <div className="alert alert-success">{message}</div>}

    <form onSubmit={handleSubmit} className="reset-password-form">
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm New Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="reset-password-button">
        Reset Password
      </button>
    </form>

    <div className="reset-password-link">
      <a href="/login">Back to Login</a>
    </div>
  </div>
</div>

  );
};

export default ResetPassword;
