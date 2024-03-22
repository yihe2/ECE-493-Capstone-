import React, { useState, useEffect } from 'react';

const HealthInfoForm = () => {
  const [formData, setFormData] = useState({
    smoking: 'Yes',
    alcoholConsumption: 'Yes',
    sex: 'Male',
    age: '18',
    race: '...',
    difficultyWalking: '',
    diabetic: '',
    physicalActivity: '',
    generalHealth: '',
    asthma: '',
    kidneyDisease: '',
    skinCancer: '',
    historyOfHeartDiseaseAndStroke: ''
  });

  // FROM CHAT
  // useEffect(() => {
  //   // Fetch data from Express endpoint
    
  //   fetch('/api/health-info')
  //     .then(response => response.json())
  //     .then(data => {
  //       data.age = 69 // test
  //       setFormData(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching health info:', error);
  //     });
  // }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any action with the form data, such as submitting it to a backend
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Health Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="smoking">Smoking</label>
          <select className="form-select w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="alcoholConsumption">Alcohol Consumption</label>
          <select className="form-select w-full" id="alcoholConsumption" name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange}>
            <option value="1">Yes</option>
            <option value="0">No</option>
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
          <input type="number" className="form-input w-full" id="age" name="age" min="1" defaultValue={formData.age} onChange={handleChange}/>
          {/* <input type="text" className="form-input w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} /> */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="race">Race</label>
          <select className="form-select w-full" id="race" name="race" value={formData.race} onChange={handleChange}>
          <option value="">Select</option>
            <option value="...">...</option>
            <option value="...">...</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="difficultyWalking">Difficulting Walking</label>
          <select className="form-select w-full" id="difficultyWalking" name="difficultyWalking" value={formData.difficultyWalking} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="diabetic">Diabetic</label>
          <select className="form-select w-full" id="diabetic" name="diabetic" value={formData.diabetic} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="physicalActivity">Physical Activity</label>
          <select className="form-select w-full" id="physicalActivity" name="physicalActivity" value={formData.physicalActivity} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="generalHealth">General Health</label>
          <select className="form-select w-full" id="generalHealth" name="generalHealth" value={formData.generalHealth} onChange={handleChange} required>
            <option value="...">...</option>
            <option value="...">...</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="asthma">Asthma</label>
          <select className="form-select w-full" id="asthma" name="asthma" value={formData.asthma} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> 
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="kidneyDisease">Kidney Disease</label>
          <select className="form-select w-full" id="kidneyDisease" name="kidneyDisease" value={formData.kidneyDisease} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
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
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="history">History of Heart Disease/Stroke</label>
          <select className="form-select w-full" id="history" name="history" value={formData.historyOfHeartDiseaseAndStroke} onChange={handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select> 
        </div>
        {/* TODO: Repeat similar structure for other form fields */}
        
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default HealthInfoForm;
