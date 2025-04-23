import React from "react";
import { Link } from "react-router-dom";

const ResetSuccess = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5 p-4 shadow-lg bg-white rounded text-center">
        <h3 className="mb-4 text-success">Password Reset Successfully!</h3>
        <p>You can now log in with your new password.</p>
        <Link to="/login" className="btn btn-primary mt-3">Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
