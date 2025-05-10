import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewAllBlogs.css'; // Import the CSS

const ViewAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:3002/Blog/ViewBlog')
      .then((response) => {
        if (response.data && response.data.data) {
          setBlogs(response.data.data);
        } else {
          console.error('Unexpected response format:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  return (
    <div className="viewblogs-container">
      <h3 className="viewblogs-title">📰 All Blogs</h3>

      {blogs.length === 0 ? (
        <p className="viewblogs-empty">No blogs available.</p>
      ) : (
        <div className="viewblogs-grid">
          {blogs.map((blog) => (
            <div className="viewblogs-card" key={blog._id}>
              {blog.image && (
                <img
                  src={`http://localhost:3002/upload/${blog.image.filename}`}
                  className="viewblogs-img"
                  alt={blog.Title}
                />
              )}
              <div className="viewblogs-body">
                <h5 className="viewblogs-card-title">{blog.Title}</h5>
                <h6 className="viewblogs-card-subtitle">{blog.SubTitle}</h6>
                <p className="viewblogs-description">
                  {blog.Discription?.slice(0, 100)}...
                </p>
                <Link
                  to="/admin-viewoneblog"
                  state={{ blog }}
                  className="viewblogs-btn"
                >
                  📖 Read More
                </Link>
              </div>
              <div className="viewblogs-footer">
                ✍️ By: {blog.UserId?.Name || 'Unknown'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllBlogs;
