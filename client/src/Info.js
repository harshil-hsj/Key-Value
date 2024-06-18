import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import './Info.css';
function Info() {
  const location = useLocation();
  const { userid } = location.state || {};
  const [title, setTitle] = useState('');
  const [returnTitle, setReturnTitle] = useState('');
  const [password, setPassword] = useState('');
  const [returnPassword, setReturnPassword] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const addPassword = () => {
    Axios.post('http://localhost:3001/addpassword', {
      password: password,
      newTitle: newTitle,
      userid: userid,
    })
      .then((response) => {
        if (response.data.success) {
          alert('Password added successfully');
          setNewTitle('');
          setPassword('');
        } else {
          alert('Password is not Added');
          setNewTitle('');
          setPassword('');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('error adding password');
        setNewTitle('');
        setPassword('');
      });
  };

  const retrieve = () => {
    Axios.post('http://localhost:3001/retrieve', {
      userid: userid,
      title: title,
    })
      .then((response) => {
        setReturnPassword(response.data.password);
        setReturnTitle(title);
      })
      .catch((err) => {
        console.error(err);
        alert('Error retrieving data... Please go to the home page and login again');
      });
  };

  const copyToClipboard = () => {
    if (returnPassword) {
      navigator.clipboard.writeText(returnPassword)
        .then(() => {
          alert('Password copied to clipboard');
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    } else {
      alert('No password to copy');
    }
  };

  return (
    <div className='info-background'>
     
      <h2>Info Page</h2>
      <p>Welcome, {userid}</p>
      <div className='boxes'>
        <div className='retrievepassword'>
        <h3>Your password is here</h3>
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={retrieve}>Retrieve Password</button>
          {returnPassword && (
            <div className='answer'>
              <p className='p-' style={{ color: 'green',fontSize:'0.8rem' }}>Password for {returnTitle}: {returnPassword}</p>
              <button onClick={copyToClipboard}>Copy To Clipboard</button>
            </div>
          )}
        </div>
        <div className='addpassword'>
          <h3>Add a new Password</h3>
          <input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter new title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={addPassword}>Add Password</button>
        </div>
      </div>
    </div>
  );
}

export default Info;
