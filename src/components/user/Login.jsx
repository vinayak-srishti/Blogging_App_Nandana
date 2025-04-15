import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const correctEmail = "test@example.com";
  const correctPassword = "Test@1234";

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = data;

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    if (email === correctEmail && password === correctPassword) {
      console.log("Logged in successfully");
      setError("");
      alert("Login Successful!");
    } else {
      console.log("Invalid credentials");
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleResetClick = () => {
    setData({ email: "", password: "" });
    navigate("/reset-password"); 
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5 p-4 shadow-lg bg-white rounded">
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={data.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={data.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3 text-end">
            <Link to="/forget-password" className="text-decoration-none me-3">
              Forgot Password?
            </Link>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Login</button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleResetClick}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
