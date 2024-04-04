// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [showScore, setShowScore] = useState(false);
  const [showFinPlan, setShowFinPlan] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [finPlan, setFinPlan] = useState('');
  const [targetRisk, setTargetRisk] = useState('0.3');


  const handleChange = (event) => {
    setTargetRisk(event.target.value);
  };

  const handleFinSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted Risk:', targetRisk);
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
        // TODO: add route to express with risk level
        const data = await axios.get(`http://localhost:3001/score-predict?email=${email}&riskLevel=${targetRisk}&mode=1`,
        {
          withCredentials: true,
        });
        console.log(data)

        if(data.status === 200) {
          console.log("in the 200")
          setShowScore(true)
          // setShowFinPlan(`${data.data.score.toFixed(5) * 100}%`)
          console.log(data.data)
        }
        else {
          setFinPlan(true)
          setShowFinPlan("Something Went Wrong")
        }

      }
      else {
        // SOME ERROR DISPLAY
      }
    } catch (e) {
      console.error(e);
    }
  };



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
        const data = await axios.get(`http://localhost:3001/score-predict?email=${email}&riskLevel=0.25&mode=0`,
        {
          withCredentials: true,
        });
        console.log(data)

        if(data.status === 200) {
          console.log("in the 200")
          setShowScore(true)
          setPrediction(`${data.data.score.toFixed(5) * 100}%`)
        }
        else {
          setShowScore(true)
          setPrediction("Something Went Wrong")
        }

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
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg mb-4">
            <h1 className="text-3xl font-bold mb-4">Health Score Prediction</h1>
            <p className="text-gray-700 mb-4">
              Click the button below to calculate your cardiovascular risk level!
            </p>
            {showScore ? (
              <>
              <p>Based on your health factors, our model has determined your risk level to be: </p>
              <p className='text-gray-700 mb-4'>{prediction}</p>
              </>
            ) : (
              <></>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
              Get Risk
            </button>
        </div>
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg mt-4">
            <h1 className="text-3xl font-bold mb-4">Financial Plan</h1>
            <p className="text-gray-700 mb-4">
              Click the button below to calculate your Financial Plan!
            </p>
            {showFinPlan ? (
              <>
              <p>Based on your Finances, Health Score, and target risk our model has determined your risk level to be: </p>
              <p className='text-gray-700 mb-4'>{finPlan}</p>
              {/* TODO: More intense case handling for negative codes */}
              </>
            ) : (
              <></>
            )}

            {/* INSERT FORM TO SUBMIT INFO */}

            <form onSubmit={handleSubmit}>
              <label>
                Enter your target risk:
                <input
                  type="number"
                  value={targetRisk}
                  min="0"
                  max="1"
                  step=".01"
                  onChange={handleChange}
                  placeholder="Enter your target risk"
                  required
                />
              </label>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleFinSubmit}>
              Get Budget
              </button>
            </form>
        </div>
      </div>
    </>
  );
};

export default Home;
