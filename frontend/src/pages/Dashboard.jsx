import React, { useEffect, useState } from 'react';
import { getOverallAnalytics } from '../utils/api';
import UrlList from '../components/UrlList';
import './Dashboard.css'; // Import the custom CSS file

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getOverallAnalytics(token);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, [token]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Total URLs: {analytics.totalUrls}</p>
      <p>Total Clicks: {analytics.totalClicks}</p>
      <p>Unique Users: {analytics.uniqueUsers}</p>

      <UrlList />
    </div>
  );
};

export default Dashboard;
