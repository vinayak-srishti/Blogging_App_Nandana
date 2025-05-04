import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="container mt-5 p-5">
      <h3 className="text-center text-muted mb-5">📰 All Blogs</h3>

      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs available.</p>
      ) : (
        <div className="row g-5">
          {blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog._id}>
              <div className="card h-100 shadow-sm">
                {blog.image && (
                  <img
                    src={`http://localhost:3002/upload/${blog.image.filename}`}
                    className="card-img-top"
                    alt={blog.Title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.Title}</h5>
                  <h6 className="card-subtitle text-muted mb-2">{blog.SubTitle}</h6>
                  <p className="card-text">{blog.Discription?.slice(0, 100)}...</p>
                  <Link
                    to="/admin-viewoneblog"
                    state={{ blog }}
                    className="btn btn-sm btn-primary"
                  >
                    📖 Read More
                  </Link>
                </div>
                <div className="card-footer small text-muted">
                  ✍️ By: {blog.UserId?.Name || 'Unknown'} {/* Corrected here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllBlogs;
