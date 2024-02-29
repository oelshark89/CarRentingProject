import React, { useState } from 'react';
import axios from 'axios';
import './loginComponent.css';
import { useNavigate } from 'react-router-dom';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
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
    const { name, email, password, confirmPassword, address, phone } = formData;
    console.log('Form Data:', { name, email, password, confirmPassword, address, phone });
    try {
      const response = await axios.post('https://car-renting-project.vercel.app/signup', {
        name,
        email,
        password,
        confirmPassword,
        address,
        phone
      });
      console.log('Response:', response.data);

      // Alert with the response data
      const message = response.data.message || 'An error occurred'; // Default message if 'message' is not present

  // Display the message using alert or any other method
  alert(message);

      // Check if the response data contains the information you need
      if (message === 'Customer successfully registered') {
        // If the condition is met, navigate to the index page
        const userId = response.data.result.insertId;
        console.log(userId);
        navigate('/homepage', { state: { userId } });
      } else {
        // Handle other cases or display a message
        console.log('Condition not met');
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      // Alert with the error message
      alert('Error occurred. Please try again.');
    }
  };

  return (
    <div className='loginBackground'>
    <div id="container">
      <div className="signupContents">
        <h1>Signup</h1>
        <p style={{ color: 'white' }}>Please enter your login and password!</p>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleInputChange}
        />
        <input id="signupButton" type="submit" value="SIGN UP" onClick={handleSubmit} />
      </div>
    </div>
    </div>
  );
}

export default App;
