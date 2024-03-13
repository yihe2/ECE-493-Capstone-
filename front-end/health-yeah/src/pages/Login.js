// Login.js

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill out both username and password fields.');
      return;
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Prepare data for sending to the server
    const loginData = {
      username,
      password: hashedPassword,
    };

    // Send data to the Express endpoint
    try {
      const response = await fetch('http://your-express-server/login-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        console.log('Login successful!');
        // Add redirection logic or any other actions after successful login
      } else {
        setError('Invalid username or password. Please try again.');
        // Clear password field on invalid entry
        setPassword('');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm font-semibold">{error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="text-sm font-semibold text-gray-600 block">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-semibold text-gray-600 block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/create-account" className="text-blue-500">
            Create one here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;