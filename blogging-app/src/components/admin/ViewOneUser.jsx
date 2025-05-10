import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteUser from "./DeleteUser"; 
import './ViewOneUser.css'; 

const ViewOneUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3002/Blog/ViewOneUser/${id}`)
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setUser(res.data.data[0]);
        }
      })
      .catch((err) => console.error("Error loading user:", err));
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    DeleteUser(id) // ✅ call DeleteUser with capital D
      .then(() => {
        alert("User deleted successfully!");
        navigate("/admin-viewallusers");
      })
      .catch(() => {
        alert("Failed to delete user.");
      });
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="view-one-user-container">
    <div className="view-one-user-card shadow">
      <h2 className="view-one-user-title">👤 User Details</h2>
      <ul className="view-one-user-list">
        <li><strong>Name:</strong> {user?.Name}</li>
        <li><strong>Email:</strong> {user?.Email}</li>
        <li><strong>Phone No:</strong> {user?.PhoneNo}</li>
        <li><strong>DOB:</strong> {new Date(user?.DOB).toLocaleDateString()}</li>
      </ul>
      <button className="view-one-user-delete-btn" onClick={handleDelete}>
        🗑️ Delete User
      </button>
    </div>
  </div>
  );
};

export default ViewOneUser;
