import React, {useState,setState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import image from "./image.png"
import './Login.css';

import "./Login"

function Registration() {

  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/authenticate", {
        username: username,
        password: password,
        }).then((res) => 
        {
         console.log(res.data);
         
       
         { 
            
            navigate('/home');
         } 
         
      }, fail => {
        alert("invalid username or password");
        
       console.error(fail); // Error!
});
    }

     catch (err) {
      alert(err);
    }
  
  }
    

  
   






  return (
   
    <div class="wrapper">
    <div class="border">
  <h2>User Login</h2>
  <img src={image} alt="image" />
  </div>
  <form action="#" class="full">
    <div class="bodyy">
    <div class="input-box">
      
      <input type="email" size="40" placeholder="Enter username" value={username} onChange={(event) => {setUsername(event.target.value);
                          }} id = "email" required/>
    </div>
  
    <div class="input-box">
      <input type="password" placeholder="Enter password" value={password} onChange={(event) => {setPassword(event.target.value);
                          }} id = "password" required/>
      
    </div>
   
    <div class="policy">
        <input type="checkbox"/>
        <h3>I accept all terms & condition</h3>
      </div>
    <div class="input-box button">
      <input type="Submit" onClick={login}  value="Login Now"/>
    </div>
   
    </div>
 
  </form>
  </div>
  );


}

          


export default Registration;

