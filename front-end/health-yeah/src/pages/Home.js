// Home.js

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
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

  return (
    <>
        <Navbar />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Prediction</h1>
            <p className="text-gray-700 mb-4">
            Something Something
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
            </button>
        </div>
        </div>
    </>
  );
};

export default Home;
