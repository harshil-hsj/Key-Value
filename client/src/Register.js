import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import RegisterImage from './registerImage.jpg';
const Register = () => {
  const [userid, setUsername] = useState('');
  const [app_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  const checkPasswordStrength = (password) => {
    // Define regex patterns for each required character type
    const hasNumber = /\d/;
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/; // Add more symbols if needed
  
    // Check if the password meets all criteria
    if(password.length <8){
      return 'A strong password must have atleast 8 characters. !!maybe you can try our password generator!!';
    }
    if( !hasLowerCase.test(password)){
      return 'A strong password must contain a lower case characters. !!maybe you can try our password generator!!';
    }
    if(!hasUpperCase.test(password)){
      return 'A strong password contain must contain an upper case character. !!maybe you can try our password generator!!';
    }
    if(!hasNumber.test(password)){
      return 'A strong password contain must contain atleast one number. !!maybe you can try our password generator!!';
    }
    if(!hasSymbol.test(password)){
      return  'A strong password contain must contain atleast one symbol. !!maybe you can try our password generator!!';
    }

    return 'Yupp, this is a strong password'; // Return empty string if password meets criteria
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strengthError = checkPasswordStrength(newPassword);
    setError(strengthError);
  };

  const signUp = () => {
    Axios.post('http://localhost:3001/register', {
      userid: userid,
      app_password: app_password,
    })
      .then((response) => {
        if (response.data.success) {
          navigate('/info', { state: { userid } });
          // Handle successful signup (e.g., redirect or auto-login)
        } else {
          alert('Sign Up failed');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error signing up ... ..... Username already taken ');
      });
  };

  return (
    <div className='signup'>
      <img src={RegisterImage} alt="register" className='background-image'/>
      <div className='container'>
        <h2>SIGN UP</h2>
        
        <input
          className='inputusername'
          type="text"
          placeholder={userid ? "" : "Enter Username"}
          value={userid}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <input
          className='inputpassword'
          type="password"
          placeholder={app_password ? "" : "Enter Password"}
          value={app_password}
          onChange={handlePasswordChange}
        />
        <button onClick={signUp}>Sign Up</button>
        <button onClick={() => { window.history.back() }}>Home</button>
        <div className='errorcontainer'>
          {error&& error!=='Yupp, this is a strong password' && <p style={{ color: 'red' }}>{error}</p>}
          {error&& error ==='Yupp, this is a strong password' && <p style={{ color: 'green' }}>{error}</p>}
       </div>
      </div>
    </div>
  );
};

export default Register;
