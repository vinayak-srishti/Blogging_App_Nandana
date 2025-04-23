import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3002/Blog/ViewAllUsers")
      .then((response) => {
        setUsers(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (id) => {
    navigate(`/viewoneuser/${id}`);  // This navigates to the correct URL
  };

  return (
    <div className="container mt-5 p-5">
      <h2>All Registered Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                onClick={() => handleRowClick(user._id)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNo}</td>
                <td>{user.DOB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllUsers;
