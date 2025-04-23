import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId || localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    PhoneNo: '',
    DOB: '',
  });

  useEffect(() => {
    if (userId) {
      axios
        .post(`http://localhost:3002/Blog/ViewOneUser/${userId}`)
        .then((response) => {
          const user = response.data.data[0];
          setFormData({
            Name: user.Name,
            Email: user.Email,
            PhoneNo: user.PhoneNo,
            DOB: user.DOB?.split('T')[0], // YYYY-MM-DD format
          });
        })
        .catch((error) => {
          console.error("Error loading user for edit:", error);
        });
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post(`http://localhost:3002/Blog/EditUser/${userId}`, {
      Name: formData.Name,
      Email: formData.Email,
      PhoneNo: formData.PhoneNo,
      DOB: formData.DOB,
    })
    .then(response => {
      alert("Profile updated successfully!");
      navigate('/userviewprofile', { state: { userId } });
    })
    .catch((error) => {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
        alert("Error updating profile.");
      }
    });
  };
  

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="PhoneNo"
            value={formData.PhoneNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">💾 Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
