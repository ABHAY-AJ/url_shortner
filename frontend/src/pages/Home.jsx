import React from 'react';
import UrlForm from '../components/UrlForm';
import './Home.css'; // Import the custom CSS file

const Home = () => {
  const token = localStorage.getItem('token');

  const handleSuccess = (response) => {
    alert(`Short URL Created GoTo Dashboard`);
  };

  return (
    <div className="home-container">
      <h1>URL Shortener</h1>
      {token ? (
        <UrlForm token={token} onSuccess={handleSuccess} />
      ) : (
        <p>Please login to shorten URLs.</p>
      )}
    </div>
  );
};

export default Home;
