import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/images/ugcc_logo.png" alt="UGCC Logo" className="footer-logo" />
              <h3>University of Guyana<br />Cyber Security Club</h3>
            </div>
            <p>Empowering future cybersecurity professionals through education and hands-on experience.</p>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> ugcc.csi@uog.edu.gy</p>
              <p><i className="fas fa-phone"></i> +592-222-4000</p>
              <p><i className="fas fa-map-marker-alt"></i> University of Guyana, Turkeyen Campus</p>
              <p><i className="fas fa-globe"></i> <a href="https://www.uog.edu.gy/" target="_blank" rel="noopener noreferrer">uog.edu.gy</a></p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/University-of-Guyana-Cybersecurity-Club-102174519063021" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/uogcyberclub?igsh=MW44dXgxNGsxMDJ1Mg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2022 University of Guyana Cyber Security Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
