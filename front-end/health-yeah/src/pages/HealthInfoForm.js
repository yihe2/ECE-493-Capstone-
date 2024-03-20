import React, { useState } from 'react';

const HealthInfoForm = () => {
  const [formData, setFormData] = useState({
    smoking: '',
    alcoholConsumption: '',
    sex: '',
    age: '',
    race: '',
    difficultyWalking: '',
    diabetic: '',
    physicalActivity: '',
    generalHealth: '',
    asthma: '',
    kidneyDisease: '',
    skinCancer: '',
    historyOfHeartDiseaseAndStroke: ''
  });

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
          <select className="form-select w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange}>
          <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="alcoholConsumption">Alcohol Consumption</label>
          <select className="form-select w-full" id="alcoholConsumption" name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange}>
          <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="sex">Sex</label>
          <select className="form-select w-full" id="sex" name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="age">Age</label>
          <input type="number" className="form-input w-full" id="age" name="age" min="1" value={formData.age} onChange={handleChange} />
          {/* <input type="text" className="form-input w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} /> */}
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="race">Race</label>
          <select className="form-select w-full" id="race" name="race" value={formData.race} onChange={handleChange}>
          <option value="">Select</option>
            <option value="1">...</option>
            <option value="0">...</option>
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
