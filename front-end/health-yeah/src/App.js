import './App.css';
import LoginPage from "./pages/Login"

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
        {/* <Route path="/login" element={<h1 className="text-3xl font-bold underline">Hello world!</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;