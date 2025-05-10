import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './Login.css';

const Login = () => {
  const [data, setData] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validateInputs = () => {
    const { Email, Password } = data;

    if (!Email || !Password) {
      setError("Both fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (Password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return false;
    }

    setError(""); // Clear previous errors
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const { Email, Password } = data;

    axios
      .post("http://localhost:3002/Blog/UserLogin", { Email, Password })
      .then((response) => {
        const resData = response.data;

        if (resData.Message === "User Login Successfully") {
          const user = resData.data;

          if (!user.approved) {
            setError("Your account is not yet approved by the admin.");
            return;
          }

          localStorage.setItem("userId", user._id);
          alert("Login Successful!");

          const redirectedBlog = location.state?.blog;
          if (redirectedBlog) {
            navigate("/user-viewoneblog", { state: { blog: redirectedBlog } });
          } else {
            navigate("/userviewprofile", { state: { userId: user._id } });
          }
        } else {
          setError(resData.Message || "Login failed.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("An error occurred while connecting to the server.");
      });
  };

  const handleResetClick = () => {
    setData({ Email: "", Password: "" });
    navigate("/user-resetpassword");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {error && <div className="alert alert-danger login-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control login-input"
              value={data.Email}
              name="Email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control login-input"
              value={data.Password}
              name="Password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3 text-end">
            <Link to="/user-forgetpassword" className="login-link me-3">
              Forgot Password?
            </Link>
          </div>

          <div className="login-button-group">
            <button type="submit" className="btn btn-primary w-50">Login</button>
            <button type="button" className="btn btn-warning w-50" onClick={handleResetClick}>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
