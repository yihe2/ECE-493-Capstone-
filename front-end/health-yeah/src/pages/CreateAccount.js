// CreateAccount.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    

    if (!username || !password) {
      setError('Please fill out both username and password fields.');
      return;
    }

    // Prepare data for sending to the server
    const createAccountData = {
      email: username,
      password: password,
    };
    console.log({...createAccountData})
    try {
      console.log("before await")
      const data = await axios.post("http://localhost:3001/create-account", {
        ...createAccountData,
      },
      {
        withCredentials: true,
      });
      console.log(data)
      if (data.status === 201) {
        console.log('Create Account Successful!');
        // navigate("/secret")
        navigate("/secret");
        // Add redirection logic or any other actions after successful login
      } else {
        setError('Invalid username or password. Please try again.');
        // Clear password field on invalid entry
        console.log(data)
        setPassword('');
      }
    } catch (err) {
      console.log(err);
    }

    // Send data to the Express endpoint
    // try {
    //   const response = await fetch('http://your-express-server/create-account-endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(createAccountData),
    //   });

    //   if (response.ok) {
    //     console.log('Account created successfully!');
    //     // Add redirection logic or any other actions after successful account creation
    //   } else {
    //     setError('Invalid username or password. Please try again.');
    //     // Clear password field on invalid entry
    //     setPassword('');
    //   }
    // } catch (error) {
    //   console.error('Error during account creation:', error);
    //   setError('An error occurred during account creation. Please try again.');
    // }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
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
          className="bg-green-500 text-white p-2 rounded w-full"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
