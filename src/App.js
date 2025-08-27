import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './styles.css';

function App() {
  const [shouldOpenLogin, setShouldOpenLogin] = useState(false);
  const [user, setUser] = useState(null); // Store logged-in user data
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000); // Auto-hide after 4 seconds
  };

  const handleRegistrationSuccess = () => {
    setShouldOpenLogin(true);
  };

  const handleLoginOpened = () => {
    setShouldOpenLogin(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <div className="App">
      {/* Global Notification Component */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <span>{notification.message}</span>
            <button className="notification-close" onClick={() => setNotification(null)}>
              ×
            </button>
          </div>
        </div>
      )}
      
      <Header 
        shouldOpenLogin={shouldOpenLogin} 
        onLoginOpened={handleLoginOpened}
        onLoginSuccess={handleLoginSuccess}
        user={user}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
        showNotification={showNotification}
      />
      <Main 
        onRegistrationSuccess={handleRegistrationSuccess}
        showNotification={showNotification}
      />
      <Footer />
    </div>
  );
}

export default App;
