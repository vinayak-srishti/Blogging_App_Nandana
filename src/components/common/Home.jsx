import React from "react";
import "./Home.css";
import blogillustration from "../../assets/blogIllustration.jpeg"
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="hero-section">
      <div className="container d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap">
        
       
        <div className="hero-text">
          <h1>Create a Blog</h1>
          <p>
            Got stories to share? BlogNest gives you all the tools to create, publish, and connect with readers — whether it's a hobby or your future business.Craft stunning blog posts with ease, 
            showcase your creativity, and build a space that truly represents your ideas.From simple storytelling to professional content marketing — grow your voice, reach new audiences, and turn
             your passion into something powerful.Your journey starts here. Let BlogNest help you shape it.
          </p>

          <Link to="/signup"><button className="btn btn-dark px-4 py-2 mt-3">Get Started</button></Link>
          
        </div>

        
        <div className="hero-image">
          <img 
            src={blogillustration}
            alt="Blog illustration" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
