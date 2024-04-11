import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// default page for 
const Home = () => {
  const navigate = useNavigate();
  const [showScore, setShowScore] = useState(false);
  const [showFinPlan, setShowFinPlan] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [finPlan, setFinPlan] = useState('');
  const [targetRisk, setTargetRisk] = useState('0.3');
  const [error, setError] = useState('');
  const [finError, setFinError] = useState('');


  const handleChange = (event) => {
    setTargetRisk(event.target.value);
  };

  const handleFinSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted Risk:', targetRisk);
    const email = sessionStorage.getItem("user");
    // check if data exists
    try {
      const health_data = await axios.get(`http://localhost:3001/get-health-info?email=${email}`,
      {
        withCredentials: true,
      });

      // check if data exists
      const fin_data = await axios.get(`http://localhost:3001/get-fin-info?email=${email}`,
      {
        withCredentials: true,
      });

      // get command with mode 1
      if(fin_data.status === 200 && health_data.status === 200) {
        console.log("reached")
        // TODO: add route to express with risk level
        const data = await axios.get(`http://localhost:3001/score-predict?email=${email}&riskLevel=${targetRisk}&mode=1`,
        {
          withCredentials: true,
        });


        if(data.status === 200) {
          console.log("in the 200")
          setShowFinPlan(true)
          
          console.log(data.data)
          console.log(data.data.monthly_installment)
          if (typeof  data.data.monthly_installment === "number") {
            console.log("This works")
            switch(data.data.monthly_installment) {
              // -1: 
              // -2: You can already cover the cost on your own, you don't need to save extra money.
              // -3: 
              case -1:
                setFinPlan(`Congratulations! You won't reach that risk level until at least age 80!`)
                break;
              case -2:
                setFinPlan(`You can already cover the cost on your own, you don't need to save extra money.\n\n
                          Our suggestion: ${data.data.suggested_actions}`)
                break;
              case -3:
                setFinPlan(`You inputted a lower risk level than your current one.`)
                break;
            }
          }
          else if (data.data.years) {
            setFinPlan(`We predict you will reach the target risk level in ${data.data.years} years.\n\n
            Based on this we recommend you save an extra ($) ${data.data.monthly_installment} per month.\n\n
            Our advice: ${data.data.suggested_actions}`)
          }
          else {
            setFinPlan(`Congratulations! You won't reach that risk level until at least age 80!`)
          }
        }
        else {
          setFinPlan(true)
          setShowFinPlan("Something Went Wrong")
          setFinError("Something wrong")
        }

      }
      else {
        setFinError("Something wrong")
      }
    } catch (e) {
      console.error(e);
    }
  };


  // FR6
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

  // Submission for current score mode
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
        setError('Please Save Health and Financial Info before predicting!')
      }
    } catch (e) {
      setError('Something is wrong, try again')
      console.error(e);
    }


  }

  // FR26, FR27, FR35, FR36, FR38, FR39, FR40
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg mb-4">
            <h1 className="text-3xl font-bold mb-4">Health Score Prediction</h1>
            <p className="text-gray-700 mb-4">
              Click the button below to calculate your cardiovascular risk level!
            </p>
            {error && (
              <div className="mb-4 text-red-500 text-sm font-semibold">{finError }</div>
            )}
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
            <h1 className="text-3xl font-bold mb-4">Future Risk</h1>
            <p className="text-gray-700 mb-4">
              Click the button below to calculate your Future Risks!
            </p>
            {finError && (
              <div className="mb-4 text-red-500 text-sm font-semibold">{finError }</div>
            )}
            {showFinPlan ? (
              <>
                <p>Based on your Finances, Health Score, and target risk: </p>
                <p className='text-gray-700 mb-4'>{finPlan}</p>
              </>
            ) : (
              <></>
            )}

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
