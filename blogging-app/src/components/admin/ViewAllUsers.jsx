import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3002/Blog/ViewAllUsers") // Backend filters only approved + active users
      .then((response) => {
        const allUsers = response.data.data || [];
        const approvedUsers = allUsers.filter(user => user.approved === true && user.isActive === true);
        setUsers(approvedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleViewClick = (id) => {
    navigate(`/admin-viewoneuser/${id}`);
  };

  return (
    <div className="container mt-5 p-5">
      <h2>Approved Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No approved users found.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNo}</td>
                <td>{new Date(user.DOB).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewClick(user._id)}
                  >
                    View
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

export default ViewAllUsers;
