// Home.js

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DeleteAccount = () => {
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

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Account deleted');



    // send email??
    sessionStorage.removeItem("user")
    navigate("/login");

    try {

    } catch (e) {


      // send email??
      sessionStorage.removeItem("user")
      navigate("/login");
    }


  };

  const handleDeleteAccountWithInfo = () => {
    // Logic to delete account along with information
    console.log('Account and information deleted');


    try {

    } catch (e) {

    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Delete Account</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Account
          </button>
          <button
            onClick={handleDeleteAccountWithInfo}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Account and Information
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
