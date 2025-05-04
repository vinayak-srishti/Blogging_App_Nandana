import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('SubTitle', subTitle);
    formData.append('Discription', description);
    formData.append('image', image);
    formData.append('UserId', userId);

    try {
      const response = await axios.post(`http://localhost:3002/Blog/addBlog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("✅ Blog added successfully!");
      console.log(response.data);

      setTitle('');
      setSubTitle('');
      setDescription('');
      setImage(null);

      navigate('/userviewprofile', { state: { userId } });
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("❌ Failed to add blog.");
    }
  };

  return (
    <div className="container mt-5 p-5">
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 shadow bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">SubTitle</label>
          <input type="text" className="form-control" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">📤 Submit Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
