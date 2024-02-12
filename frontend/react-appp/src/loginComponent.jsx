 import React, { useEffect, useState } from 'react';
import './loginComponent.css';
import axios from 'axios';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Signup from "./signupComponent";

const Layout = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Access form data from the state (formData)
    const { email, password } = formData;
    
    try {
      const response = await axios.post('http://localhost:3003/login', { email, password });
      console.log('Response:', response.data);
      // Alert with the response data
      console.log(response.data)
      const message = response.data.message || 'An error occurred'; // Default message if 'message' is not present

  // Display the message using alert or any other method
  alert(message);
   
      // Check if the response data contains the information you need
      if (message === 'You have successfully signed in') {
        // If the condition is met, navigate to the index page
        const userId = response.data.result[0]?.id;
        navigate('/homepage', { state: { userId } });
      } else if (message === 'Welcome Admin!') {
        // Navigate to the admin page
        navigate('/adminpage');
      }else {
        // Handle other cases or display a message
        console.log("condition not met");
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  // Function to handle "Forgot password" click
  const handleDivSubmit = () => {
    // Your logic for handling "Forgot password" click
    console.log('Forgot password clicked');
  };

  return (
    <div className='loginBackground'>
    <div id="container">
      <div className="loginContents">
        <h1>LOGIN</h1>
        <p style={{color:'white '}}>Please enter your login and password!</p>
        <input
          type="text"
          id="Email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          id="Password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <a href="#" onClick={handleDivSubmit}>
          Forgot password
        </a>
        <input type="submit" value="LOGIN" onClick={handleSubmit} />
        <div className="signup">
                <p style={{color:'#6c757d'}}>Don't have an account? <Link to="/signup">Signup</Link>  </p>
                
            </div>
      </div>
    </div>
    </div>
  );
}

export default Layout;