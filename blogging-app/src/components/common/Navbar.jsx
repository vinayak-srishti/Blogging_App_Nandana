import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import blogicon from "../../assets/blog1.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect pages
  const isAdminPage = location.pathname.startsWith("/admin");
  const isUserLoggedInPage = location.pathname.startsWith("/user"); // user pages like /userdashboard, /userprofile etc.

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : "bg-transparent shadow-sm"}`}>
      <div className="container">
        <a className={`navbar-brand fw-bold ${scrolled ? "text-white" : "text-dark"}`} href="/">
          <img src={blogicon} alt="Blog Icon" width="50" height="50" />
          BlogNest
        </a>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? "text-white" : "text-dark"}`} to="#">PRODUCTS</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${scrolled ? "text-white" : "text-dark"}`} to="#">RESOURCES</Link>
            </li>
          </ul>
        </div>

        {/* Different buttons based on page */}
        <div className="d-flex gap-3">
          {isAdminPage ? (
            <>
              <Link
                to="/admin-profile"
                className={`btn ${scrolled ? "btn-outline-light" : "btn-outline-dark"}`}
              >
                Profile
              </Link>
              <Link
                to="/admin-logout"
                className={`btn ${scrolled ? "btn-light" : "btn-dark"} px-4`}
              >
                Logout
              </Link>
            </>
          ) : isUserLoggedInPage ? (
            <>
              <Link
                to="/user-addblog"
                className={`btn ${scrolled ? "btn-outline-light" : "btn-outline-dark"}`}
              >
                Create Blog
              </Link>
              <Link
                to="/userlogout"
                className={`btn ${scrolled ? "btn-light" : "btn-dark"} px-4`}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`btn ${scrolled ? "btn-outline-light" : "btn-outline-dark"}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`btn ${scrolled ? "btn-light" : "btn-dark"} px-4`}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
