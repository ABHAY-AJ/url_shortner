import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UrlList.css'; // Import the custom CSS file

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('https://url-shortner-cwki.onrender.com/api/url', {
          headers: { Authorization: token },
        });
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        setError('Failed to fetch URLs. Please try again later.');
      }
    };
    fetchUrls();
  }, [token]);

  // ✅ Extract unique topics
  const uniqueTopics = [...new Set(urls.map((url) => url.topic))];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="url-list-container">
      <h1>Short URLs</h1>

      {/* ✅ Wrapper for the URL table to make it horizontally scrollable */}
      <div className="url-list-table-wrapper">
        <table className="url-list-table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Long URL</th>
              <th>Topic</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.shortUrl}>
                <td>
                  <a href={`https://url-shortner-cwki.onrender.com/api/urll/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </a>
                </td>
                <td>{url.longUrl}</td>
                <td>{url.topic}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => navigate(`/url/${url.shortUrl}`)}>Analyze</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ New Section: Analyze by Topic */}
      <h2>Analyze by Topic</h2>
      <div>
        {uniqueTopics.map((topic) => (
          <button key={topic} onClick={() => navigate(`/topic/${topic}`)} className="url-topic-button">
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UrlList;
