import './App.css';
import React, {useContext} from 'react';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import HealthInfoForm from './pages/HealthInfoForm';
import FinInfoForm from './pages/FinInfoForm';
import ChangePassword from './pages/ChangePassword';
import DeleteAccount from './pages/DeleteAccount';
import { 
  BrowserRouter, 
  Route,
  Routes, 
} from "react-router-dom";
import InformationPage from './pages/InformationPage';
import Home from './pages/Home';


    // Routes for application
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/healthinfo" element= {<HealthInfoForm />}/>
        <Route path="/fininfo" element= {<FinInfoForm />}/>
        <Route path="/change-password" element= {<ChangePassword />}/>
        <Route path="/information" element= {<InformationPage />}/>
        <Route path="/delete-account" element= {<DeleteAccount />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;