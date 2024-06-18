import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginImage from './loginPage.webp';
import './Login.css';
import Info from './Info';
import { Link } from 'react-router-dom';
function Login () {
  const [userid, setUsername] = useState('');
  const [app_password, setPassword] = useState('');
  const navigate=useNavigate();
  const login = () => {
    Axios.post('http://localhost:3001/login', {
      userid:userid,
      app_password:app_password,
    }).then((response) => {
      if (response.data.success===true) {
        alert('login successful');
        navigate('/info',{state:{userid}});
        // Handle successful login (e.g., redirect or save auth token)
      } else {
        alert('user authentication failure');
      }
    }).catch((err) => {
      console.error(err);
      alert('Error logging in');
    });
  };
  useEffect(() => {
    const heading = document.querySelector('.animated-heading');
    heading.classList.add('start-animation');
    
    // Add 'finished-animation' class after typing animation completes
    const typingDuration = 7000; // Match the typing animation duration
    setTimeout(() => {
      heading.classList.add('finished-animation');
    }, typingDuration);
  }, []);
  return (
    <div className='background'>
      <h1 className="animated-heading">Key to your World !!!!</h1>
     <img src={LoginImage} alt="login" className='background-image'/>
      <div className='login'>
        <div className='container'>
         <h2>LOGIN</h2>
         <input className = "inputusername"
         type="text" 
         placeholder={userid ? "" : "Enter Username"} 
         value={userid}   
          onChange={(e) => setUsername(e.target.value)} />
         <br></br>
         <input className="inputpassword"
         type="password" 
         placeholder={app_password ? "" : "Enter Password" } 
         value={app_password}
         onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
          <button onClick={() => { window.history.back() }}>Home</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
