import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-5 p-5">
      <h2>Welcome, Admin!</h2>
      <p>Here you can manage blog posts and users.</p>

      <div className="d-flex flex-column gap-3 mt-4">
       
        <Link to="/viewallusers" className="btn btn-primary">
          View All Users
        </Link>

        <Link to="/view-all-blogs" className="btn btn-success">
          View All Blogs
        </Link>

       
        <Link to="/pendingusers" className="btn btn-warning">
          View Pending Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
