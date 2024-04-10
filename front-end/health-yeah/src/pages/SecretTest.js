import React, {useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const SecretTest = () => {
  const navigate = useNavigate();


  // login effect
  useEffect(() => {
    const verifyUser = async () => {
      if (sessionStorage.getItem("user") === null) {
        console.log("no cookie initial check")
        // what?????? 
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

  const logOut = () => {
    sessionStorage.removeItem("user")
    navigate('/login');
  };
  return (
    <div>
      <h1>end me</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  
  );
}

export default SecretTest;