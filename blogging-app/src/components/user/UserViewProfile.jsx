import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserViewProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get userId from state or localStorage
  const userId = location.state?.userId || localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.post(`http://localhost:3002/Blog/ViewOneUser/${userId}`)
        .then(response => {
          const data = response.data.data;
          // ⚠️ Your backend returns an array, so get [0]
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
      // Redirect to login if userId is not available
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate('/login');
  };

  return (
    <div className="container mt-5 p-5">
      {userData ? (
        <div className="card  p-4 shadow">
          <h2>Welcome, {userData.Name}!</h2>
          <p><strong>Email:</strong> {userData.Email}</p>
          <p><strong>Phone Number:</strong> {userData.PhoneNo}</p>
          <p><strong>Date of Birth:</strong> {new Date(userData.DOB).toLocaleDateString()}</p>
          <p><strong>Account Status:</strong> {userData.isActive ? "Active" : "Inactive"}</p>

          <div className="mt-4">
            <button className="btn btn-primary m-2">➕ Create New Blog</button>
            <button className="btn btn-secondary m-2">📝 View My Blogs</button>
            <Link to="/editprofile" state={{ userId }}>
  <button className="btn btn-warning m-2">⚙️ Edit Profile</button>
</Link>
            
            <button className="btn btn-dark m-2">🔑 Change Password</button>
            <button className="btn btn-danger m-2" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserViewProfile;
