import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const UserViewProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const menuRef = useRef();

  // Redirect if no userId
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      axios
        .post(`http://localhost:3002/Blog/ViewOneUser/${userId}`)
        .then(response => {
          const data = response.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setUserData(data[0]);
          } else {
            console.error("User not found or unexpected data:", data);
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  // Fetch all blogs and filter user's blogs
  useEffect(() => {
    axios
      .post('http://localhost:3002/Blog/ViewBlog')
      .then(response => {
        if (response.data && response.data.data) {
          const allBlogs = response.data.data;
          const userBlogs = allBlogs.filter(blog => blog.UserId?._id === userId);
          setBlogs(userBlogs);
        } else {
          console.error("Unexpected response:", response);
        }
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
      });
  }, [userId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="container mt-5 p-5 position-relative">
      {/* Account Menu */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          👤 Account
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="position-absolute shadow p-3 bg-white rounded"
            style={{ top: '60px', right: '20px', zIndex: 1000, width: '200px' }}
          >
            <Link to="/user-profile" state={{ userId }} className="d-block mb-2 text-decoration-none text-dark">👁️ Profile</Link>
            <Link to="/userviewprofile" state={{ userId }} className="d-block mb-2 text-decoration-none text-dark">📝 View My Blogs</Link>
            <Link to="/user-editprofile" state={{ userId }} className="d-block mb-2 text-decoration-none text-dark">⚙️ Edit Profile</Link>
            <Link to="/user-resetpassword" state={{ userId }} className="d-block text-decoration-none text-dark">🔑 Change Password</Link>
          </div>
        )}
      </div>

      {/* Welcome Message */}
      <h3 className="text-center text-muted mb-5">
        {userData ? `Welcome, ${userData.Name}!` : 'Loading...'}
      </h3>

      {/* Blogs */}
      <h4 className="mb-4">📝 All Blogs</h4>
      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs available.</p>
      ) : (
        <div className="row g-5">
          {blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog._id}>
              <div className="card h-100 shadow-sm">
                {blog.image && (
                  <img
                    src={`http://localhost:3002/upload/${blog?.image?.filename}`}
                    className="card-img-top"
                    alt={blog.Title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.Title}</h5>
                  <h6 className="card-subtitle text-muted mb-2">{blog.SubTitle}</h6>
                  <p className="card-text">{blog.Discription?.slice(0, 100)}...</p>
                  <Link
                    to="/user-viewoneblog"
                    state={{ blog }}
                    className="btn btn-sm btn-primary"
                  >
                    📖 Read More
                  </Link>
                </div>
                <div className="card-footer small text-muted">
                  ✍️ By: {blog.UserId?.Name || "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserViewProfile;
