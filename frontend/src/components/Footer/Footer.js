import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Footer.css'; // Make sure you have a style file for the footer

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-section contact-info">
        <h3>Contact Information</h3>
        <p>Email: emanuelepardini4@gmail.com</p>

      </div>

      <div className="footer-section useful-links">
        <h3>Latest News</h3>
        <ul>
          <li><Link to="/Demo">Demo</Link></li>
          <li><Link to="/v1">v1</Link></li>
        </ul>
      </div>

      <div className="footer-section social-media">
        <h3>Social Media</h3>
        <ul>
          <li><a href="http://emanuelepardini.altervista.org/">WebSite</a></li>
          <li><a href="https://www.linkedin.com/in/emanuele-pardini-b5994b1ab?originalSubdomain=it">Linkedin</a></li>
          <li><a href="https://www.instagram.com/emanuele_pardini/">Instagram</a></li>
        </ul>
      </div>

      <div className="footer-section legal-info">
        <p>&copy; 2023 MeetHub. All rights reserved.</p>
        {/* <p><a href="/privacy">Privacy Policy</a></p> */}
        <h1 className='logo'>MeetHub</h1>
      </div>
      
    </footer>
  );
};

export default Footer;
