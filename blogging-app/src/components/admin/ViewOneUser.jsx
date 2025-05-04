import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteUser from "./DeleteUser"; 

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
    <div className="container mt-5 p-5">
      <h2>User Details</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item"><strong>Name:</strong> {user?.Name}</li>
        <li className="list-group-item"><strong>Email:</strong> {user?.Email}</li>
        <li className="list-group-item"><strong>Phone No:</strong> {user?.PhoneNo}</li>
        <li className="list-group-item"><strong>DOB:</strong> {user?.DOB}</li>
      </ul>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );
};

export default ViewOneUser;
