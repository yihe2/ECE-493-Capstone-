import './App.css';
import React, {useContext} from 'react';
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
import InformationPage from './pages/InformationPage';
import Home from './pages/Home';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* does not work */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/secret" element={<SecretTest />} />
        <Route path="/healthinfo" element= {<HealthInfoForm />}/>
        <Route path="/fininfo" element= {<FinInfoForm />}/>
        <Route path="/change-password" element= {<ChangePassword />}/>
        <Route path="/information" element= {<InformationPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;