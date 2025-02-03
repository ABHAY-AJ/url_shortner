import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../utils/api';
import { setToken } from '../utils/auth';
import './LoginPage.css'; // Import the custom CSS file

const LoginPage = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { token } = await loginWithGoogle(credentialResponse.credential);
      setToken(token);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
      />
    </div>
  );
};

export default LoginPage;
