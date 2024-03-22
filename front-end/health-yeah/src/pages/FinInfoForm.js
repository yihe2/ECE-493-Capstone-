import React, { useState, useEffect } from 'react';

const FinInfoForm = () => {
  const [formData, setFormData] = useState({
      stockValue: "0",
      savings: '0',
      expenses: '0',
      income: '0',
      age: '18', // maybe we can get from elsewhere
      outstandingDebt: '0'
  });

  // FROM CHAT
  // useEffect(() => {
  //   // Fetch data from Express endpoint
    
  //   fetch('/api/fin-info')
  //     .then(response => response.json())
  //     .then(data => {
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
      <h1 className="text-2xl font-semibold mb-4">Financial Info Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="savings">Savings ($)</label>
          <input type="number" className="form-input w-full" id="savings" name="savings" min="0" defaultValue={formData.savings} onChange={handleChange} />  
        </div>
        <div className="mb-4">          
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="stock">Stock ($)</label>
          <input type="number" className="form-input w-full" id="stock" name="stockValue" min="0" defaultValue={formData.stockValue} onChange={handleChange} />
            {/* <input type="text" className="form-input w-full" id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} /> */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="savings">Income ($)</label>
          <input type="number" className="form-input w-full" id="savings" name="savings" min="0" defaultValue={formData.savings} onChange={handleChange} />  
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="outstandingDebt">Outstanding Debts ($)</label>
          <input type="number" className="form-input w-full" id="outstandingDebt" name="outstandingDebt" min="0" defaultValue={formData.outstandingDebt} onChange={handleChange} />  
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FinInfoForm;
