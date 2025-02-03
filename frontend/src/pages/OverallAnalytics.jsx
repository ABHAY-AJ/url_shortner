import React, { useEffect, useState } from 'react';
import { getOverallAnalytics } from '../utils/api';
import './OverallAnalytics.css'; // Import the custom CSS file

const OverallAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getOverallAnalytics(token);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching overall analytics:', error);
      }
    };
    fetchAnalytics();
  }, [token]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="overall-analytics-container">
      <h1>Overall Analytics</h1>
      <p>Total URLs: {analytics.totalUrls}</p>
      <p>Total Clicks: {analytics.totalClicks}</p>
      <p>Unique Users: {analytics.uniqueUsers}</p>

      <h2>Clicks by Date</h2>
      <ul className="overall-analytics-list">
        {analytics.clicksByDate.map(({ date, count }) => (
          <li key={date}>
            <span>{date}:</span> {count} clicks
          </li>
        ))}
      </ul>

      <h2>Operating Systems</h2>
      <ul className="overall-analytics-list">
        {analytics.osType.map(({ osName, uniqueClicks, uniqueUsers }) => (
          <li key={osName}>
            <p><span>OS:</span> {osName}</p>
            <p><span>Unique Clicks:</span> {uniqueClicks}</p>
            <p><span>Unique Users:</span> {uniqueUsers}</p>
          </li>
        ))}
      </ul>

      <h2>Device Types</h2>
      <ul className="overall-analytics-list">
        {analytics.deviceType.map(({ deviceName, uniqueClicks, uniqueUsers }) => (
          <li key={deviceName}>
            <p><span>Device:</span> {deviceName}</p>
            <p><span>Unique Clicks:</span> {uniqueClicks}</p>
            <p><span>Unique Users:</span> {uniqueUsers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverallAnalytics;
