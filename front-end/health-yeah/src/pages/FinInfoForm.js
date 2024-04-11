import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const FinInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: "",
      income: '0',
      expense: '0',
      savings: '0',
      investments: "0",
      debt: '0'
  });

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
  // check for existing informaton
  useEffect(() => {
    const checkInfo = async () => {
        const data = await axios.get(`http://localhost:3001/get-fin-info?email=${sessionStorage.getItem("user")}`,
        {
          withCredentials: true,
        }
        );
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
    const email_string = sessionStorage.getItem("user");
    setFormData({
      ...formData,
      [name]: value,
      ["email"]: email_string
    });
  };

  // send to database endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email_string = sessionStorage.getItem("user")
  
    setFormData({
      ...formData,
      ["email"]: email_string
    });
    
    try {
      console.log(email_string)
      const get_response = await axios.get(`http://localhost:3001/get-fin-info?email=${sessionStorage.getItem("user")}`,
      {
        withCredentials: true,
      });
      
      if (get_response.status === 200) {
        const response = await axios.put("http://127.0.0.1:3001/update-fin-info", formData, {
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
        console.log("try insert")
        const response = await axios.post("http://127.0.0.1:3001/insert-fin-info", formData, {
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

  // FR28, FR29, FR30, FR33, FR34
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Financial Info Form</h1>
        <p>For the purposes of the prototype, an inflation rate of 3% is applied as well as an interest rate of 2% and a investment increase of 5% per annum.<br/></p>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="income">Annual Income ($)</label>
            <input type="number" className="form-input w-full" id="income" name="income" min="0" value={formData.income} onChange={handleChange} />  
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="expense">Annual Expenses ($)</label>
            <input type="number" className="form-input w-full" id="expense" name="expense" min="0" value={formData.expense} onChange={handleChange} />  
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="savings">Total Savings ($)</label>
            <input type="number" className="form-input w-full" id="savings" name="savings" min="0" value={formData.savings} onChange={handleChange} />  
          </div>
          <div className="mb-4">          
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="investments">Value of All Investments ($)</label>
            <input type="number" className="form-input w-full" id="investments" name="investments" min="0" value={formData.investments} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="debt">Total Outstanding Debts ($)</label>
            <input type="number" className="form-input w-full" id="debt" name="debt" min="0" value={formData.debt} onChange={handleChange} />  
          </div>
          <div className="mt-6">
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FinInfoForm;
