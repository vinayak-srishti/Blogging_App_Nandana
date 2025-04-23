import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PhoneNo: "",
    DOB: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.Name.trim()) errors.name = "Name is required.";
    if (!emailRegex.test(formData.Email)) errors.email = "Invalid email format.";
    if (!phoneRegex.test(formData.PhoneNo)) errors.phoneNo = "Phone number must be 10 digits.";
    if (!formData.DOB) errors.dob = "Date of Birth is required.";
    if (!passwordRegex.test(formData.Password))
      errors.password = "Password must have 8+ characters, 1 uppercase, 1 number, and 1 special character.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      const preparedData = {
        ...formData,
        PhoneNo: Number(formData.PhoneNo), // Convert PhoneNo to Number for backend
      };

      axios
        .post("http://localhost:3002/Blog/UserRegistration", preparedData)
        .then((response) => {
          console.log(response);
          setSuccessMessage("Registration Successful!");
          alert("Registration Successful!");

          setFormData({
            Name: "",
            Email: "",
            PhoneNo: "",
            DOB: "",
            Password: "",
          });

          setIsSubmitted(false);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed! Please try again.");
        });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
      <div className="col-md-6 p-4 shadow-lg bg-white rounded">
        <h2 className="text-center mb-4">Sign Up</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="Name"
              className={`form-control ${isSubmitted && errors.name ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.Name}
              placeholder="Enter your name"
            />
            {isSubmitted && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="Email"
              className={`form-control ${isSubmitted && errors.email ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.Email}
              placeholder="Enter your email"
            />
            {isSubmitted && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone No</label>
            <input
              type="tel"
              name="PhoneNo"
              className={`form-control ${isSubmitted && errors.phoneNo ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.PhoneNo}
              placeholder="Enter 10-digit phone number"
            />
            {isSubmitted && errors.phoneNo && <div className="invalid-feedback">{errors.phoneNo}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="DOB"
              className={`form-control ${isSubmitted && errors.dob ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.DOB}
            />
            {isSubmitted && errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="Password"
              className={`form-control ${isSubmitted && errors.password ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.Password}
              placeholder="Create a strong password"
            />
            {isSubmitted && errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
