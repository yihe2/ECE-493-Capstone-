import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');


  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const navigate = useNavigate();

  // FR6
  useEffect(() => {
    const verifyUser = async () => {
      if (sessionStorage.getItem("user") === null) {
        navigate("/login");
      }
      else {
        const data = await axios.post("http://localhost:3001/secret", {},
        {
          withCredentials: true,
        }
        );
        if (!data.status) {
          console.log("not data status")
          navigate("/login")
        }
        else {
          console.log(data)
        }
      }
  }
    verifyUser();
  }, [])

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name === 'newUsername') {
      setNewUsername(value);
    } else if (name === 'confirmUsername') {
      setConfirmUsername(value);
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password_data = {
      email: sessionStorage.getItem("user"),
      password: currentPassword,
      newPassword: newPassword
    }
    // Perform validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // Implement password change logic here
    console.log('Password change submitted');
    // Reset form fields

    
    try {
      const data = await axios.put("http://localhost:3001/change-password", {password_data},
        {
          withCredentials: true,
        });
    } catch (e){
      console.log(e)
    }


    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  // handler function to call database
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    const email_data = {
      email: sessionStorage.getItem("user"),
      newEmail: newUsername,
      password: currentPassword
    }
    // Perform validation
    if (!currentPassword || !newUsername || !confirmUsername) {
      setErrorEmail('Please fill in all fields');
      return;
    }
    if (newUsername !== confirmUsername) {
      setErrorEmail('Usernames do not match');
      return;
    }
    // Implement password change logic here
    console.log('change username  submitted');

    // route
    try {
      const data = await axios.put("http://localhost:3001/change-email", {email_data},
        {
          withCredentials: true,
        });
    } catch (e){
      console.log(e)
    }

    // reset storage
    sessionStorage.setItem('user', email_data.newEmail)

    setCurrentPassword('');
    setNewUsername('');
    setConfirmUsername('');
    setErrorEmail('');
  };


  // component implements FR7, FR8, and FR9
  return (
    <>
      <Navbar />
      {/* modify username */}
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-96 mb-4">
          <h2 className="text-2xl font-bold mb-6">Change Username</h2>
          {errorEmail && (
            <div className="mb-4 text-red-500 text-sm font-semibold">{errorEmail}</div>
          )}
          <form onSubmit={handleUsernameSubmit}>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="text-sm font-semibold text-gray-600 block">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={handleChange}
                name="currentPassword"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newUsername" className="text-sm font-semibold text-gray-600 block">
                New Username (email)
              </label>
              <input
                type="email"
                id="newUsername"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your new username"
                value={newUsername}
                onChange={handleChange}
                name="newUsername"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmUsername" className="text-sm font-semibold text-gray-600 block">
                Confirm New Username (email)
              </label>
              <input
                type="email"
                id="confirmUsername"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Confirm your new email"
                value={confirmUsername}
                onChange={handleChange}
                name="confirmUsername"
              />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
              Change Username
            </button>
          </form>
        </div>





        {/* modify password */}
        <div className="bg-white p-8 rounded shadow-md w-96 mt-4">
          <h2 className="text-2xl font-bold mb-6">Change Password</h2>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm font-semibold">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="text-sm font-semibold text-gray-600 block">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={handleChange}
                name="currentPassword"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="text-sm font-semibold text-gray-600 block">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleChange}
                name="newPassword"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-600 block">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;