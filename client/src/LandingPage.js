
import { useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom';
import './LandingPage.css';
import landingPageImage from './landingImage.jpeg';
import navbarKey from './navbarKey.png';
import Logo from './Logo.png';
function LandingPage() {
//   const[password, setPassword]=useState("");
//   const[title,setTitle]=useState("");
//  const addpassword = () =>{
//   Axios.post("http://localhost:3001/addpassword",{
//     password:password,
//     title:title,
//   });
//  };

  return (
    // <div className="App">
    //  <div className="AddingPassword">
    //    <input type="text" placeholder="Ex. password123"
    //    onChange={(event)=>{
    //     setPassword(event.target.value);
    //    }}
    //    />
      
    //    <input type="text" placeholder="Ex. Facebook"
    //     onChange={(event)=>{
    //       setTitle(event.target.value);
    //      }}
    //    />
    //    <button onClick={addpassword}> Add Password</button>
    //    </div>
    //    </div>
    <div className="outmost-div">
      <img src={landingPageImage} alt="Landing page background" className="background-image" />
      <div className="content">
        <h1 >Welcome to Password Manager</h1>
        <div className="buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/about">
            <button>About Us</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
      <nav className="navbar">
        <ul className="ul1">
        <img src={navbarKey} alt="key" className="navbarKey"/>
        <img src={Logo} alt="logo" className="logo"/>
        </ul>
        <ul className="ul2">
          
          <li><Link to="/about">Features</Link></li>
          <li><Link to="/passwordsuggestion">PasswordSuggestion</Link></li>
          <li><Link to="/customercare">CustomerCare</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default LandingPage;
