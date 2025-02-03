import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import LoginPage from './pages/LoginPage';
import OverallAnalytics from './pages/OverallAnalytics';
import ShortUrl from './pages/ShortUrl';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topic/:topic" element={<Analytics />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/overall" element={<OverallAnalytics />} />
          <Route path="/url/:alias" element={<ShortUrl />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
