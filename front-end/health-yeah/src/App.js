import './App.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SecretTest from "./pages/SecretTest"

import React from 'react';


import { 
  BrowserRouter, 
  Route,
  Routes, 
  Link, 
  Redirect
} from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* does not work */}
        <Route path="/" element={<div className='items-center p-32 bg-black'>penis balls butt</div>}/>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/secret" element={<SecretTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;