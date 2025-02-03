import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import './CustomNavbar.css'; // Import the custom CSS file

const CustomNavbar = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        {token ? (
          <Navbar.Brand as={Link} to="/dashboard" className="custom-navbar-brand">
            URL Shortener
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/" className="custom-navbar-brand">
            URL Shortener
          </Navbar.Brand>
        )}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {token && (
              <>
                <Nav.Link as={Link} to="/" className="custom-navbar-link">
                  Make Short URL
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard" className="custom-navbar-link">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/overall" className="custom-navbar-link">
                  Overall Analytics
                </Nav.Link>
              </>
            )}
            {token ? (
              <Button variant="outline-light" onClick={handleLogout} className="custom-navbar-button">
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" as={Link} to="/login" className="custom-navbar-button">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
