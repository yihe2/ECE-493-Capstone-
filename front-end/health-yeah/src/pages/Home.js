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


  const handleSubmit = async () => {
    console.log("Call to Prediction::")
    const email = sessionStorage.getItem("user");

    try {
      const health_data = await axios.get(`http://localhost:3001/get-health-info?email=${email}`,
      {
        withCredentials: true,
      });


      const fin_data = await axios.get(`http://localhost:3001/get-fin-info?email=${email}`,
      {
        withCredentials: true,
      });


      if(fin_data.status === 200 && health_data.status === 200) {
        console.log("reached")
        const data = await axios.get(`http://localhost:3001/score-predict?email=${email}&mode=0`,
        {
          withCredentials: true,
        });
        console.log(data)
      }
      else {
        // SOME ERROR DISPLAY
      }
    } catch (e) {
      console.error(e);
    }


  }

  return (
    <>
        <Navbar />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Prediction</h1>
            <p className="text-gray-700 mb-4">
            Something Something
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
            Get Started
            </button>
        </div>
        </div>
    </>
  );
};

export default Home;
