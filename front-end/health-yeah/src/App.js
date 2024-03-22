import './App.css';
import React from 'react';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SecretTest from "./pages/SecretTest"
import HealthInfoForm from './pages/HealthInfoForm';
import FinInfoForm from './pages/FinInfoForm';
import ChangePassword from './pages/ChangePassword';



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
        <Route path="/healthinfo" element= {<HealthInfoForm />}/>
        <Route path="/fininfo" element= {<FinInfoForm />}/>
        <Route path="/change-password" element= {<ChangePassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;