import React, {useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';



const SecretTest = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // Issue with logout
  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt) {
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
          removeCookie("jwt");
          navigate("/login")
        }
        else {
          console.log(data)
        }
      }
    }
    verifyUser();
  }, [cookies, navigate, removeCookie])

  const logOut = () => {
    console.log("Cookies::")
    console.log(cookies)
    removeCookie("jwt") // does not work
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