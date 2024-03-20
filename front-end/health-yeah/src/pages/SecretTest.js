import React, {useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import axios from 'axios';



const SecretTest = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // Issue with logout
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if(!cookies.jwt) {
  //       navigate("/login");
  //     }
  //     else {
  //       const data = await axios.post("http://localhost:3001/secret", {},
  //       {
  //         withCredentials: true,
  //       }
  //       );
  //       if (!data.status) {
  //         removeCookie("jwt");
  //         navigate("/login")
  //       }
  //       else {
  //         //something else if we want
  //       }
  //     }
  //   }
  //   verifyUser();
  // }, [cookies, navigate, removeCookie])

  const logOut = () => {
    console.log(cookies)
    removeCookie("jwt") // does not work
    navigate('/create-account');
  };
  return (
    <div>
      <h1>end me</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  
  );
}

export default SecretTest;