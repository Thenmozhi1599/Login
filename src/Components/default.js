import React, { useEffect, useState } from "react";
import { redirect, useNavigate} from 'react-router-dom';
import axios from "axios";
import './App.css';
 
function Def() {
 

 const navigate = useNavigate();  
 const [usernameReg, setUsernameReg] = useState("");
 const [passwordReg, setPasswordReg] = useState ("");
 
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState ("");
 
 const [loginStatus, setLoginStatus] = useState("");
 
 const register = () => {
   console.log(usernameReg,passwordReg)
   console.log("Register pressed")
    axios.post("http://localhost:3000/api/register", {
      
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
   } ); 
 };
 
 const login = () => {
   console.log("Login pressed")
    axios.post("http://localhost:3000/api/login", {
      username: username,
      password: password,
    }).then((res) => {
       alert(res.data.message)
      } ) 
 };
 
 return (
    <div className="App">
       <div className="registration">
          <h1>Registration</h1>
          <label>Username</label>
          <input
             type="text"
             onChange={(e) => {
                setUsernameReg(e.target.value);
             }}
          /><br/>
          <label>password</label>
          <input 
            type="text"
            onChange={(e) =>{
               setPasswordReg(e.target.value);
            }}
          /> <br />
          <button onClick={register} > Register</button>
       </div>
 
       <div className="login">
           <h1>Login</h1>
           <input
              type="text"
              placeholder="Username…"
              onChange = { (e) => {
                 setUsername (e.target.value);
              }}
              /> <br/>
           <input
              type="password"
              placeholder="Password…"
              onChange = { (e) => {
                 setPassword (e.target.value);
              }}
           /><br/>
           <button onClick={login}>Login</button>
       </div>
       <h1> {loginStatus}</h1>
    </div>
 );
}

export default Def;