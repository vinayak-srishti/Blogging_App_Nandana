import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewBlogs.css'; 

const ViewBlogs = () => {
  const navigate = useNavigate();
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

  const handleReadMore = (blog) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You must be logged in to view the full blog!');
      navigate('/login', { state: { blog } }); // Pass blog in state to login page
    } else {
      navigate('/user-viewoneblog', { state: { blog } });
    }
  };

  return (
    <div className="viewblogs-container container mt-5">
  <h3 className="text-center viewblogs-heading">📰 All Blogs</h3>

  {blogs.length === 0 ? (
    <p className="text-center text-muted">No blogs available.</p>
  ) : (
    <div className="row g-5">
      {blogs.map((blog) => (
        <div className="col-md-6 mb-4" key={blog._id}>
          <div className="card viewblogs-card h-100 shadow-sm">
            {blog.image && (
              <img
                src={`http://localhost:3002/upload/${blog.image.filename}`}
                className="viewblogs-card-img card-img-top"
                alt={blog.Title}
              />
            )}
            <div className="viewblogs-card-body card-body">
              <h5 className="viewblogs-card-title">{blog.Title}</h5>
              <h6 className="viewblogs-card-subtitle card-subtitle">{blog.SubTitle}</h6>
              <p className="card-text">{blog.Discription?.slice(0, 100)}...</p>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleReadMore(blog)}
              >
                📖 Read More
              </button>
            </div>
            <div className="viewblogs-card-footer card-footer">
              ✍️ By: {blog.UserId?.Name || 'Unknown'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};
export default ViewBlogs;