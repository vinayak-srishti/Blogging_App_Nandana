import React from "react";
import "./Home.css";
import blogillustration from "../../assets/blogIllustration.jpeg"
import whatisblog from "../../assets/whatisblog.jpeg"
import blogwriting from "../../assets/blogwriting.jpg"
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <div>
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
      <nav>
      
      
    </nav>
    
    </div>
    <div className="info-section d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap ">
  {/* Image Side */}
  <div className="info-image">
    <img 
      src={whatisblog}
      alt="whatisblog" 
      className="img-fluid rounded shadow" 
    />
  </div>

  {/* Text Side */}
  <div className="info-text">
    <h2>Share Your Stories Freely</h2>
    <p>
      With BlogNest, publishing is effortless and intuitive. Whether you're a beginner or an expert writer, you’ll feel right at home. Focus on your thoughts — we’ll handle the rest.Bring your ideas to life with beautiful layouts, seamless editing, and a distraction-free writing environment.Reach a global audience and build your personal brand or community.Your voice matters — let it inspire, educate, or entertain the world.BlogNest is more than just a platform; it’s your partner in creative expression.
    </p>
  </div>
</div>

<div className="centered-image-container">
  <img src={blogwriting} alt="Centered" className="centered-image" />
</div>

    

    </div>
  );
};

export default Home;
