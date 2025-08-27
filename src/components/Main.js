import React from 'react';
const HomeContent = ({ openModal }) => (
  <main className="main-content">
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-title">Welcome to the University of Guyana Cyber Security Club</h2>
          <div className="hero-tagline">
            <h3>Your Security, Our Passion</h3>
            <p>Enhancing the security of ICT through collaborative efforts of Information sharing and community development.</p>
          </div>
          <p className="hero-description">
            Empowering the next generation of cybersecurity professionals through education,
            hands-on experience, and community building. Join us in securing the digital future.
          </p>
          <div className="hero-buttons">
            <button onClick={openModal} className="btn btn-primary">
              <i className="fas fa-user-plus"></i>
              Join Now
            </button>
            <button onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'auto' })} className="btn btn-secondary">
              <i className="fas fa-calendar-alt"></i>
              View Activities
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <img src="/images/ugcc_logo.png" alt="University of Guyana Cyber Security Club Logo" className="hero-logo" />
          </div>
        </div>
      </div>
    </section>
  </main>
);

const ConstitutionContent = () => {
  return (
    <main className="main-content">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Club Constitution</h1>
          <p className="page-description">The founding principles and guidelines that govern the University of Guyana Cyber Security Club</p>
        </div>
      </section>
    </main>
  );
};

