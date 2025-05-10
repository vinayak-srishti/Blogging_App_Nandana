import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ForgetPassword.css';


const ForgetPassword = () => {
  const [data, setData] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.Email.trim() || !data.Password.trim()) {
      setError("Both Email and New Password are required!");
      return;
    }

   
    axios.post("http://localhost:3002/Blog/ForgotPassword", {
      Email: data.Email,
      Password: data.Password,
    })
    .then((response) => {
      if (response.data.message === "Spotted User") {
        setError("");
        alert("Password reset successful!");
        navigate("/login"); 
      } else {
        setError("Email not found or update failed!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    });
  };

  return (
    <div className="forget-password-container d-flex justify-content-center align-items-center min-vh-100">
  <div className="forget-password-card col-md-5 p-4 shadow-lg bg-white rounded">
    <h3 className="text-center mb-4">Forgot Password</h3>

    {error && <div className="alert alert-danger text-center">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Enter your Email</label>
        <input
          type="email"
          className="form-control"
          name="Email"
          value={data.Email}
          onChange={handleChange}
          placeholder="example@example.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter New Password</label>
        <input
          type="password"
          className="form-control"
          name="Password"
          value={data.Password}
          onChange={handleChange}
          placeholder="New Password"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default ForgetPassword;
