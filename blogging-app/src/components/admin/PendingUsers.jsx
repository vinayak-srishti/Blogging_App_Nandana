import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all users with approval status as false
  useEffect(() => {
    axios
      .get("http://localhost:3002/Blog/ViewPendingUsers") // Assuming this is the endpoint to fetch pending users
      .then((response) => {
        setPendingUsers(response.data.data);
      })
      .catch((err) => {
        setError("Failed to load pending users.");
        console.error("Error loading pending users:", err);
      });
  }, []);

  const handleApproveUser = (userId) => {
    axios
      .put(`http://localhost:3002/Blog/ApproveUser/${userId}`)
      .then(() => {
        // On success, remove the approved user from the list
        setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        console.error("Error approving user:", err);
        setError("Failed to approve user.");
      });
  };

  return (
    <div className="container mt-5 p-5">
      <h2>Pending Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNo}</td>
                <td>{new Date(user.DOB).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleApproveUser(user._id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingUsers;
