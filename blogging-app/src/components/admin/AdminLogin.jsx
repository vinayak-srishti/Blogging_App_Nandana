import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    
    const adminExists = localStorage.getItem("adminUsername");
    if (!adminExists) {
      localStorage.setItem("adminUsername", "admin");
      localStorage.setItem("adminPassword", "12345");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsername = localStorage.getItem("adminUsername");
    const storedPassword = localStorage.getItem("adminPassword");

    if (username === storedUsername && password === storedPassword) {
  localStorage.setItem("isAdminLoggedIn", "true"); // ✅ Set login flag
  navigate("/admin-dashboard");  // ✅ Then navigate
}

  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px",padding:"100px" }}>
      <h2>Admin Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
