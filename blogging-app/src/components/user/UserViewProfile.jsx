import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './UserViewProfile.css';


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
    <div className="user-view-container">
  <div className="user-account-menu">
    <button
      className="user-account-button"
      onClick={() => setMenuOpen(!menuOpen)}
    ><span className="material-icons">account_circle</span>
    Account
    </button>

    {menuOpen && (
      <div ref={menuRef} className="user-account-dropdown">
        <Link to="/user-profile" state={{ userId }}>👁️ Profile</Link>
        <Link to="/userviewprofile" state={{ userId }}>📝 View My Blogs</Link>
        <Link to="/user-editprofile" state={{ userId }}>⚙️ Edit Profile</Link>
        <Link to="/user-resetpassword" state={{ userId }}>🔑 Change Password</Link>
      </div>
    )}
  </div>

  <h3 className="user-welcome-text">
    {userData ? `Welcome, ${userData.Name}!` : 'Loading...'}
  </h3>

  <h4 className="user-blogs-title">📝 All Blogs</h4>
  {blogs.length === 0 ? (
    <p className="text-center text-muted">No blogs available.</p>
  ) : (
    <div className="row g-5">
      {blogs.map((blog) => (
        <div className="col-md-6 mb-4" key={blog._id}>
          <div className="card h-100 shadow-sm user-blog-card">
            {blog.image && (
              <img
                src={`http://localhost:3002/upload/${blog?.image?.filename}`}
                className="card-img-top user-blog-img"
                alt={blog.Title}
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
            <div className="card-footer user-blog-footer">
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
