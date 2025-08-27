import React, { useState, useEffect } from 'react';

const Header = ({ shouldOpenLogin, onLoginOpened, onLoginSuccess, user, onLogout, onUserUpdate, showNotification }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [accountData, setAccountData] = useState({
    fullname: '',
    email: '',
    usi: '',
    address: '',
    department: '',
    year: '',
    telephone: '',
    emergency_contact: '',
    interest: '',
    areas_of_interest: [],
    level_of_experience: ''
  });

  // Auto-open login form when registration is successful
  useEffect(() => {
    if (shouldOpenLogin && !isLoginOpen) {
      setIsLoginOpen(true);
      if (onLoginOpened) {
        onLoginOpened();
      }
    }
  }, [shouldOpenLogin, isLoginOpen, onLoginOpened]);

  useEffect(() => {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        setIsMenuOpen(!isMenuOpen);
      });
    }

    return () => {
      if (hamburger) {
        hamburger.removeEventListener('click', () => {});
      }
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
    // Close mobile menu after clicking
    setIsMenuOpen(false);
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Show loading state
      const submitButton = document.querySelector('.submit-btn');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
      submitButton.disabled = true;

      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification(`Welcome, ${result.user.fullname}!`, 'success');
        onLoginSuccess(result.user); // Pass user data to App
        handleLoginClose();
      } else {
        showNotification('Login failed: ' + result.message, 'error');
      }

      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

    } catch (error) {
      console.error('Login error:', error);
      showNotification('Network error. Please check if the server is running and try again.', 'error');
      
      // Reset button state
      const submitButton = document.querySelector('.submit-btn');
      submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
      submitButton.disabled = false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountToggle = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const handleAccountSettings = () => {
    setAccountData({
      fullname: user.fullname || '',
      email: user.email || '',
      usi: user.usi || '',
      address: user.address || '',
      department: user.department || '',
      year: user.year || '',
      telephone: user.telephone || '',
      emergency_contact: user.emergency_contact || '',
      interest: user.interest || '',
      areas_of_interest: user.areas_of_interest && typeof user.areas_of_interest === 'string' ? user.areas_of_interest.split(',') : [],
      level_of_experience: user.level_of_experience || ''
    });
    setIsAccountSettingsOpen(true);
    setIsAccountOpen(false);
  };

  const handleAccountSettingsClose = () => {
    setIsAccountSettingsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsAccountOpen(false);
  };

  const handleAccountInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountCheckboxChange = (area) => {
    setAccountData(prev => ({
      ...prev,
      areas_of_interest: prev.areas_of_interest.includes(area)
        ? prev.areas_of_interest.filter(item => item !== area)
        : [...prev.areas_of_interest, area]
    }));
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitButton = document.querySelector('.account-submit-btn');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
      submitButton.disabled = true;

      const response = await fetch(`http://localhost:5000/api/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...accountData,
          areas_of_interest: accountData.areas_of_interest.join(',')
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification('Account information updated successfully!', 'success');
        // Update the user data in App component
        const updatedUser = { ...user, ...accountData };
        onUserUpdate(updatedUser);
        handleAccountSettingsClose();
      } else {
        showNotification('Update failed: ' + result.message, 'error');
      }

      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

    } catch (error) {
      console.error('Account update error:', error);
      showNotification('Network error. Please try again.', 'error');
      
      const submitButton = document.querySelector('.account-submit-btn');
      submitButton.innerHTML = '<i class="fas fa-save"></i> Save';
      submitButton.disabled = false;
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <img src="/images/ugcc_logo.png" alt="University of Guyana Cyber Security Club Logo" className="logo" />
            <div className="brand-text">
              <h1>University of Guyana</h1>
              <p>Cyber Security Club</p>
            </div>
          </div>
          
          <div className="nav-menu" id="navMenu">
            <a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a>
            <a href="#constitution" className="nav-link" onClick={() => scrollToSection('constitution')}>Constitution</a>
            <a href="#executives" className="nav-link" onClick={() => scrollToSection('executives')}>Past Executives</a>
            <a href="#activities" className="nav-link" onClick={() => scrollToSection('activities')}>Activities & Events</a>
            <a href="#links" className="nav-link" onClick={() => scrollToSection('links')}>Useful Links</a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          
          <div className="nav-controls">
            {!user ? (
              <button className="login-btn" onClick={handleLoginClick}>
                <i className="fas fa-user"></i>
                Login
              </button>
            ) : (
              <div className="user-account">
                <button className="account-btn" onClick={handleAccountToggle}>
                  <i className="fas fa-user-circle"></i>
                  {user.fullname}
                </button>
                {isAccountOpen && (
                  <div className="account-dropdown">
                    <button onClick={handleAccountSettings}>
                      <i className="fas fa-cog"></i>
                      Account Settings
                    </button>
                    <button onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="hamburger" id="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="login-modal-overlay" onClick={handleLoginClose}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Login</h2>
              <button className="close-btn" onClick={handleLoginClose}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleLoginClose}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {isAccountSettingsOpen && (
        <div className="modal-overlay" onClick={handleAccountSettingsClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Account Settings</h2>
              <button className="modal-close" onClick={handleAccountSettingsClose}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleAccountSubmit} className="registration-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="acc-fullName">Full Name *</label>
                    <input
                      type="text"
                      id="acc-fullName"
                      name="fullname"
                      value={accountData.fullname}
                      onChange={handleAccountInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="acc-usi">Student USI *</label>
                    <input
                      type="text"
                      id="acc-usi"
                      name="usi"
                      value={accountData.usi}
                      onChange={handleAccountInputChange}
                      required
                      placeholder="Enter your student USI"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="acc-email">Email Address *</label>
                  <input
                    type="email"
                    id="acc-email"
                    name="email"
                    value={accountData.email}
                    onChange={handleAccountInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="acc-address">Address</label>
                  <textarea
                    id="acc-address"
                    name="address"
                    value={accountData.address}
                    onChange={handleAccountInputChange}
                    placeholder="Enter your address"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* Academic Information */}
              <div className="form-section">
                <h3>Academic Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="acc-department">Department/Faculty</label>
                    <select
                      id="acc-department"
                      name="department"
                      value={accountData.department}
                      onChange={handleAccountInputChange}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="acc-year">Year of Study</label>
                    <select
                      id="acc-year"
                      name="year"
                      value={accountData.year}
                      onChange={handleAccountInputChange}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="acc-telephone">Student Cell Number</label>
                    <input
                      type="tel"
                      id="acc-telephone"
                      name="telephone"
                      value={accountData.telephone}
                      onChange={handleAccountInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="acc-emergency">Name of Emergency Contact</label>
                    <input
                      type="text"
                      id="acc-emergency"
                      name="emergency_contact"
                      value={accountData.emergency_contact}
                      onChange={handleAccountInputChange}
                      placeholder="Emergency contact name"
                    />
                  </div>
                </div>
              </div>

              {/* Interest & Background */}
              <div className="form-section">
                <h3>Interest & Background</h3>
                
                <div className="form-group">
                  <label htmlFor="acc-interest">Tell us about yourself and why you want to join UGCC?</label>
                  <textarea
                    id="acc-interest"
                    name="interest"
                    value={accountData.interest}
                    onChange={handleAccountInputChange}
                    placeholder="Tell us more about yourself and your interest in cybersecurity..."
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="acc-experience">What are your experiences from being UGCC?</label>
                  <select
                    id="acc-experience"
                    name="level_of_experience"
                    value={accountData.level_of_experience}
                    onChange={handleAccountInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="No Experience">No Experience</option>
                    <option value="Some Knowledge">Some Knowledge</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Areas of Interest in Cybersecurity (Check all that apply):</label>
                  <div className="checkbox-grid">
                    {[
                      'Ethical Hacking & Penetration Testing',
                      'Network Security',
                      'Digital Forensics',
                      'Incident Response',
                      'Security Analysis',
                      'Risk Assessment',
                      'Governance & Compliance',
                      'Security Awareness Training'
                    ].map((area) => (
                      <label key={area} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={accountData.areas_of_interest.includes(area)}
                          onChange={() => handleAccountCheckboxChange(area)}
                        />
                        <span className="checkbox-text">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="submit-btn account-submit-btn">
                  <i className="fas fa-save"></i>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
