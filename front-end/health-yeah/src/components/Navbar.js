import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clear local storage, etc.
    // Then redirect to the login page or wherever appropriate.
    sessionStorage.removeItem("user")
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-lg font-bold">Logo</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
              <button
                  onClick={() => navigate("/")}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTab === 'Home' && 'bg-gray-900 text-white'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/healthinfo")}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTab === 'Health Information' && 'bg-gray-900 text-white'
                  }`}
                >
                  Health Information
                </button>
                <button
                  onClick={() => navigate("/fininfo")}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTab === 'Financial Information' && 'bg-gray-900 text-white'
                  }`}
                >
                  Financial Information
                </button>
                <button
                  onClick={() => navigate("/change-password")}
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                    selectedTab === 'Change Password' && 'bg-gray-900 text-white'
                  }`}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
