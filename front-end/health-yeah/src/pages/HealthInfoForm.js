import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HealthInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    smoking: 'No',
    alcoholConsumption: 'No',
    sex: 'Male',
    age: '18',
    race: 'Other',
    difficultyWalking: 'No',
    diabetic: 'No',
    physicalActivity: 'Yes',
    generalHealth: 'Excellent',
    asthma: 'No',
    kidneyDisease: 'No',
    skinCancer: 'No',
    stroke: 'No',
    BMI: '18.5',
    physicalHealth: '15',
    mentalHealth: '15',
    sleepTime: '8',
  });

    // login effect
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



  useEffect(() => {
    const checkInfo = async () => {
        const data = await axios.get(`http://localhost:3001/get-health-info?email=${sessionStorage.getItem("user")}`,
        {
          withCredentials: true,
        }
        );
        console.log("data log:")
        console.log(data.data)
        if(data.status === 200) {
          setFormData({
            ...data.data
          });
        }
        else {
          console.log(data)
        }
  }
    checkInfo();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;

    const email_string = sessionStorage.getItem("user")
    setFormData({
      ...formData,
      [name]: value,
      ["email"]: email_string
    });
  };

  const handleSubmit = async (e) => {

    const email_string = sessionStorage.getItem("user")
    setFormData({
      ...formData,
      ["email"]: email_string
    });
    e.preventDefault();


    // /insert-health-info
    console.log(formData);

    try {
      const get_response = await axios.get(`http://localhost:3001/get-health-info?email=${sessionStorage.getItem("user")}`,
      {
        withCredentials: true,
      });
      if (get_response.status === 200) {
        // update
        const response = await axios.put("http://127.0.0.1:3001/update-health-info", formData, {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("success")
        }
        else {
          console.log("something wrong")
        }
      }
      else {
        const response = await axios.post("http://127.0.0.1:3001/insert-health-info", formData, {
          withCredentials: true,
        });

        if (response.status === 201) {
          console.log(response);
        }
        else {
          console.log("something wrong")
        }
    }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Health Information Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="smoking">Smoking</label>
            <select className="form-select w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="alcoholConsumption">Alcohol Consumption</label>
            <select className="form-select w-full" id="alcoholConsumption" name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="sex">Sex</label>
            <select className="form-select w-full" id="sex" name="sex" value={formData.sex} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="age">Age</label>
            <input type="number" className="form-input w-full" id="age" name="age" min="1" max='100' value={formData.age} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="race">Race</label>
            <select className="form-select w-full" id="race" name="race" value={formData.race} onChange={handleChange}>
              {/* {'American Indian/Alaskan Native': 0, 'Asian': 1, 'Black': 2, 'Hispanic': 3, 'Other': 4, 'White': 5} */}
              <option value="American Indian/Alaskan Native">American Indian/Alaskan Native</option>
              <option value="Asian">Asian</option>
              <option value="Black">Black</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Other">Other</option>
              <option value="White">White</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="difficultyWalking">Difficulting Walking</label>
            <select className="form-select w-full" id="difficultyWalking" name="difficultyWalking" value={formData.difficultyWalking} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="diabetic">Diabetic</label>
            <select className="form-select w-full" id="diabetic" name="diabetic" value={formData.diabetic} onChange={handleChange} required>
              <option value="Yes (during pregnancy)">Yes (During Pregnancy)</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No, borderline diabetes">No, borderline diabetes</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="physicalActivity">Physical Activity</label>
            <select className="form-select w-full" id="physicalActivity" name="physicalActivity" value={formData.physicalActivity} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="generalHealth">General Health</label>
            <select className="form-select w-full" id="generalHealth" name="generalHealth" value={formData.generalHealth} onChange={handleChange} required>
              {/* {'Excellent': 0, 'Fair': 1, 'Good': 2, 'Poor': 3, 'Very good': 4} */}
              <option value="Excellent">Excellent</option>
              <option value="Very good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="asthma">Asthma</label>
            <select className="form-select w-full" id="asthma" name="asthma" value={formData.asthma} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="kidneyDisease">Kidney Disease</label>
            <select className="form-select w-full" id="kidneyDisease" name="kidneyDisease" value={formData.kidneyDisease} onChange={handleChange} required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="skinCancer">Skin Cancer</label>
            <select className="form-select w-full" id="skinCancer" name="skinCancer" value={formData.skinCancer} onChange={handleChange} required>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="stroke">Stroke</label>
            <select className="form-select w-full" id="stroke" name="stroke" value={formData.stroke} onChange={handleChange} required>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="BMI">BMI</label>
            <input type="number" step=".01" className="form-input w-full" id="BMI" name="BMI" min="1" value={formData.BMI} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="physicalHealth">Physical Health</label>
            <input type="number" step=".01" className="form-input w-full" id="physicalHealth" name="physicalHealth" min="0" max="30" value={formData.physicalHealth} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="mentalHealth">Mental Health</label>
            <input type="number" step=".01" className="form-input w-full" id="mentalHealth" name="mentalHealth" min="0" max="30" value={formData.mentalHealth} onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="sleepTime">Sleep Time</label>
            <input type="number" className="form-input w-full" id="sleepTime" name="sleepTime" min="0" max="24" value={formData.sleepTime} onChange={handleChange}/>
          </div>
          <div className="mt-6">
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HealthInfoForm;
