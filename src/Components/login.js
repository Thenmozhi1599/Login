import React from "react";
import { useNavigate } from "react-router";
  
const Login = () => {

const navigate = useNavigate(); 
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={()=>navigate("/")}>Logout</button>
    </div>
  );
};
  
export default Login;