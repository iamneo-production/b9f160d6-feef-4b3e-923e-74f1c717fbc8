import React, {useState,setState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import  './Registration.css';
import "./Login"
import image from "./image.png"

function Registration() {

    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [phone,setPhone]=useState("")
    const navigate = useNavigate();

    async function save(event) 
    {
        event.preventDefault();
        try
        {
           
            await axios.post("http://localhost:8080/customers", {
               username : Name,
               email: email,
               password : password,
               phone: phone

            });
            alert("Registration Successful");
        }
        catch(err)
        {
            alert(err);
        }
    }
    const handleInputChange = (e) => {
      const {id , value} = e.target;
      if(id === "Name"){
          setName(value);
      }
      
      if(id === "email"){
          setEmail(value);
      }
      if(id === "password"){
          setPassword(value);
      }
      if(id === "confirmPassword"){
          setConfirmPassword(value);
      }

      if(id==" phone")
      {
        setPhone(value);
      }

  }
 

const navigateLogin = () => {
 
 
  navigate('/Login');
};


  return (
   
      <div class="wrapper">
      <div class="border">
    <h2>User Registration</h2>
    <div class="imgg">
    <img src={image} alt="image" />
    </div>
    <form action="#" class="full">
      <div class="bodyy">
      <div class="input-box">
        <input type="text" placeholder="Enter your name" value={Name} onChange={(event) => {setName(event.target.value);
                            }} id="Name" required/>
      </div>
      <div class="input-box">
        <input type="email" placeholder="Enter your email" value={email} onChange={(event) => {setEmail(event.target.value);
                            }} id = "email" required/>
      </div>
      <div class="input-box">
        <input type="text" placeholder="Enter your phone number" value={phone} onChange={(event) => {setPhone(event.target.value);
                            }} id = "phone" required/>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Create password" value={password} onChange={(event) => {setPassword(event.target.value);
                            }} id = "password" required/>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Confirm password"  value={confirmPassword} onChange = {(e) => handleInputChange(e)} id = "confirmPassword" required/>
      </div>
      <div class="policy">
        <input type="checkbox"/>
        <h3>I accept all terms & condition</h3>
      </div>
      <div class="input-box button">
        <input type="Submit" onClick={save}  value="Register Now"/>
      </div>
      <div class="text">
        <h3>Already have an account? <button class="Login-btn" onClick={navigateLogin}>Login now</button></h3>
      </div>
      </div>
   
    </form>
    </div>
  </div>
   
  );
}

export default Registration;
