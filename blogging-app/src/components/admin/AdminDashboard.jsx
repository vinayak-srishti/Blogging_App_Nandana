import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5 p-5">
      <h2>Welcome, Admin!</h2>
      <p>Here you can manage blog posts and users.</p>

      <div className="d-flex flex-column gap-3 mt-4">
        <Link to="/admin-viewallusers" className="btn btn-primary">
          View All Users
        </Link>

        <Link to="/admin-viewallblogs" className="btn btn-success">
          View All Blogs
        </Link>

        <Link to="/admin-pendingusers" className="btn btn-warning">
          View Pending Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
