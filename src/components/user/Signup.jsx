import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!emailRegex.test(formData.email)) errors.email = "Invalid email format.";
    if (!phoneRegex.test(formData.phoneNo)) errors.phoneNo = "Phone number must be 10 digits.";
    if (!formData.dob) errors.dob = "Date of Birth is required.";
    if (!passwordRegex.test(formData.password))
      errors.password = "Password must have 8+ characters, 1 uppercase, 1 number, and 1 special character.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSuccessMessage("");

    if (validateForm()) {
      setSuccessMessage("Registration Successful!");
      console.log("User Data:", formData);
     
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-3">
      <div className="col-md-6 p-4 shadow-lg bg-white rounded">
        <h2 className="text-center mb-4">Sign Up</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
        
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${isSubmitted && errors.name ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter your name"
            />
            {isSubmitted && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

        
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${isSubmitted && errors.email ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
            />
            {isSubmitted && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

         
          <div className="mb-3">
            <label className="form-label">Phone No</label>
            <input
              type="text"
              name="phoneNo"
              className={`form-control ${isSubmitted && errors.phoneNo ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.phoneNo}
              placeholder="Enter 10-digit phone number"
            />
            {isSubmitted && errors.phoneNo && <div className="invalid-feedback">{errors.phoneNo}</div>}
          </div>

        
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className={`form-control ${isSubmitted && errors.dob ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.dob}
            />
            {isSubmitted && errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

        
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${isSubmitted && errors.password ? "is-invalid" : ""}`}
              onChange={handleChange}
              value={formData.password}
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
