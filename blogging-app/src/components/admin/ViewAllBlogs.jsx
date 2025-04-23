import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3002/Blog/ViewBlog")
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading blogs...</p>;

  return (
    <div className="container mt-5 p-5">
      <h2 className="mb-4">All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ width: '80px', height: 'auto', borderRadius: '5px' }} 
                  />
                </td>
                <td>{blog.title}</td>
                <td>{blog.subTitle}</td>
                <td>{blog.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllBlogs;
