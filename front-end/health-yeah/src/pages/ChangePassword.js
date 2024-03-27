import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const verifyUser = async () => {
      if (sessionStorage.getItem("user") === null) {
        console.log("no cookie initial check")
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

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
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
          {/* <p className="mt-4 text-gray-600 text-sm">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-500">
              Log in here.
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
