import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  const [Title, setTitle] = useState('');
  const [SubTitle, setSubTitle] = useState('');
  const [Discription, setDiscription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');

    // If blog is missing or user is not authorized, redirect
    if (!blog || loggedInUserId !== blog?.UserId?._id) {
      alert('⛔ Unauthorized access to edit blog.');
      navigate('/userviewprofile');
      return;
    }

    // Set blog data if authorized
    setTitle(blog.Title);
    setSubTitle(blog.SubTitle);
    setDiscription(blog.Discription);
  }, [blog, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Title', Title);
    formData.append('SubTitle', SubTitle);
    formData.append('Discription', Discription);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        `http://localhost:3002/Blog/UpdateBlog/${blog._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('✅ Blog updated successfully!');
        navigate('/userviewprofile', {
          state: { userId: blog.UserId?._id },
        });
      } else {
        alert('⚠️ Failed to update blog.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('❌ An error occurred while updating the blog.');
    }
  };

  return (
    <div className="container mt-5 p-5">
      <h3 className="text-center text-muted mb-4">✏️ Edit Blog</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">SubTitle</label>
          <input
            type="text"
            className="form-control"
            id="subtitle"
            value={SubTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="discription"
            rows="5"
            value={Discription}
            onChange={(e) => setDiscription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Update Image (optional)</label>
          <input
            className="form-control"
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">✅ Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
