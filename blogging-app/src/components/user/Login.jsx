import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { Email, Password } = data;

    if (!Email.trim() || !Password.trim()) { 
    }

    axios.post("http://localhost:3002/Blog/UserLogin", { Email, Password })
      .then((response) => {
        const resData = response.data;

        if (resData.Message === "User Login Successfully") {
  const user = resData.data;

  if (!user.approved) {
    setError("Your account is not yet approved by the admin. Please wait for approval.");
    return;
  }

  const userId = user._id;
  localStorage.setItem("userId", userId);
  alert("Login Successful!");
  navigate('/userviewprofile', { state: { userId } });
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
              className="form-control"
              value={data.Password}
              name="Password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3 text-end">
            <Link to="/user-forgetpassword" className="text-decoration-none me-3">
              Forgot Password?
            </Link>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-warning" onClick={handleResetClick}>
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
