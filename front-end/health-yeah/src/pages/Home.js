// Home.js

import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
        <Navbar />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Welcome to My Website!</h1>
            <p className="text-gray-700 mb-4">
            This is a simple home page created using React and Tailwind CSS.
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
