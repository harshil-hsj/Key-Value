
import './App.css';
import { Link, Routes } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import About from './About';
import Info from './Info';
import Register from './Register';

import CustomerCare from './CustomerCare';
import PasswordSuggestion from './PasswordSuggestion';
function App() {
   
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
    <div>
    <Router>
    <div className="App">
      <Routes>
       <Route exact path="/" element={<LandingPage />} />
       <Route path = "/passwordsuggestion" element={<PasswordSuggestion/>}/>
       <Route path = "/customercare" element={<CustomerCare/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/info" element={<Info/>}/>
        <Route path="/register" element={<Register/>}/>
       </Routes>
    </div>
  </Router>
  </div>
);
  

      
  
}

export default App;
