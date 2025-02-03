import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopicAnalytics } from '../utils/api';
import './Analytics.css'; // Import the CSS file for styling

const TopicAnalytics = () => {
  const { topic } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getTopicAnalytics(topic, token);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching topic analytics:', error);
      }
    };
    fetchAnalytics();
  }, [topic, token]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="analytics-container">
      <h1>Analytics for Topic: {topic}</h1>
      <p className="analytics-text">Total Clicks: {analytics.totalClicks}</p>
      <p className="analytics-text">Unique Users: {analytics.uniqueUsers}</p>

      <h2>Clicks by Date</h2>
      <ul className="analytics-list">
        {analytics.clicksByDate.map(({ date, count }) => (
          <li key={date}>
            <span>{date}:</span> {count} clicks
          </li>
        ))}
      </ul>

      <h2>URLs</h2>
      <ul className="analytics-url-list">
        {analytics.urls.map((url) => (
          <li key={url.shortUrl}>
            <p><span>Short URL:</span> {url.shortUrl}</p>
            <p className="total-clicks"><span>Total Clicks:</span> {url.totalClicks}</p>
            <p className="unique-users"><span>Unique Users:</span> {url.uniqueUsers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicAnalytics;