const ExecutivesContent = () => {
  const executiveData = [
    {
      year: "2024/2025",
      isCurrent: true,
      executives: [
        {
          name: "Ziyad Ramdeen",
          position: "President",
          description: "Leading the club with vision and dedication to advance cybersecurity education and awareness at the University of Guyana.",
          icon: "fas fa-user"
        },
        {
          name: "Nyack Vaughn",
          position: "Vice President",
          description: "Supporting the President and ensuring smooth operations of club activities and member engagement.",
          icon: "fas fa-user"
        },
        {
          name: "Kaylee Carter",
          position: "Secretary",
          description: "Maintaining detailed records and ensuring effective communication within the club and with external partners.",
          icon: "fas fa-user"
        },
        {
          name: "Chinthia Persaud",
          position: "Treasurer",
          description: "Managing club finances and ensuring responsible stewardship of resources for maximum member benefit.",
          icon: "fas fa-user"
        },
        {
          name: "Shafeek Hiraman",
          position: "Events Coordinator",
          description: "Organizing and coordinating workshops, competitions, and special events to enhance member learning experiences.",
          icon: "fas fa-user"
        },
        {
          name: "Keasha Belgrave",
          position: "Public Relations Officer",
          description: "Managing club communications, social media presence, and building relationships with industry partners.",
          icon: "fas fa-user"
        }
      ]
    },
    {
      year: "2022/2023",
      isCurrent: false,
      executives: [
        {
          name: "Waynetta Naughton",
          position: "President",
          description: "Led the club with dedication and vision, focusing on expanding membership and strengthening cybersecurity education programs.",
          icon: "fas fa-user"
        },
        {
          name: "Kieron Abrigo",
          position: "Vice President",
          description: "Supported club initiatives and coordinated member activities to enhance learning experiences.",
          icon: "fas fa-user"
        },
        {
          name: "Rokaylia Thomas",
          position: "Secretary",
          description: "Maintained accurate records and facilitated effective communication within the club community.",
          icon: "fas fa-user"
        },
        {
          name: "Shawnna Fredricks",
          position: "Treasurer",
          description: "Managed club finances responsibly and ensured optimal allocation of resources for member benefits.",
          icon: "fas fa-user"
        },
        {
          name: "Ngozi Thomas",
          position: "Events Coordinator",
          description: "Organized engaging workshops and events that enhanced cybersecurity knowledge and skills development.",
          icon: "fas fa-user"
        },
        {
          name: "Marion Glasgow",
          position: "Public Relations Officer",
          description: "Built strong relationships with industry partners and managed club's public communications effectively.",
          icon: "fas fa-user"
        },
        {
          name: "Jason Jacobs",
          position: "Immediate Past President",
          description: "Provided guidance and continuity as immediate past president, supporting the transition of leadership.",
          icon: "fas fa-star"
        },
        {
          name: "Ms. Sandra Khan",
          position: "Club Advisor",
          description: "Faculty advisor providing mentorship, guidance, and institutional support for club activities and development.",
          icon: "fas fa-chalkboard-teacher"
        }
      ]
    }
  ];

  return (
    <main className="main-content">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Club Executives</h1>
          <p className="page-description">Meet the leadership that has shaped the University of Guyana Cyber Security Club</p>
        </div>
      </section>

      <section className="executives-section">
        <div className="container">
          {executiveData.map((yearData, yearIndex) => (
            <div key={yearIndex} className="executives-year">
              <div className="year-header">
                <h2 className="year-title">
                  {yearData.year} Academic Year
                  {yearData.isCurrent && <span className="current-badge">Current</span>}
                </h2>
              </div>
              
              <div className="executives-grid">
                {yearData.executives.map((executive, index) => (
                  <div key={index} className="executive-card">
                    <div className="executive-icon">
                      <i className={executive.icon}></i>
                    </div>
                    <div className="executive-info">
                      <h3 className="executive-name">{executive.name}</h3>
                      <h4 className="executive-position">{executive.position}</h4>
                      <p className="executive-description">{executive.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const ActivitiesContent = () => {
  const activities = [
    {
      id: 1,
      title: "Awareness Events",
      year: "2024 - Ongoing",
      category: "outreach",
      type: "Outreach",
      image: "/images/awareness_event.jpg",
      description: "UGCC creates security-conscious ICT spaces where cybersecurity awareness enhances personal security of public citizens."
    },
    {
      id: 2,
      title: "Meetups and Training Sessions",
      year: "2024 - Ongoing",
      category: "workshop",
      type: "Workshop",
      image: "/images/meetup.jpeg",
      description: "Training opportunities and learning resources on cybersecurity topics through practical curriculum activities."
    },
    {
      id: 3,
      title: "OAS Diplohack 2019 Student Competition",
      year: "November 2019",
      category: "competition",
      type: "Competition",
      image: "/images/oas-diplohack.jpg",
      description: "International cybersecurity competition with students from Costa Rica, Jamaica, Trinidad, Mexico and USA."
    },
    {
      id: 4,
      title: "Safe Tech Day 2019 Collaboration",
      year: "March 2019",
      category: "partnership",
      type: "Partnership",
      image: "/images/safe-tech-day-2019.png",
      description: "Collaboration with National Frequency Management Unit promoting gender inclusion in cybersecurity education."
    }
  ];

  return (
    <main className="main-content">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Activities & Events</h1>
          <p className="page-description">Explore our cybersecurity workshops, competitions, and learning opportunities</p>
        </div>
      </section>

      <section className="activities-section">
        <div className="container">
          <div className="activities-grid">
            {activities.map(activity => (
              <div key={activity.id} className="activity-card">
                <div className="activity-header">
                  <h3 className="activity-title">{activity.title}</h3>
                  <span className="activity-year">{activity.year}</span>
                  <span className={`activity-badge ${activity.category}`}>
                    {activity.type}
                  </span>
                </div>
                
                <div className="activity-image">
                  <img src={activity.image} alt={activity.title} />
                </div>
                
                <div className="activity-content">
                  <p className="activity-description">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const GalleryContent = () => (
  <main className="main-content">
    <section className="page-header">
      <div className="container">
        <h1 className="page-title">Photo Gallery</h1>
        <p className="page-description">Memories from our cybersecurity events, workshops, and club activities</p>
      </div>
    </section>
  </main>
);

const LinksContent = () => {
  const linkCategories = [
    {
      id: 1,
      title: "University Resources",
      icon: "fas fa-university",
      links: [
        {
          name: "University of Guyana",
          description: "The official website of the University of Guyana, the premier national university providing quality higher education and fostering research excellence in Guyana.",
          url: "https://www.uog.edu.gy/",
          badge: "Official Website",
          icon: "fas fa-graduation-cap"
        }
      ]
    }
  ];

  return (
    <main className="main-content">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Useful Links</h1>
          <p className="page-description">Important university resources and official links</p>
        </div>
      </section>

      <section className="links-section">
        <div className="container">
          {linkCategories.map(category => (
            <div key={category.id} className="links-category">
              <div className="category-header">
                <i className={category.icon}></i>
                <h2>{category.title}</h2>
              </div>
              
              <div className="links-grid">
                {category.links.map((link, index) => (
                  <div key={index} className="link-card">
                    <div className="link-header">
                      <div className="link-icon">
                        <i className={link.icon}></i>
                      </div>
                      <div className="link-title-section">
                        <h3>{link.name}</h3>
                        <span className="link-badge">{link.badge}</span>
                      </div>
                    </div>
                    
                    <p className="link-description">{link.description}</p>
                    
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="link-button"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Visit University of Guyana
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const ContactContent = ({ showNotification }) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <main className="main-content">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-description">Get in touch with the University of Guyana Cyber Security Club</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information Card */}
            <div className="contact-info-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h2>Get In Touch</h2>
              <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-item-content">
                    <h4>Email</h4>
                    <p>ugcc.csi@uog.edu.gy</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-item-content">
                    <h4>Phone</h4>
                    <p>+592-222-4000</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-item-content">
                    <h4>Location</h4>
                    <p>University of Guyana<br />Turkeyen Campus</p>
                  </div>
                </div>
              </div>

              <div className="social-follow">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/ugcybersecurityclub" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/ugcybersecurityclub" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="contact-form-card">
              <div className="form-icon">
                <i className="fas fa-comment-dots"></i>
              </div>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you soon</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Question or Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what you'd like to know or ask about..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-send">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Registration Modal Component
const RegistrationModal = ({ isOpen, onClose, onRegistrationSuccess, showNotification }) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    studentUSI: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match. Please try again.', 'error');
      return;
    }
    
    // Check password strength (basic validation)
    if (formData.password.length < 6) {
      showNotification('Password must be at least 6 characters long.', 'error');
      return;
    }
    
    try {
      // Show loading state
      const submitButton = document.querySelector('.submit-btn');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitButton.disabled = true;

      // Send data to backend API
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          studentUSI: formData.studentUSI,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification('Registration submitted successfully! Welcome to UGCC! Please login with your credentials.', 'success');
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          studentUSI: '',
          password: '',
          confirmPassword: ''
        });
        // Trigger login form after successful registration
        if (onRegistrationSuccess) {
          setTimeout(() => {
            onRegistrationSuccess();
          }, 1000);
        }
      } else {
        showNotification('Registration failed: ' + result.message, 'error');
      }

      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

    } catch (error) {
      console.error('Registration error:', error);
      showNotification('Network error. Please check if the server is running and try again.', 'error');
      
      // Reset button state
      const submitButton = document.querySelector('.submit-btn');
      submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Submit Registration';
      submitButton.disabled = false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Student Registration</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            {/* Full Name and Student USI side by side */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reg-fullName">Full Name *</label>
                <input
                  type="text"
                  id="reg-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-studentUSI">Student USI *</label>
                <input
                  type="text"
                  id="reg-studentUSI"
                  name="studentUSI"
                  value={formData.studentUSI}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your student USI"
                />
              </div>
            </div>

            {/* Email as full width */}
            <div className="form-group">
              <label htmlFor="reg-email">Email Address *</label>
              <input
                type="email"
                id="reg-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            {/* Passwords side by side */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reg-password">Create Password *</label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Create a password (minimum 6 characters)"
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm your password"
                  minLength="6"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-user-plus"></i>
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Main = ({ onRegistrationSuccess, showNotification }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="single-page-app">
      <section id="home" className="page-section">
        <HomeContent openModal={openModal} />
      </section>
      
      <section id="constitution" className="page-section">
        <ConstitutionContent />
      </section>
      
      <section id="executives" className="page-section">
        <ExecutivesContent />
      </section>
      
      <section id="activities" className="page-section">
        <ActivitiesContent />
      </section>
      
      <section id="gallery" className="page-section">
        <GalleryContent />
      </section>
      
      <section id="links" className="page-section">
        <LinksContent />
      </section>
      
      <section id="contact" className="page-section">
        <ContactContent showNotification={showNotification} />
      </section>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onRegistrationSuccess={onRegistrationSuccess}
        showNotification={showNotification}
      />
    </div>
  );
};

export default Main;
