// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios";
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();
  // const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleLogin = async () => {

    if (!username || !password) {
      setError('Please fill out both username and password fields.');
      return;
    }

    setIsLoading(true)

    // Prepare data for sending to the server
    const loginData = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post("http://127.0.0.1:3001/login", loginData, {
        withCredentials: true,
    });


      if (response.status === 200) {
        console.log(response);
        // console.log(response)
        // Add redirection logic or any other actions after successful login
        
        sessionStorage.setItem('user', JSON.stringify(response.data.email))

        // update the auth context
        dispatch({type: 'LOGIN', payload: response.data.email})
  
        // update loading state
        setIsLoading(false)
        navigate("/secret")

        
        // navigate("/secret")
      } else {
        setError('Invalid username or password. Please try again.');
        // Clear password field on invalid entry
        setIsLoading(false)
        setPassword('');
      }
    } catch (err) {
      setIsLoading(false)
      console.log(err);
    }
  

    // // Send data to the Express endpoint
    // try {
    //   const response = await fetch('http://your-express-server/login-endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(loginData),
    //   });

    //   if (response.ok) {
    //     console.log('Login successful!');
    //     // Add redirection logic or any other actions after successful login
    //   } else {
    //     setError('Invalid username or password. Please try again.');
    //     // Clear password field on invalid entry
    //     setPassword('');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   setError('An error occurred during login. Please try again.');
    // }
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
