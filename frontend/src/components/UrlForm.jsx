import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { shortenUrl } from '../utils/api';
import './UrlForm.css'; // Import the custom CSS file

const UrlForm = ({ token, onSuccess }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortenUrl(longUrl, customAlias, topic, token);
      onSuccess(response);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="url-form-container">
      <h2 className="url-form-title">Shorten Your URL</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="longUrl" className="url-form-group">
          <Form.Label>Long URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="url-form-control"
          />
        </Form.Group>
        <Form.Group controlId="customAlias" className="url-form-group">
          <Form.Label>Custom Alias (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter custom alias"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="url-form-control"
          />
        </Form.Group>
        <Form.Group controlId="topic" className="url-form-group">
          <Form.Label>Topic (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="url-form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="url-form-button">
          Shorten URL
        </Button>
      </Form>
    </div>
  );
};

export default UrlForm;
