import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.post(`http://localhost:3002/Blog/ViewOneUser/${userId}`)
        .then(response => {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setUserData(data[0]);
          } else {
            console.error("User not found or unexpected data:", data);
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  return (
    <div className="user-profile-container">
    {userData ? (
      <div className="user-profile-card shadow-lg">
        <h2 className="user-profile-title">👤 Profile Details</h2>
        <hr />
        <p><strong>Name:</strong> {userData.Name}</p>
        <p><strong>Email:</strong> {userData.Email}</p>
        <p><strong>Phone Number:</strong> {userData.PhoneNo}</p>
        <p><strong>Date of Birth:</strong> {new Date(userData.DOB).toLocaleDateString()}</p>
        <p>
          <strong>Account Status:</strong> 
          <span className={`user-profile-status badge ${userData.isActive ? 'bg-success' : 'bg-secondary'}`}>
            {userData.isActive ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>
    ) : (
      <p className="user-profile-loading">Loading profile...</p>
    )}
  </div>
  );
};

export default UserProfile;
